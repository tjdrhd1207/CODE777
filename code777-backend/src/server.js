import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./socket/index.js";
import { app } from "./app.js";

const PORT = 4000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

initSocket(io);

server.listen(PORT, () => {
    console.log(`🚀 Backend Server running on http://localhost:${PORT}`);
})