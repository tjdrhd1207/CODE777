import CardDeck from "../game/logic/CardDeck.js";
import { generateDeck } from "../game/logic/cardFactory.js";
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
    socket.on("nextTurn", ({ roomId, cardDeck, questionDeck }) => {
        const room = rooms[roomId];
        if (!room) return;

        room.previeusTurn = room.current;
        console.log(room);
        
        // 질문덱에서 질문 뽑기
        const drawedDeck = questionDeck.draw();
        console.log(questionDeck);
        console.log(drawedDeck);
        hintDeckDrawSetting(drawedDeck);
        const ruleEngine = new RuleEngine(cardDeck);
        answer = ruleEngine.evaluate(drawedDeck.seq, players, currentTurn);
        deckAnswerSetting(answer);

    
        // 상태 업데이트
        room.answer = answer;
        console.log("턴넘기기 전달");
        // 모든유저한테 전달
        io.to(roomId).emit("turnChanged", {
            currentTurn: room.currentTurn,
            currentPlayer,
            question: drawDeck,
            answer
        });
    });
}