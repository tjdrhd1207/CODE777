import { checkLoginOrRedirect } from "../frontend/auth/auth.js";
// import { io } from "socket.io-client";

export async function initLobbyPage() {
    const socket = io("http://localhost:3030"); // 서버 주소

    console.log("🟢 소켓 객체:", socket); // ✅ 소켓 객체 확인

    socket.on("connect", () => {
        console.log("Connected to server:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.error("❌ 연결 에러:", err);
    });

    const inputTag = document.querySelector(".input-message");
    const textMsgContainer = document.querySelector(".show-messages-container");
    const participant = document.querySelector(".particpant");
    const roomName = document.querySelector(".room-name h1");
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
            participant.textContent = "현재 참가자 : " + data.participants.join(', ');
            console.log('업데이트된 참가자 목록 : ' + data.participants);

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

            const indexTd = document.createElement('td');
            indexTd.textContent = index + 1; // 번호 1부터 시작
            const nameTd = document.createElement('td');
            nameTd.textContent = userId;
            const readyTd = document.createElement('td');
            readyTd.textContent = "⏳ 대기"; // 초기 상태

            tr.appendChild(indexTd);
            tr.appendChild(nameTd);
            tr.appendChild(readyTd);

            participantTable.appendChild(tr);
        });

        // 3️⃣ participant 텍스트도 갱신
        participant.textContent = "현재 참가자 : " + data.participants.join(', ');
        console.log('업데이트된 참가자 목록 : ' + data.participants);
        }
    });
    

    // 준비버튼 확인
    socket.on('updateReadyState', ({ userId, ready}) => {
        console.log("준비2");
        updateParticipantReadyUI(userId, ready);
    });

    function updateParticipantReadyUI(userId, ready) {
        console.log("준비버튼ui");
        const participantRow = document.querySelector(`#participant-${userId}`);
        if (!participantRow) return;

        const readyTd = participantRow.querySelector("td:nth-child(3)");
        readyTd.textContent = ready ? "✅ 준비 완료" : "⏳ 준비 중";
        readyBtn.style.backgroundColor = "gray";
        readyBtn.textContent = "준비완료";
    }

    /* console.log(roomInfo.players);
    const selectedRoom = RoomManager.getRoom(roomInfo.id);
    const participantsList = selectedRoom.players || [];
    console.log(participantsList); */

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
        console.log("나가기");
    });

    readyBtn.addEventListener("click", () => {
        console.log("준비");
        console.log("소켓 : "+socket.id);
        socket.emit("playerReady", { roomId, userId: currentUserId })
    })
}

