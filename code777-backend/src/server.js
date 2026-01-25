import "dotenv/config";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { initSocket } from "./socket/index.js";
import { app } from "./app.js";
import { MongoClient } from "mongodb";
import { loadRoomsFromDb } from "./repository/roomRepository.js";
import RoomManager from "./domain/room/RoomManager.js";

dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL;

const client = new MongoClient(MONGO_URL, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    serverSelectionTimeoutMS: 10000,
})
const server = http.createServer(app);

const corsOrigins = process.env.CORS_ORIGINS?.split(",") || [];

const io = new Server(server, {
    cors: {
        origin : corsOrigins,
        credentials: true,
    }
});

initSocket(io);

async function startServer() {

    try {
        await client.connect();
        const db = client.db("game");
        app.locals.db = db;
        console.log("✅ MongoDB connected");

        const rooms = await loadRoomsFromDb(db);
        RoomManager.initFromData(rooms);

    } catch (err) {
        console.error("❌ MongoDB connection failed", err);
    }
    
    server.listen(PORT, "0.0.0.0", () => {
        console.log("🚀 Backend running on", PORT);
    });
}

startServer();
