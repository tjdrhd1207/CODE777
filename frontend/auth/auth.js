let BACKEND_URL = "http://localhost:3030";

export async function checkLoginOrRedirect() {
    try {
        const response = await fetch(`${BACKEND_URL}/check-login`, {
            method: "GET",
            credentials: "include"
        });

        let data = await response.json();
        console.log("[auth.js] check-login 응답 : ", data);

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