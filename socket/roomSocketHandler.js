// roomSocketHandler.js
const rooms = {};

export default function roomSocketHandler(io, socket) {
    socket.on('joinRoom', ({ roomId, userId }) => {
        console.log(`유저 ${userId}방 ${roomId} 입장`);

        if (!rooms[roomId]) {
            rooms[roomId] = [];
        }

        if (!rooms[roomId].includes(userId)) {
            rooms[roomId].push(userId);
        }

        io.emit('updateParticipants', { roomId, participants: rooms[roomId] });
    });

    socket.on('leaveRoom', ({ roomId, userId }) => {
        console.log(`유저 ${userId}방 ${roomId} 퇴장`);

        if (rooms[roomId]) {
            rooms[roomId] = rooms[roomId].filter(id => id !== userId);
            io.emit('updateParticipants', { roomId, participants: rooms[roomId] });
        }
    });
}