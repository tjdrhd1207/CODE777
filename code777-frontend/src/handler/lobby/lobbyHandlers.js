import { renderParticipants } from "../../ui/lobby/lobbyRenderer.js";

export function handleParticipants(data, context) {
    context.lobbyState.setParticipants(data.participants);
    renderParticipants(context);
}

export function handleReady({ userId, ready }, context) {
    context.lobbyState.setReady(userId, ready);
    renderParticipants(context);
}

export function handleStartGame({ roomId, players }) {
    // 1. 게임 상태 저장
    saveGameSession({ roomId, players, currentUserId });

    // 2. 화면 전환
    location.hash = "/game";
}