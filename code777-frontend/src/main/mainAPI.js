// main에서 API 호출 관련 로직
import { ENV } from "../../env.js";

export function createUser(id, pw) {
    fetch(`${ENV.BACKEND_URL}/createUser/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ id, pw }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.code === 1) {
                location.hash = '/roomList';
            } else {
                alert("이미 존재하는 아이디입니다.");
            }
        })
        .catch(err => {
            console.error("에러 발생: ", err);
        });
}

export function login(id, pw) {
    fetch(`${ENV.BACKEND_URL}/login/selectUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include", 
        body: JSON.stringify({ id, pw }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.code === 1) {
                location.hash = '/roomList';
            } else {
                alert(data.message);
            }
        });
}

export async function checkLogin() {
    try {
        console.log("체크 로그인");
        console.log(ENV.BACKEND_URL);
        const response = await fetch(`${ENV.BACKEND_URL}/check-login`, {
            credentials: "include",
        });

        const data = await response.json();

        if (!data.loggedIn) {
            location.hash = '/';
        }
    } catch (err) {
        console.error(err);
    }
}
