import CardDeck from "../game/logic/CardDeck.js";
import { generateDeck } from "../game/logic/cardFactory.js";
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

}