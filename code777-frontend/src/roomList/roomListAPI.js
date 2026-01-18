import { ENV } from "../../env.js";

export async function createRoom(roomInfo) {
    const res = await fetch(`${ENV.BACKEND_URL}/createRoom`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roomInfo),
    });
    return res.json();
}

export async function fetchRoomList() {
    const res = await fetch(`${ENV.BACKEND_URL}/selectRoom`);
    const data = await res.json();
    return data.code === 1 ? data.list : [];
}