let BACKEND_URL = "http://localhost:3030";

export function initMainPage() {

    document.addEventListener("DOMContentLoaded", async function() {
        console.log('실행');
        const initMessage = document.getElementById("welcom-message");
        let user;

        // 서버에 로그인 상태 확인 요청
        try {
            const response = await fetch(`${BACKEND_URL}/check-login`, {
                withCredentials: true,
            });
            const data = await response.json();
            console.log(data);
            // 로그인 상태가 아니라면 로그인 페이지로 리디렉션
            /* if (!data.loggedIn) {
                window.location.href = "main.html";
            } */
        } catch (error) {
            console.error(error);
            res.status(500).send({ code: -1, message: "요청 처리 중 오류" });
        }

        //유저 데이터 조회
        /* try {
            const response = await fetch("http://localhost:3000/user", {
                withCredentials: true,
            });
            user = response.data.id;
        } catch (error) {
            console.error(error);
            //만약 로그인 상태가 아닌 경우 로그인 페이지로 리디렉션
            if (error.response.status === 403) {
                window.location.href = "main.html";
            }
        }

        console.log(initMessage); */
    });

    const hoverSound = new Audio('assets/mouse-hover.mp3');
    const mongoUrl = "mongodb+srv://jaemin:sjk@931207@cluster0.3lo3bxi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    let userInteracted = false;  // 사용자의 상호작용 여부

    const mainList = document.querySelectorAll('.main-list');
    const roomListHTML = "roomList.html";
    // const openLoginModal = document.querySelector(".open-modal");
    const modal = document.querySelector(".modal-overlay");
    const createUserBtn = document.querySelector("#createUser");
    const loginUserBtn = document.querySelector("#loginUser");

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
        fetch(`${BACKEND_URL}/createUser/create`, {
            method: 'POST',  // ✅ 여기에 method 지정
            headers: {
                'Content-Type': 'application/json',  // ✅ JSON으로 보낸다는 명시,
            },
            credentials: "include",
            body: JSON.stringify({
                id: loginId.value,
                pw: loginPwd.value
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log("게임데이터 : ", data);

                //회원가입 성공 시
                if (data.code === 1) { 
                    window.location.href = "roomList.html";
                } else if (data.code === 0) {
                    alert("이미 존재하는 아이디입니다.");
                }
            })
            .catch(err => {
                console.error("에러 발생: ", err);
            })
    });

    document.querySelector('#openModal').addEventListener("keydown", (e) => {
        if (loginId.value !== "" && loginPwd !== "") {
            if (e.key === 'Enter') {
                console.log(e.key);
                // 로그인 실행
                loginFetch();
            }
        }
    });

    loginUserBtn.addEventListener("click", () => {
        loginFetch();
    })

    function loginFetch() {
        fetch(`${BACKEND_URL}/login/selectUser`, {
            method: 'POST',  // ✅ 여기에 method 지정
            headers: {
                'Content-Type': 'application/json',  // ✅ JSON으로 보낸다는 명시
            },
            body: JSON.stringify({
                id: loginId.value,
                pw: loginPwd.value
            }),
        })
            .then(res => res.json()) // 응답의 body를 json으로 읽는다.
            .then(data => {
                console.log("조회 : ", data);
                // 성공적으로 조회
                if (data.code === 1) {
                    location.hash = '/roomList';
                } else {
                    alert(data.message);
                }
            })
    }
}