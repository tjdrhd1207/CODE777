let roomNumber = 1;

export function renderRoom(roomInfo) {
    const roomTable = document.querySelector(".room-table tbody");
    const newRow = document.createElement("tr");
        newRow.classList.add("room");
        newRow.dataset.roomInfo = roomInfo.id;
        newRow.innerHTML = `
            <td class=room-number>${roomNumber++}</td>
            <td class=room-name>${roomInfo.name}</td>
            <td class=room-capacity>1/${roomInfo.capacity}</td>
            <td ckass=room-turntime>${roomInfo.turnTime}</td>
            <td>대기중</td>
        `;

        roomTable.appendChild(newRow);
}
