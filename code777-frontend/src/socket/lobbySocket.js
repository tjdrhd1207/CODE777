import { lobbyState } from "../domain/Lobby/LobbyState.js";

export function bindLobbySocket(socket, { roomId }, handlers) {
    socket.on("updateParticipants", data => {
        if (data.roomId !== roomId) return;
        handlers.onParticipants(data.participants);
    });

    socket.on("updateReadyState", handlers.onReady);
    socket.on("startGame", data => {
        handlers.onStartGame(data);
    });
}

export function registerLobbySocket(socket, roomId, currentUserId) {
    
    socket.on('updateParticipants', (data) => {
        if (data.roomId !== roomId) return;
        
        lobbyState.setParticipants(data.participants);
        renderParticipants(lobbyState, currentUserId);
    });

    socket.on('updateReadyState', ({ userId, ready }) => {
        lobbyState.setReady(userId, ready);
        renderParticipants(lobbyState, currentUserId);
    });
}