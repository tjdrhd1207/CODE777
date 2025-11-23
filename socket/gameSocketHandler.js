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
        });


        if (!room.players.find(p => p.userId === "NPC")) {
            const npc = new Player("NPC", room.players.length);
            room.players.push(npc);
            distributedCards[npc.userId] = [];
            for (let i = 0; i < 3; i++) {
                distributedCards[npc.userId].push(room.gameDeck.draw());
            }

        }

        // 4. 첫 턴 지정
        room.currentTurn = 0;
        room.previousTurn = -1;

        // 해당 방의 모든 유저에게 브로드캐스트
        io.to(roomId).emit("gameStarted", { distributedCards, players: room.players, currentTurn: room.currentTurn });
    });

    // 다음턴 요청
    socket.on("nextTurn", ({ roomId }) => {
        const room = rooms[roomId];
        if (!room) return;

        // rooms에서 플레이어 가져오기
        const players = room.players;
        if (!players || players.length === 0) return;

        room.currentTurn = (room.currentTurn + 1) % room.players.length;
        room.previousTurn = (room.currentTurn - 1 + room.players.length) % room.players.length;

        /* 
        question 테스트용으로 인하여 주석처리
        const question = room.questionDeck.draw(); 
        */
        const question = room.questionDeck.drawTest(10);
        const ruleEngine = new RuleEngine(room.cardDeck);

        const answer = ruleEngine.evaluate(
            question.seq,
            room.players,
            room.currentTurn
        );
        console.log("정답");
        console.log(answer);
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