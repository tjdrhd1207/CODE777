import CardDeck from "../game/logic/CardDeck.js";
import { generateDeck } from "../game/logic/cardFactory.js";
import Player from "../game/model/Player.js";
import QuestionDeck from "../game/model/QuestionDeck.js";
import RuleEngine from "../game/rules/RuleEngine.js";
import { rooms, readyStates } from './room.js';


export default function gameSocketHandler(io, socket) {
    console.log("🎮 Game socket connected:", socket.id);

    // 공용타이머
    function startTimer(roomId) {
        const room = rooms[roomId];
        if (!room) return;

        if (room.timer) clearInterval(room.timer);

        room.timeLeft = 60;

        io.to(roomId).emit("timer", { timeLeft: room.timeLeft });

        room.timer = setInterval(() => {
            room.timeLeft--;

            io.to(roomId).emit("timer", { timeLeft: room.timeLeft });
            // 1초마다 갱신된 시간 브로드캐스트
            if (room.timeLeft <= 0) {
                clearInterval(room.timer);
                room.timer = null;
                autoNextTurn(roomId);
            }
        }, 1000);
    }

    function autoNextTurn(roomId) {
        const room = rooms[roomId];
        if (!room) return;

        const players = room.players;
        if (!players || players.length === 0) return;

        let nextTurn = (room.currentTurn + 1) % players.length;

        // NPC 만나면 다시 넘김
        if (players[nextTurn].userId === "NPC") {
            nextTurn = (nextTurn + 1) % room.players.length;
        }

        room.previousTurn = room.currentTurn;
        room.currentTurn = nextTurn;

        const question = room.questionDeck.draw();
        const ruleEngine = new RuleEngine(room.gameDeck);

        const answer = ruleEngine.evaluate(
            question.seq,
            room.players,
            room.currentTurn
        );

        // 모든유저에게 턴 변경 broadcast
        io.to(roomId).emit("turnChanged", {
            currentTurn: room.currentTurn,
            previousTurn: room.previousTurn,
            currentPlayer: room.players[room.currentTurn],
            question,
            answer
        });

        // 💥 다음 턴의 타이머도 다시 시작
        startTimer(roomId);
    }

    // 게임 시작 요청
    socket.on("startGameAndShuffle", ({ roomId }) => {
        console.log(`게임 시작 요청: room=${roomId}, by=${socket.id}`);

        const room = rooms[roomId];
        if (!room) return;

        const deckArray = generateDeck();
        room.gameDeck = new CardDeck(deckArray);
        room.gameDeck.shuffle();

        // 2. 분배카드 객체 (userId -> hand[])
        const distributedCards = {};

        room.players.forEach((player) => {
            distributedCards[player.userId] = [];
            for (let i = 0; i < 3; i++) {
                distributedCards[player.userId].push(room.gameDeck.draw());
            }

            // 서버에서 핸드 나눠갖기
            player.hand = distributedCards[player.userId];
        });



        if (!room.players.find(p => p.userId === "NPC")) {
            const npc = new Player("NPC", room.players.length);
            room.players.push(npc);
            distributedCards[npc.userId] = [];
            for (let i = 0; i < 3; i++) {
                distributedCards[npc.userId].push(room.gameDeck.draw());
            }
            npc.hand = distributedCards[npc.userId];  // ⭐ NPC도 필수
        }

        // 4. 첫 턴 지정
        room.currentTurn = 0;
        room.previousTurn = -1;

        const questionCard = room.questionDeck.draw();
        const ruleEngine = new RuleEngine(room.gameDeck);
        const answer = ruleEngine.evaluate(
            questionCard.seq,
            room.players,
            room.currentTurn
        );
        // 해당 방의 모든 유저에게 브로드캐스트
        io.to(roomId).emit("gameStarted", {
            distributedCards,
            players: room.players,
            currentTurn: room.currentTurn,
            questionCard,
            answer
        });

        startTimer(roomId);
    });

    // 다음턴 요청
    socket.on("nextTurn", ({ roomId }) => {
        const room = rooms[roomId];
        if (room?.timer) clearInterval(room.timer);

        autoNextTurn(roomId);
    });

    socket.on("submitAnswer", ({ roomId, userId, answer }) => {
        const room = rooms[roomId];
        if (!room) return;
        console.log("게임 상태");
        console.log(room.gameState);
        if (room.gameState !== "STOPPED") return;

        const ruleEngine = new RuleEngine(room.gameDeck);
        const isCorrect = ruleEngine.checkAnswer(
            answer,
            room.players,
            userId,
            room.currentTurn
        );
        console.log("백엔드 답안 제출1");
        io.to(roomId).emit("answerResult", {
            userId,
            answer,
            isCorrect
        });
        console.log(isCorrect);
        console.log("백엔드 답안 제출2");

        if(isCorrect) {
            // 코인 하나 추가
            // 게임 다시 셔플 후 나누기
            io.to(roomId).emit("gameResumed");
        } else {
            room.gameState = "PLAYING";
            room.shoutedBy = null;
            io.to(roomId).emit("gameResumed");
        }
    });

    socket.on("shoutAnswer", ({ roomId, userId }) => {
        const room = rooms[roomId];
        if (!room) return;
        console.log("게임엔서");
        console.log(room.gameState);
        if (room.gameState !== "PLAYING") return;

        room.gameState = "STOPPED";
        room.shoutedBy = userId;

        io.to(roomId).emit("gameStopped", {
            shoutedBy: userId
        });

    });
}