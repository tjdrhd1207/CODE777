import CardDeck from "../game/logic/CardDeck.js";
import { generateDeck } from "../game/logic/cardFactory.js";
import Player from "../game/model/Player.js";
import QuestionDeck from "../game/model/QuestionDeck.js";
import RuleEngine from "../game/rules/RuleEngine.js";
import { rooms, readyStates } from './room.js';


export default function gameSocketHandler(io, socket) {
    console.log("🎮 Game socket connected:", socket.id);

    // 게임 시작 요청
    socket.on("startGameAndShuffle", ({ roomId }) => {
        console.log(`게임 시작 요청: room=${roomId}, by=${socket.id}`);

        const room = rooms[roomId];
        if (!room) return;

        // NPC도 추가
        // rooms에서 플레이어 가져오기
        // const players = [...room.players];

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
        io.to(roomId).emit("gameStarted", { distributedCards, players: room.players, currentTurn: room.currentTurn, questionCard, answer });
    });

    // 다음턴 요청
    socket.on("nextTurn", ({ roomId }) => {
        const room = rooms[roomId];
        if (!room) return;

        // rooms에서 플레이어 가져오기
        const players = room.players;
        if (!players || players.length === 0) return;

        let nextTurn = (room.currentTurn + 1) % room.players.length;

        // NPC 만나면 다시 넘김
        if (players[nextTurn].userId === "NPC") {
            nextTurn = (nextTurn + 1) % room.players.length;
        }

        room.previousTurn = room.currentTurn;
        room.currentTurn = nextTurn;
        
        const question = room.questionDeck.draw();        
        // const question = room.questionDeck.drawTest(3);

        const ruleEngine = new RuleEngine(room.cardDeck);

        const answer = ruleEngine.evaluate(
            question.seq,
            room.players,
            room.currentTurn
        );
        // 상태 업데이트
        room.answer = answer;
        // 모든유저한테 전달
        io.to(roomId).emit("turnChanged", {
            currentTurn: room.currentTurn,
            previousTurn: room.previousTurn,
            currentPlayer: room.players[room.currentTurn],
            question: question,
            answer
        });
    });
}