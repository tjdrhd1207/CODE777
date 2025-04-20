import RoomManager from "./roomManager.js";
import { generateUniqueId } from "./utils.js";
import { checkLoginOrRedirect } from "./frontend/auth/auth.js";

document.addEventListener("DOMContentLoaded", async function() {
    const userId = await checkLoginOrRedirect();

    if (!userId) return;

    console.log("유저 id : "+ userId);
    const userDiv = document.querySelector(".user-id");
    if (userId.trim() != "") {
        userDiv.textContent += userId;
        userDiv.textContent += "님 환영합니다.";
    } else {

    }
});

const openCreateRoomModal = document.querySelector(".open-modal");
const modal = document.querySelector(".modal-overlay");
const closeModal = document.querySelector("#closeModal");
const createRoomBtn = document.querySelector("#createRoom");
const roomList = document.querySelector(".room-list");

let roomNumber = 1;

openCreateRoomModal.addEventListener("click", () => {
    modal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

roomList.addEventListener("dblclick", () => {
    window.location.href = "lobby.html";
})

createRoomBtn.addEventListener("click", () => {
    const roomName = document.querySelector("#room-name");
    const roomCapacity = document.querySelector("#room-capacity");
    const roomTurnTime = document.querySelector("#room-turn-time");

    const roomInfo = Object.assign({}, {
        id: generateUniqueId(),
        name: roomName.value,
        capacity: roomCapacity.value,
        turnTime: roomTurnTime.value    
    });
    createRoomInTable(roomInfo);
    RoomManager.createRoom(roomInfo);

    modal.style.display = "none";
    roomNumber += 1;
    roomName.value = "";
    roomCapacity.selectIndex = 0;
    roomTurnTime.value = 45;
})


const createRoomInTable = (roomInfo) => {
    const roomTable = document.querySelector(".room-table tbody");
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>${roomNumber}</td>
        <td>${roomInfo.name}</td>
        <td>1/${roomInfo.capacity}</td>
        <td>${roomInfo.turnTime}</td>
        <td>대기중</td>
    `;
    
    roomTable.appendChild(newRow);
}