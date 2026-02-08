import { checkLoginOrRedirect } from '../core/auth/authGuard.js';
import RoomStore from '../store/RoomStore.js';
import { fetchRoomList } from './roomListAPI.js';
import { bindRoomListEvents } from './roomListEvent.js';
import { renderRoom } from './roomListUI.js';

let currentUserId = null;

export async function initRoomListPage() {

    currentUserId = await checkLoginOrRedirect();

    if (!currentUserId) return;

    document.querySelector(".user-id").textContent = `${currentUserId}님 환영합니다.`;

    const rooms = await fetchRoomList();
    rooms.forEach(room => {
        renderRoom(room);
        RoomStore.registerFromData(room);
    });

    bindRoomListEvents(currentUserId)
}