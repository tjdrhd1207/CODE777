// roomSocketHandler.js
const rooms = {};      // roomId별 참가자 리스트
const readyStates = {}; // roomId별 준비 상태

export default function roomSocketHandler(io, socket) {
    socket.on('joinRoom', ({ roomId, userId }) => {
        console.log(`유저 ${userId}방 ${roomId} 입장`);

        if (!rooms[roomId]) rooms[roomId] = [];
        if (!readyStates[roomId]) readyStates[roomId] = {};

        if (!rooms[roomId].includes(userId)) {
            rooms[roomId].push(userId);
        }

        // 소켓 Socket.IO 룸에 join
        socket.join(roomId);
        socket.roomId = roomId;  // 나중에 disconnect 시 사용
        socket.userId = userId;  // 나중에 disconnect 시 사용


        // 유저 준비상태 초기화
        readyStates[roomId][userId] = false;

        io.to(roomId).emit('updateParticipants', { roomId, participants: rooms[roomId] });
    });

    socket.on('leaveRoom', ({ roomId, userId }) => {
        console.log(`유저 ${userId} 방 ${roomId} 퇴장`);

        if (rooms[roomId]) {
            rooms[roomId] = rooms[roomId].filter(id => id !== userId);
        }

        if (readyStates[roomId]) {
            delete readyStates[roomId][userId];
        }

        socket.leave(roomId);

        io.to(roomId).emit('updateParticipants', { roomId, participants: rooms[roomId] });
    });

    socket.on("playerReady", ({ roomId, userId }) => {
        console.log("플레이어 준비 토글 요청:", roomId, userId);

        // roomId 초기화
        if (!readyStates[roomId]) {
            readyStates[roomId] = {};
        }

        // 현재 상태를 반전
        const current = readyStates[roomId][userId] || false;
        const newState = !current;
        readyStates[roomId][userId] = newState;
        // readyStates[roomId][userId] = true;

        // 해당 방에 준비 상태 업데이트
        io.to(roomId).emit("updateReadyState", { userId, ready: newState });
    });

    socket.on("disconnect", () => {
        console.log(`소켓 ${socket.id} 연결 종료`);

        // 모든 룸에서 소켓 제거
        if (socket.roomId) {
            const roomId = socket.roomId;
            rooms[roomId] = rooms[roomId].filter(id => id !== socket.userId);
            delete readyStates[roomId][socket.userId];

            io.to(roomId).emit('updateParticipants', { roomId, participants: rooms[roomId] });
        }
    });

    
    socket.on("startGame", ({ roomId, userId }) => {
        console.log(`${userId}가 게임 시작 요청`);

        const players = rooms[roomId];
        console.log(players);
        if (!players) return;

        // 해당 방 전체 클라이언트에 게임 시작 이벤트 전송
        io.to(roomId).emit("startGame", { 
            roomId,
            players: players
        });
    });
}