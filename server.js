const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
const port = 3000;

const uri = "mongodb+srv://jaemin:hansol@cluster0.3lo3bxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

app.use(cors({
    origin: "http://127.0.0.1:5500"
}));
app.use(express.json());  // JSON 파싱 미들웨어

let db;

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

app.post("/data", async (req, res) => {
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