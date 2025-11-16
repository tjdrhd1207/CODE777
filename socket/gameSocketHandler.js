import CardDeck from "../game/logic/CardDeck.js";
import { generateDeck } from "../game/logic/cardFactory.js";
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
        const players = [...room.players];
        players.push("NPC");
        if (!players || players.length === 0) return;

        const deckArray = generateDeck();
        const gameDeck = new CardDeck(deckArray);
        gameDeck.shuffle();

        const distributedCards = {};

        players.forEach((playerId) => {
            distributedCards[playerId] = [];
            for (let i = 0; i < 3; i++) {
                distributedCards[playerId].push(gameDeck.draw());
            }
        });

        // 카드 덱과 분배 정보도 rooms에 저장
        room.gameDeck = gameDeck;
        room.distributedCards = distributedCards;
        // 해당 방의 모든 유저에게 브로드캐스트
        io.to(roomId).emit("gameStarted", { distributedCards });
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

        console.log("현재턴 : ");
        console.log(room.currentTurn);
        const question = room.questionDeck.draw();
        console.log(question);
        const ruleEngine = new RuleEngine(room.cardDeck);
        const answer = ruleEngine.evaluate(
            question.seq, 
            room.players, 
            room.currentTurn
        );
        console.log(answer);
        // 상태 업데이트
        room.answer = answer;
        // 모든유저한테 전달
        io.to(roomId).emit("turnChanged", {
            currentTurn: room.currentTurn,
            currentPlayer: room.players[room.currentTurn],
            question: question,
            answer
        });
    });
}