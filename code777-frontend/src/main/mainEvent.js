import { createUser, login } from "./mainAPI.js";

export function bindUIEvents() {
    const mainList = document.querySelectorAll('.main-list');
    const modal = document.querySelector(".modal-overlay");
    const createUserBtn = document.querySelector("#createUser");
    const loginUserBtn = document.querySelector("#loginUser");
    const loginId = document.querySelector("#login-id");
    const loginPwd = document.querySelector("#login-pwd");

    // 음악효과 취소
    // const hoverSound = new Audio('assets/mouse-hover.mp3');
    
    mainList.forEach((list) => {
        list.addEventListener('click', () => {
            // hoverSound.currentTime = -1000;
            // hoverSound.play().catch(error => console.error('Sound play error', error));
            list.classList.add('clicked-list');
            console.log(list.classList);
            if (list.classList.contains("game-start")) {
                modal.style.display = "flex";
            }
        });
    });

    document.querySelector('#openModal').addEventListener("keydown", (e) => {
        if (loginId.value !== "" && loginPwd !== "") {
            if (e.key === 'Enter') {
                // 로그인 실행
                login(loginId.value, loginPwd.value);
            }
        }
    });

    createUserBtn.addEventListener("click", () => {
        createUser(loginId.value, loginPwd.value);
    });

    loginUserBtn.addEventListener("click", () => {
        login(loginId.value, loginPwd.value);
    })

}