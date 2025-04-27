const express = require("express");
const openurl = require("openurl");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const { MongoClient } = require("mongodb");

const registerRouters = require("./backend/router/router-index"); // 🎯 이거 하나로 라우터 전체 등록

let frontendURL = "http://localhost:3030";

const app = express();
const port = 3030;
let db;

const uri = "mongodb+srv://jaemin:hansol@cluster0.3lo3bxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

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

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "CODE777", "main.html"));
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
        db = client.db("game");
        app.locals.db = db;
        console.log ("✅ MongoDB 연결 성공");

        app.listen(port, () => {
            console.log("🚀 서버 실행 중 (http://localhost:3030)");

            openurl.open(`${frontendURL}/main.html`);
        });
    } catch (err) {
        console.error("MongoDB 연결 실패", err);
    }
}



startServer();