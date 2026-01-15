import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./socket/index.js";
import { app } from "./app.js";
import { MongoClient } from "mongodb";
import { loadRoomsFromDb } from "./repository/roomRepository.js";
import RoomManager from "./domain/room/RoomManager.js";

const PORT = process.env.PORT || 4000;
const MONGO_URL = "mongodb+srv://jaemin:hansol@cluster0.3lo3bxi.mongodb.net/game?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(MONGO_URL, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 10000,
})
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:3000",
            "https://code777.vercel.app"
        ],
        credentials: true,
    }
});

initSocket(io);

async function startServer() {
    server.listen(PORT, "0.0.0.0", () => {
        console.log("🚀 Backend running on", PORT);
    });

    /* try {
        await client.connect();
        const db = client.db("game");

        app.locals.db = db;
        console.log("✅ MongoDB connected");

        const rooms = await loadRoomsFromDb(db);
        RoomManager.initFromData(rooms);

    } catch (err) {
        console.error("❌ MongoDB connection failed", err);
    } */
}

startServer();