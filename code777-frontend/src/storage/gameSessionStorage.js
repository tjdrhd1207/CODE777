// gameSessionStorage.js
export function saveGameSession({ roomId, players, currentUserId }) {
    localStorage.setItem("roomId", roomId);
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("currentUserId", currentUserId);
}