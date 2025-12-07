import CardDeck from '../game/logic/CardDeck.js';
import { generateDeck } from '../game/logic/cardFactory.js';
import QuestionDeck from '../game/model/QuestionDeck.js';
import RuleEngine from '../game/rules/RuleEngine.js';
import { rooms, readyStates } from './room.js';
import Player from '../game/model/Player.js';

export default function roomSocketHandler(io, socket) {
    socket.on('joinRoom', ({ roomId, userId }) => {
        console.log(`유저 ${userId}방 ${roomId} 입장`);

        if (!rooms[roomId]) rooms[roomId] = {
            players: [],
            ready: {},
            currentTurn: 0,
            previousTurn: null,
            gameStarted: false,
            cardDeck: null,
            questionDeck: null,
            answer: null
        };
 
        const room = rooms[roomId];
        if (!room.players.find(p => p.userId === userId)) {
            room.players.push(new Player(userId, room.players.length));
        }

        // 유저 준비상태 초기화
        room.ready[userId] = false;
        // 소켓 Socket.IO 룸에 join
        socket.join(roomId);
        // socket.roomId = roomId;  // 나중에 disconnect 시 사용
        // socket.userId = userId;  // 나중에 disconnect 시 사용
        io.to(roomId).emit('updateParticipants', { roomId, participants: room.players });
    });

    socket.on('leaveRoom', ({ roomId, userId }) => {
        console.log(`유저 ${userId} 방 ${roomId} 퇴장`);

        if (rooms[roomId]) {
            rooms[roomId].players = rooms[roomId].players.filter(id => id !== userId);

            // ready 정보 제거
            delete rooms[roomId].ready[userId];
        }
        socket.leave(roomId);

        io.to(roomId).emit('updateParticipants', { roomId, participants: rooms[roomId]?.players || [] });
    });

    socket.on("playerReady", ({ roomId, userId }) => {
        console.log("플레이어 준비 토글 요청:", roomId, userId);

        // roomId 초기화
        if (!rooms[roomId]) {
            rooms[roomId] = {
                players: [],
                ready: {},
                currentTurn: 0,
                previousTurn: null,
                gameStarted: false,
                cardDeck: new CardDeck(),
                questionDeck: new QuestionDeck(),
                answer: null
            };
        }

        // 현재 상태를 반전
        const current = rooms[roomId].ready[userId] || false;
        const newState = !current;
        rooms[roomId].ready[userId] = newState;
        // readyStates[roomId][userId] = true;

        // 해당 방에 준비 상태 업데이트
        io.to(roomId).emit("updateReadyState", { userId, ready: newState });
    });

    socket.on("disconnect", () => {
        console.log(`소켓 ${socket.id} 연결 종료`);

        const roomId = socket.roomId;
        const userId = socket.userId;

        if (!roomId || !rooms[roomId]) return;

        // players 배열에서 제거
        rooms[roomId].players = rooms[roomId].players.filter(id => id !== userId);

        // ready 상태 제거
        delete rooms[roomId].ready[userId];

        io.to(roomId).emit('updateParticipants', { roomId, participants: rooms[roomId].players });
    });


    socket.on("startGame", ({ roomId }) => {
        const room = rooms[roomId];
        if (!room) return;

        room.currentTurn = 0;
        room.previousTurn = room.players.length - 1;
        room.gameStarted = true;

        room.cardDeck = new CardDeck(generateDeck());
        room.cardDeck.shuffle();

        room.questionDeck = new QuestionDeck();
        // TEST용으로 주석처리
        room.questionDeck.shuffle(); // ⭐ 꼭 섞기
        // console.log(room.players);
        room.answer = null;

        // 해당 방 전체 클라이언트에 게임 시작 이벤트 전송
        io.to(roomId).emit("startGame", {
            roomId,
            players: room.players,
            currentTurn: room.currentTurn
        });
    });
}