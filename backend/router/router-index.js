const checkLoginRouter = require("./check-login-router");
const createRoom = require("./create-room");
const createUserRouter = require("./create-user-router");
const loginRouter = require("./login-router");
const logoutRouter = require("./logout-router");
const userRouter = require("./user-router");
const selectRoom = require("./select-room");

const {
    isAuthenticated,
    isNotAuthenticated
} = require("../middleware/auth-middleware");

// 라우터 묶어서 하나의 함수로 보내기
function registerRouters(app) {
    app.use("/login", isAuthenticated, loginRouter);             // 로그인되지 않은 사용자만 접근 가능
    app.use("/logout", logoutRouter);                            // 로그아웃
    app.use("/user", isAuthenticated, userRouter);               //유저 조회 로그인된 사용자만 접근 가능   
    app.use("/check-login", checkLoginRouter);                   // 로그인 확인
    app.use("/createUser", isNotAuthenticated, createUserRouter);//유저 생성
    app.use("/createRoom", createRoom);
    app.use("/selectRoom", selectRoom);
}

module.exports = registerRouters;