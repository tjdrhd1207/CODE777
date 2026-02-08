import { socket } from "../socket/socket.js";
import { checkLoginOrRedirect } from "../core/auth/authGuard.js";
import { lobbyState } from "../domain/Lobby/LobbyState.js";
import { handleParticipants, handleReady, handleStartGame } from "../handler/lobby/lobbyHandlers.js";
import { bindLobbySocket } from "../socket/lobbysocket.js";

export async function initLobbyPage() {

    // 1. 로그인 확인
    const currentUserId = await checkLoginOrRedirect();

    // 2. room 정보
    const storageRoomInfo = localStorage.getItem("selectedRoom");
    const roomInfo = JSON.parse(storageRoomInfo);
    const roomId = roomInfo.id;

    // 3. DOM
    const roomName = document.querySelector(".room-name h1");
    const startGameBtn = document.querySelector("#start-game");
    const exitBtn = document.querySelector("#exit-room");
    const readyBtn = document.querySelector("#ready-game");

    roomName.textContent = roomInfo.name;

    // 4. socket join
    socket.emit("joinRoom", { roomId, userId: currentUserId });

    // 5. socekt 바인딩
    const context = {
        lobbyState,
        currentUserId,
        roomId
    };

    bindLobbySocket(socket, { roomId }, {
        onParticipants: (data) => handleParticipants(data, context),
        onReady: (data) => handleReady(data, context),
        onStartGame: (data) => handleStartGame(data, context)
    });

    // 6. 버튼 이벤트
    readyBtn.addEventListener("click", () => {
        socket.emit("playerReady", { roomId, userId: currentUserId });
    });

    startGameBtn.addEventListener("click", () => {
        socket.emit("startGame", { roomId });
    });

    exitBtn.addEventListener("click", () => {
        socket.emit("leaveRoom", { roomId, userId: currentUserId });
        location.hash = "/roomList";
    });

    window.addEventListener("beforeunload", () => {
        socket.emit("leaveRoom", { roomId, userId: currentUserId });
    });

}

