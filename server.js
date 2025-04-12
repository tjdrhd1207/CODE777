const express = require("express");
const cors = require("cors");
const session = require("express-session");
const { MongoClient } = require("mongodb");
const loginRouter = require("./backend/router/login-router");
const logoutRouter = require("./backend/router/logout-router");
const userRouter = require("./backend/router/user-router");
const checkLoginRouter = require("./backend/router/check-login-router");
const {
    isAuthenticated, // 인증된 사용자만 접근 가능한 미들웨어
    isNotAuthenticated // 인증되지 않은 사용자만 접근 가능한 미들웨어
} = require("./backend/middleware/auth-middleware");
const app = express();
const port = 3000;
let db;

const uri = "mongodb+srv://jaemin:hansol@cluster0.3lo3bxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));
app.use(express.json());  // JSON 파싱 미들웨어
// 세션관리
app.use(
    session({
        secret: "mysecretkey", // 세션암호화용 비밀키
        resave: false, // 세션을 변경하지 않는 한 매 요청마다 다시 저장하지 않음
        saveUninitialized: false, // 초기화되지 않은 세션도 저장(로그인하지 않아도 세션 생성 가능)
        cooke: {
            maxAge: 1000 * 60 * 60 * 24, //24시간 (1000msec * 60 sec * 60 minute * 24 hour)
            secure: false, // HTTPS 환경에서만 쿠키전송,
            httpOnly: true // 브라우저의 Javascript로 cookie접근 막기
        },
    })
);

// 라우터 설정
app.use("/login", isAuthenticated, loginRouter);// 로그인되지 않은 사용자만 접근 가능
app.use("/logout", logoutRouter);               // 로그아웃
app.use("/user", isAuthenticated, userRouter);  //유저 조회 로그인된 사용자만 접근 가능
app.use("/check-login", checkLoginRouter);      // 로그인 확인

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
    console.error("미들웨어 에러");
    res.status(500).send("500에러 발생");
})


async function startServer() {
    try {
        await client.connect();
        db = client.db("game");
        console.log ("✅ MongoDB 연결 성공");

        app.listen(port, () => {
            console.log("🚀 서버 실행 중 (http://localhost:3000)");
        });
    } catch (err) {
        console.error("MongoDB 연결 실패", err);
    }
}

app.post("/createUser", async (req, res) => {
    const { id, pw } = req.body;

    try {
        const exsitingUser = await db.collection("user").findOne({ id });
        
        if (exsitingUser) {
            console.log("중복된 ID : ", id);
            return res.send({ code: 0 }); //아이디 중복
        }
    
        await db.collection("user").insertOne({ id, pw });
        console.log("회원가입 성공");
        res.send({ code: 1 }); // 회원가입 성공
    } catch (err) {
        console.error("요청 처리중 오류", err);
        res.status(500).send({ code: -1, message: "서버 오류 "});
    }
});



startServer();