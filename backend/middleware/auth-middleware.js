// 로그인 확인 미들웨어
function isAuthenticated(req, res, next) {
    if (req.session.id) {
        return next(); // 로그인되어있으면 계속 처리
    } else {
        return res.status(403).json({ message: "로그인이 필요합니다." }); // 로그인이 안되어 있는 경우
    }
}

//접근 제한 미들웨어
function isNotAuthenticated(req, res, next) {
    console.log("세션상태 : ", req.session);
    if (!req.session.user) {
        return next(); //로그인되지 않은 경우 요청을 계속 처리
    } else {
        return res.status(403).json({ message: "이미 로그인되어 있습니다. "}); //이미 로그인되어 있는 경우
    }
}

export { isAuthenticated, isNotAuthenticated };