import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    console.log(req.session);
    if (req.session && req.session.user) {
        //세션에 사용자가 존재하면 로그인된 상태로 간주
        console.log("호출");
        console.log(req.session.user);
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        // 로그인 되지않은 상태
        console.log('로그인 안된상태');
        res.json({ loggedIn: false });
    }
});

export default router;