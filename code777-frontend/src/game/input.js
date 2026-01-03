export function bindGameInputs({ socket, roomId, currentUserId }) {
    bindShuffle(socket, roomId);
    bindNextTurn(socket, roomId);
    bindAnswer(socket, roomId, currentUserId);
}

/* 셔플 버튼 이벤트 */
function bindShuffle(socket, roomId) {
  const btn = document.querySelector(".shuffle-button");
  if (!btn) return;

  btn.addEventListener("click", () => {
    socket.emit("startGameAndShuffle", { roomId });
  });
}

/* 턴넘기기 버튼 이벤트 */
function bindNextTurn(socket, roomId) {
  const btn = document.querySelector(".next-turn-button");
  if (!btn) return;

  btn.addEventListener("click", () => {
    socket.emit("nextTurn", { roomId });
  });
}

/* 정답 외치기 버튼 이벤트 */
function bindAnswer(socket, roomId, userId) {
  const btn = document.querySelector(".attempt-answer-button");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      const answer = await openAnswerModal();
      socket.emit("submitAnswer", { roomId, userId, answer });
    } catch {
      // cancel
    }
  });
}