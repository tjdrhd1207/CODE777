import express from "express";
import { registerRouters } from "./routes/index.js";
import cors from "cors";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* 미들웨어 */
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.static(path.join(__dirname, "../code777-frontend")));
app.use(express.json());
app.use(session({
  secret: "code777-secret", // 나중에 .env로
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));

registerRouters(app);

/* ===== 헬스체크 ===== */
app.get("/", (req, res) => {
    res.send("Backend is running 🚀");
})
export { app };