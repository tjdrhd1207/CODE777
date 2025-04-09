const hoverSound = new Audio('assets/mouse-hover.mp3');
const mongoUrl = "mongodb+srv://jaemin:sjk@931207@cluster0.3lo3bxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let userInteracted = false;  // 사용자의 상호작용 여부

const mainList = document.querySelectorAll('.main-list');
const roomListHTML = "roomList.html";
const openLoginModal = document.querySelector(".open-modal");
const modal = document.querySelector(".modal-overlay");
const createUserBtn = document.querySelector(".create-modal-btn");

const loginId = document.querySelector("#login-id");
const loginPwd = document.querySelector("#login-pwd");

mainList.forEach((list) => {
    list.addEventListener('click', () => {
        hoverSound.currentTime = -1000;
        hoverSound.play().catch(error => console.error('Sound play error', error));
        list.classList.add('clicked-list');
        console.log(list.classList);
        if (list.classList.contains("game-start")) {
            modal.style.display = "flex";
            // window.location.href = roomListHTML;
        }
    });
});

createUserBtn.addEventListener("click", () => {
    console.log(loginId.value);
    console.log(loginPwd.value);
    fetch("http://localhost:3000/data", {
        method: 'POST',  // ✅ 여기에 method 지정
        headers: {
            'Content-Type': 'application/json',  // ✅ JSON으로 보낸다는 명시
        },
        body: JSON.stringify({
            id : loginId.value,
            pw : loginPwd.value
        }),
    })
        .then(res => res.json())
        .then(data => {
            console.log("게임데이터 : ", data);
        });
});