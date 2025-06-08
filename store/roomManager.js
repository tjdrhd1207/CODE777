import Room from "../room/model/room.js";

class RoomManager {
    static rooms = new Map();

    static async initRoomFromDb(db) {
        console.log(db);
        const roomList = await db.collection('room').find({}).toArray();
        roomList.forEach((roomObject) => {
            const room = new Room(roomObject);
            RoomManager.rooms.set(room.id, room);
        });
        console.log(this.rooms);
    }

    static registerFromData(data) {
        if (!this.rooms.has(data.id)) {
            const room = new Room(data);
            this.rooms.set(room.id, room);
        }
    }

    static createRoom(info) {
        console.log(info);
        const room = new Room(info);
        this.rooms.set(room.id, room);
        console.log(this.rooms);

        return room;
    }

    static deleteRoom(roomId) {
        if (this.rooms.has(roomId)) {
            this.rooms.delete(roomId);
            console.log(`Room ${roomId} has been deleted.`);
        }
    }

    static getRoom(roomId) {
        console.log("[getRoom] 현재 rooms:", this.rooms);
        return this.rooms.get(roomId);
    }

    static getAllRoom() {
        return Array.from(this.rooms.values());
    }
}

// esm모듈
export default RoomManager;

// commonJS 호환
if (typeof module !== "undefined") {
    module.exports = RoomManager;
}