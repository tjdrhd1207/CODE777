import express from "express";              // ✅ ESM 방식
const router = express.Router();

router.post("/selectUser", async (req, res) => {
    const db = req.app.locals.db;
    const { id, pw } = req.body;

    try {
        const user = await db.collection("user").findOne({ id });

        if (!user) {
            return res.send({ code: 0, message: "아이디 없음" });
        }

        if (user.pw !== pw) {
            return res.send({ code: 0, message: "비밀번호 불일치" });
        }

        // ✅ 여기서 세션에 사용자 정보 저장
        req.session.user = { id: user.id };

        console.log("✅ 로그인 성공, 세션 설정:", req.session.user);
        return res.send({ code: 1 });
    } catch (err) {
        console.error("로그인 에러:", err);
        res.status(500).send({ code: -1 });
    }
});

export default router;