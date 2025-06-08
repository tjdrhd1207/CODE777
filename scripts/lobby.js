import { checkLoginOrRedirect } from "../frontend/auth/auth.js";
import RoomManager from "../store/roomManager.js";
import socket from "../frontend/socket/socket.js";

export async function initLobbyPage() {
    const inputTag = document.querySelector(".input-message");
    const textMsgContainer = document.querySelector(".show-messages-container");
    const participant = document.querySelector(".particpant");
    const roomName = document.querySelector(".room-name h1");

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
        }
    });

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
}

