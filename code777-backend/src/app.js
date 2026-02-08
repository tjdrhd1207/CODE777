import express from "express";
import { registerRouters } from "./routes/index.js";
import cors from "cors";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ===== 헬스체크 ===== */
app.get("/", (req, res) => {
    res.status(200).send("Backend is running 🚀");
})

/* 미들웨어 */
/* app.use(cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3030",
      "https://code777-frontend.vercel.app"
    ],
    credentials: true
})); */
app.options("*", cors({
  origin: [
    "http://localhost:3000",
    "https://code777-frontend.vercel.app"
  ],
  credentials: true
}));


app.use(express.static(path.join(__dirname, "../code777-frontend")));
app.use(express.json());
app.set("trust proxy", 1);
app.use(session({
  name: "code777.sid",
  secret: "code777-secret", // 나중에 .env로
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: true,
    // ⭐ 이게 핵심
    secure: false,      // localhost는 HTTPS 아님
    // sameSite: "none"    // 3000 → 4000 쿠키 허용 , 배포환경에서 사용
    sameSite: "lax" // 로컬에서의 설정
  }
}));

registerRouters(app);


export { app };