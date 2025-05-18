import express from "express";              // ✅ ESM 방식
const router = express.Router();

router.get("/", (req, res) => {
    return res
        .status(200)
        .json({ message: "유저 조회 성공" , user: req.session.id });
});

export default router;