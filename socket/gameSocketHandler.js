import CardDeck from "../game/logic/CardDeck.js";
import { generateDeck } from "../game/logic/cardFactory.js";
import QuestionDeck from "../game/model/QuestionDeck.js";
import RuleEngine from "../game/rules/RuleEngine.js";
import { rooms, readyStates } from './room.js';


export default function gameSocketHandler(io, socket) {
    console.log("🎮 Game socket connected:", socket.id);

    // 게임 시작 요청
    socket.on("startGameAndShuffle", ({ roomId, players }) => {
        console.log(`게임 시작 요청: room=${roomId}, by=${socket.id}`);

        const deckArray = generateDeck();
        const gameDeck = new CardDeck(deckArray);
        gameDeck.shuffle();

        const distributedCards = {};
        players.forEach((player) => {
            console.log("---");
            console.log(player);
            distributedCards[player.userId] = [];
            for (let i = 0; i < 3; i++) {
                distributedCards[player.userId].push(gameDeck.draw());
            }
        });

        console.log(distributedCards);
        // 카드 덱과 분배 정보도 rooms에 저장
        rooms[roomId].gameDeck = gameDeck;
        rooms[roomId].distributedCards = distributedCards;
        
        // 해당 방의 모든 유저에게 브로드캐스트
        io.to(roomId).emit("gameStarted", { distributedCards });
    });

    // 다음턴 요청
    socket.on("nextTurn", ({ roomId, currentTurn, players, cardDeck, questionData }) => {
        const room = rooms[roomId];
        if (!room) return;
        
        const questionDeck = new QuestionDeck();
        const drawedCard = questionDeck.draw();
        const ruleEngine = new RuleEngine(cardDeck);
        console.log("현재 턴 : "+currentTurn);
        const answer = ruleEngine.evaluate(drawedCard.seq, players, currentTurn);
    
        // 상태 업데이트
        room.answer = answer;
        // 모든유저한테 전달
        io.to(roomId).emit("turnChanged", {
            currentTurn: currentTurn,
            currentPlayer: players[currentTurn],
            question: drawedCard,
            answer
        });
    });
}