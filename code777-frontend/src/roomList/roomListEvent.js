import RoomStore from "../store/RoomStore.js";
import { generateUniqueId } from "../utils.js";
import { createRoom, fetchRoomList } from "./roomListAPI.js";
import { renderRoom } from "./roomListUI.js";

export function bindRoomListEvents(currentUserId) {

    const openCreateRoomModal = document.querySelector(".open-modal");
    const modal = document.querySelector(".modal-overlay");
    const closeModal = document.querySelector("#closeModal");
    const createRoomBtn = document.querySelector("#createRoom");
    const roomList = document.querySelector(".room-list");

    const userDiv = document.querySelector(".user-id");
    if (currentUserId.trim() != "") {
        userDiv.textContent += currentUserId;
        userDiv.textContent += "님 환영합니다.";
    } else {

    }

    openCreateRoomModal.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 방 입장
    roomList.addEventListener("dblclick", (e) => {
        let targetRoom = e.target.closest(".room");
        let roomId = targetRoom.dataset.roomInfo;
        let selectedRoom = RoomStore.getRoom(roomId);
        selectedRoom.join(currentUserId);

        localStorage.setItem('selectedRoom', JSON.stringify(selectedRoom));

        location.hash = '/lobby';
    });

    createRoomBtn.addEventListener("click", async () => {
        const roomName = document.querySelector("#room-name");
        const roomCapacity = document.querySelector("#room-capacity");
        const roomTurnTime = document.querySelector("#room-turn-time");

        const roomInfo = {
            id: generateUniqueId(),
            name: roomName.value,
            capacity: Number(roomCapacity.value),
            turnTime: Number(roomTurnTime.value),
        };

        const result = await createRoom(roomInfo);

        if (result.code === 1) {
            renderRoom(roomInfo);
            RoomStore.createRoom(roomInfo);
            modal.style.display = "none";
        } else {
            alert("방 이름 중독");
        }

    })

}