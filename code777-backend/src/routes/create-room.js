import express from "express";              // ✅ ESM 방식
const router = express.Router();

router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    const { id, name, capacity, turnTime} = req.body;

    try {
        const existingRoom = await db.collection("room").findOne({ name });
        if (existingRoom) {
            console.log('방중복');
            return res.send({ code: 0 });
        }

        await db.collection("room").insertOne({ id, name, capacity, turnTime });
        console.log("룸 만들기 성공");

        res.send({ code: 1 });
    } catch (err) {
        console.error("룸생성 요청 처리중 오류", err);
        res.status(500).send({ code: -1, message: "서버 오류" });
    }
});

export default router;