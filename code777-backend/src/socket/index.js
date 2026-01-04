export function initSocket(io) {
    io.on("connection", (socket) => {
        console.log("🟢 socket connected:", socket.id);
        lobbySocket(io, socket);

        socket.on("joinRoom", (roomId) => {
            socket.join(roomId);
            console.log(`📦 ${socket.id} joined room ${roomId}`);
        });

        socket.on("disconnect", () => {
            console.log("🔴 socket disconnected:", socket.id);
        });
    });
}