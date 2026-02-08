// 추후 .env로 관리
// npx serve에서는 .env를 자동으로 못일기 때문에 js로 표현 (현재 VITE 같은 빌드도구 안쓰기 때문에)

const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";

export const ENV = {
    BACKEND_URL: isLocalhost ? "http://localhost:4000" : "https://code777.fly.dev"
};