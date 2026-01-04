import checkLoginRouter from './check-login-router.js';
import createRoom from './create-room.js';
import createUserRouter from './create-user-router.js';
import loginRouter from './login-router.js';
import logoutRouter from './logout-router.js';
import userRouter from './user-router.js';
import selectRoom from './select-room.js';

import {
  isAuthenticated,
  isNotAuthenticated
} from '../middleware/auth-middleware.js';

// 라우터 묶어서 하나의 함수로 보내기
export function registerRouters(app) {
  app.use("/login", isNotAuthenticated, loginRouter);
  app.use("/logout", isAuthenticated, logoutRouter);
  app.use("/user", isAuthenticated, userRouter);
  app.use("/check-login", checkLoginRouter);
  app.use("/createUser", isNotAuthenticated, createUserRouter);
  app.use("/createRoom", createRoom);
  app.use("/selectRoom", selectRoom);
}