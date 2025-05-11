import RoomManager from "./roomManager.js";
import Room from "./room.js";
import { generateUniqueId } from "./utils.js";
import { checkLoginOrRedirect } from "./frontend/auth/auth.js";

let BACKEND_URL = "http://localhost:3030";
let currentUserId = null;

document.addEventListener("DOMContentLoaded", async function() {
    const currentUserId = await checkLoginOrRedirect();

    if (!currentUserId) return;

    console.log("유저 id : "+ currentUserId);
    const userDiv = document.querySelector(".user-id");
    if (currentUserId.trim() != "") {
        userDiv.textContent += currentUserId;
        userDiv.textContent += "님 환영합니다.";
        selectRoomList();
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

roomList.addEventListener("dblclick", (e) => {
    console.log(e.target);
    Room.join(currentUserId);
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

    createRoomFetch(roomInfo);

    modal.style.display = "none";
    roomNumber += 1;
    roomName.value = "";
    roomCapacity.selectIndex = 0;
    roomTurnTime.value = 45;
})


const createRoomInTable = (roomInfo) => {
    const roomTable = document.querySelector(".room-table tbody");
    const newRow = document.createElement("tr");
    console.log(roomInfo);
    newRow.innerHTML = `
        <td>${roomNumber}</td>
        <td>${roomInfo.name}</td>
        <td>1/${roomInfo.capacity}</td>
        <td>${roomInfo.turnTime}</td>
        <td>대기중</td>
    `;
    
    roomTable.appendChild(newRow);
}

function createRoomFetch(roomInfo) {
    fetch(`${BACKEND_URL}/createRoom`, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            id: roomInfo.id,
            name: roomInfo.name,
            capacity: roomInfo.capacity,
            turnTime: roomInfo.turnTime
        }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.code === 1) {
                console.log('성공');
                createRoomInTable(roomInfo);
                RoomManager.createRoom(roomInfo);            
            } else {
                alert('방이름이 중복됩니다.');
                console.log('실패');
            }
        })
}

function selectRoomList(roomInfo) {
    fetch(`${BACKEND_URL}/selectRoom`, {
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
        },
    })
        .then(res => res.json())
        .then(data => {
            if (data.code === 1) {
                console.log('성공');
                const searchedRoomList = data.list;
                console.log(searchedRoomList);
                searchedRoomList.forEach((room) => {
                    createRoomInTable(room);
                });
            } else {
                console.log('실패');
            }
        });
}