import { checkLoginOrRedirect } from "../frontend/auth/auth.js";
// import { io } from "socket.io-client";
import { socket } from "../socket/socket.js"; 

let BACKEND_URL = "http://localhost:3030";

export async function initLobbyPage() {
    // const socket = io(BACKEND_URL); // 서버 주소

    console.log("🟢 소켓 객체:", socket); // ✅ 소켓 객체 확인

    socket.on("connect", () => {
        console.log("Connected to server:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.error("❌ 연결 에러:", err);
    });

    const participantsReadyState = {}; // 각 참가자별 준비상태 저장

    const inputTag = document.querySelector(".input-message");
    const textMsgContainer = document.querySelector(".show-messages-container");
    const participant = document.querySelector(".particpant");
    const roomName = document.querySelector(".room-name h1");
    const startGameBtn = document.querySelector("#start-game");
    const exitBtn = document.querySelector("#exit-room");
    const readyBtn = document.querySelector("#ready-game");
    const participantTable = document.querySelector(".room-table");


    const storageRoomInfo = localStorage.getItem('selectedRoom');
    const roomInfo = JSON.parse(storageRoomInfo);
    const roomId = roomInfo.id;
    let currentUserId = await checkLoginOrRedirect();

    // 서버에 joinRoom 요청 보내기 (입장 알림)
    socket.emit('joinRoom', { roomId, userId: currentUserId });

    // 서버에 참가자 업데이트 이벤트
    socket.on('updateParticipants', (data) => {
        if (data.roomId === roomId) {
            const currentParticipants = data.participants;

            for (const userId in participantsReadyState) {
                if (!currentParticipants.includes(userId)) {
                    delete participantsReadyState[userId];
                }
            };

            participant.textContent = "현재 참가자 : " + data.participants.join(', ');
            participantTable.innerHTML = `
                <tr>
                    <th>#</th>
                    <th>이름</th>
                    <th>준비 상태</th>
                </tr>
            `;

            // 2️⃣ 새로운 참가자 목록으로 테이블 채우기
            data.participants.forEach((userId, index) => {
                const tr = document.createElement('tr');
                tr.id = `participant-${userId}`;

                if (currentUserId === userId) {
                    tr.classList.add("currentTr");
                }

                const indexTd = document.createElement('td');
                indexTd.textContent = index + 1; // 번호 1부터 시작
                const nameTd = document.createElement('td');
                nameTd.textContent = userId;
                const readyTd = document.createElement('td');

                const isReady = participantsReadyState[userId] || false;
                readyTd.textContent = isReady ? "✅ 준비 완료" : "⏳ 대기";

                tr.appendChild(indexTd);
                tr.appendChild(nameTd);
                tr.appendChild(readyTd);

                participantTable.appendChild(tr);

                // 새 유저면 초기값 추가
                if (!(userId in participantsReadyState)) {
                    participantsReadyState[userId] = false;
                }
            });

            // 3️⃣ participant 텍스트도 갱신
            participant.textContent = "현재 참가자 : " + data.participants.join(', ');
            console.log('업데이트된 참가자 목록 : ' + data.participants);
        }
    });


    // 준비버튼 확인
    socket.on('updateReadyState', ({ userId, ready }) => {
        console.log("준비2");
        console.log(ready);
        // 준비 상태 저장
        participantsReadyState[userId] = ready;

        if (userId === currentUserId) {
            if (ready) {
                readyBtn.style.backgroundColor = "gray";
                readyBtn.textContent = "준비완료";
                readyBtn.disabled = true;
            } else {
                readyBtn.style.backgroundColor = "#d1fbd6";
                readyBtn.textContent = "준비";
                readyBtn.disabled = false;
            }
        }

        // UI 반영
        updateParticipantReadyUI(userId, ready);

        // 모든 참가자가 준비완료인지 체크
        checkAllReady();
    });

    function updateParticipantReadyUI(userId, ready) {
        const participantRow = document.querySelector(`#participant-${userId}`);
        if (!participantRow) return;

        const readyTd = participantRow.querySelector("td:nth-child(3)");
        readyTd.textContent = ready ? "✅ 준비 완료" : "⏳ 대기";

        /* if (userId === currentUserId) {
            readyBtn.style.backgroundColor = "gray";
            readyBtn.textContent = "준비완료";
            readyBtn.disabled = true;
        } */
    }

    function checkAllReady() {
        const participants = Object.keys(participantsReadyState);
        console.log(participants);
        if (participant.length === 0) return;

        // 한개라도 false인 값이 있으면 false반환
        const allReady = participants.every((userId) => participantsReadyState[userId] === true);

        if (allReady) {
            console.log("모든 참가자 준비 완료!");
            startGameBtn.disabled = false;
            startGameBtn.style.backgroundColor = "blue";
        } else {
            startGameBtn.disabled = true;
            startGameBtn.style.backgroundColor = "#d1fbd6";
        }
    }

    roomName.textContent = roomInfo.name;

    const userName = currentUserId;

    inputTag.addEventListener("keydown", (e) => {
        // Enter키 누를 시
        if (e.keyCode === 13) {
            const messages = inputTag.value;

            // TO-DO : messages를 전달하는 로직 짜야함
            const textDiv = document.createElement("div");
            textDiv.textContent = userName + " : " + messages;
            textMsgContainer.appendChild(textDiv);

            // input 초기화
            inputTag.value = "";
        }
    });

    window.addEventListener('beforeunload', () => {
        socket.emit('leaveRoom', { roomId, userId: currentUserId });
    });

    exitBtn.addEventListener("click", () => {
        socket.emit("leaveRoom", { roomId, userId: currentUserId });
        location.hash = "/roomList";
    });

    readyBtn.addEventListener("click", () => {
        socket.emit("playerReady", { roomId, userId: currentUserId })
    });

    startGameBtn.addEventListener("click", () => {
        socket.emit("startGame", { roomId, userId: currentUserId })
    });

    // 서버에서 startGame 이벤트를 받으면 페이지 이동
    socket.on("startGame", ({ roomId, players }) => {
        // 브라우저에서 location.hash 변경 → router.js에서 페이지 로드
        location.hash = "/game";

        localStorage.setItem("roomId", roomId);
        localStorage.setItem("players", JSON.stringify(players));
        localStorage.setItem("currentUserId", currentUserId);
    });
}

