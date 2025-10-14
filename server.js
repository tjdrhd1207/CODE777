// AFTER (ESM)
import express from "express";
import openurl from "openurl";
import path from "path";
import cors from "cors";
import session from "express-session";
import { MongoClient } from "mongodb";

import registerRouters from "./backend/router/router-index.js";
import RoomManager from "./store/roomManager.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import http from 'http';
import { Server } from 'socket.io';
import setupSocket from './socket/index.js';

let frontendURL = "http://localhost:3030";
// const http = require('http');
// const { Server } = require('socket.io');
// const setupSocket = require('./socket');


const app = express();
const port = 3030;
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', socket => console.log('🔥 새 연결:', socket.id));

setupSocket(io); // socket관련 설정 모듈
// let db;

const uri = "mongodb+srv://jaemin:hansol@cluster0.3lo3bxi.mongodb.net/game?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true,
  serverSelectionTimeoutMS: 10000,
});

app.use(cors({
    origin: frontendURL,
    credentials: true,              //쿠키포함 허용
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}));

app.use(express.json());  // JSON 파싱 미들웨어
// 세션관리
app.use(
    session({
        secret: "mysecretkey", // 세션암호화용 비밀키
        resave: false, // 세션을 변경하지 않는 한 매 요청마다 다시 저장하지 않음
        saveUninitialized: false, // 초기화되지 않은 세션도 저장(로그인하지 않아도 세션 생성 가능)
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, //24시간 (1000msec * 60 sec * 60 minute * 24 hour)
            secure: false, // HTTPS 환경에서만 쿠키전송,
            httpOnly: true // 브라우저의 Javascript로 cookie접근 막기
        },
    })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname)));

app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/game', express.static(path.join(__dirname, 'game')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "CODE777", "index.html"));
})

registerRouters(app);

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error("🔥 발생한 에러:", err.stack);
    res.status(500).send("500에러 발생");
})

async function startServer() {
    try {
        await client.connect();
        const db = client.db("game");
        app.locals.db = db;
        await RoomManager.initRoomFromDb(db);
        console.log ("✅ MongoDB 연결 성공");

        server.listen(port, () => {
            console.log("🚀 서버 실행 중 (http://localhost:3030)");
            openurl.open(`${frontendURL}/index.html`);
        });
    } catch (err) {
        console.error("MongoDB 연결 실패", err);
    }
}



startServer();