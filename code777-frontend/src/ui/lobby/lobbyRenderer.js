export function renderParticipants(lobbyState, currentUserId) {
    participantTable.innerHTML = `
        <tr>
            <th>#</th>
            <th>이름</th>
            <th>준비 상태</th>
        </tr>
    `;

    lobbyState.participants.forEach((participant, index) => {
        const tr = document.createElement('tr');
        tr.id = `participant-${participant.userId}`;

        if (participant.userId === currentUserId) {
            tr.classList.add("currentTr");
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${participant.userId}</td>
            <td>${lobbyState.isReady(participant.userId) ? "✅ 준비 완료" : "⏳ 대기"}</td>
        `;

        participant.textContent =
            "현재 참가자 : " +
            lobbyState.participants.map(p => p.userId).join(", ");

        // 시작 버튼 상태
        startGameBtn.disabled = !lobbyState.isAllReady();
    });
}