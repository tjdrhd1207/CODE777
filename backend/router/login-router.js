const express = require("express");
const router = express.Router();

router.post("/selectUser", async (req, res) => {
    const { id, pw } = req.body;

    try {
        const selectUser = await db.collection("user").findOne({ id });

        if (selectUser) {
            // 아이디존재 && 비밀번호는 같으면
            if (selectUser.pw === pw) {
                res.send({ code: 1 }) // 로그인 성공
            } else {
                res.send({ code: 0 }) // 로그인 실패
            }
        }
    } catch (err) {
        console.error("요청 처리중 오류", err);
        res.status(500).send({ code: -1, message: "요청 처리 중 오류 "});
    }
});

module.exports = router;