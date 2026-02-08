import { ENV } from "../../../env.js";

export async function checkLoginOrRedirect() {
    try {
        const response = await fetch(`${ENV.BACKEND_URL}/check-login`, {
            method: "GET",
            credentials: "include"
        });

        let data = await response.json();
        console.log("------------");
        console.log(data.loggedIn);
        console.log(data);
        console.log("------------");
        if (data.loggedIn) {
            return data.user.id; //로그인된 사용자 id 반환
        } else {
            alert ("로그인이 필요합니다.");
            location.href = '/';
            return null;
        }
    }
    catch (err) {
        console.error("[auth.js] 세션 확인 실패:", err);
        location.href = '/';
        return null;
    }
}