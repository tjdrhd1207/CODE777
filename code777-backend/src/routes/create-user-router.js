import express from "express";              // ✅ ESM 방식
const router = express.Router();

router.post("/create", async (req, res) => {
    const db = req.app.locals.db; // ✅ 이렇게 받아옴
    const { id, pw } = req.body;
    try {
    const exsitingUser = await db.collection("user").findOne({ id });
    
        if (exsitingUser) {
            console.log("중복된 ID : ", id);
            return res.send({ code: 0 }); //아이디 중복
        }

        await db.collection("user").insertOne({ id, pw });

        req.session.user = { id };  //회원가입 후 유저세션 저장        
        req.session.save((err) => {
            if (err) {
                console.error("세션 저장 실패:", err);
                return res.status(500).send({ code: -1 });                
            }

            console.log("✅ 세션 저장 완료:", req.session);
            res.send({ code: 1 });            
        });
    } catch (err) {
        console.error("요청 처리중 오류", err);
        res.status(500).send({ code: -1, message: "서버 오류 "});
    }
});

export default router;