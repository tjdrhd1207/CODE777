const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const db = req.app.locals.db;

    try {
        const selectRoomList = await db.collection("room").find({}).toArray();        
        res.send({ code: 1, list: selectRoomList });
    } catch (err) {
        console.error("룸 조회 요청 처리중 오류" , err);
        res.status(500).send({ code: -1, message: "방 조회 오류 " });
    }
});

module.exports = router;