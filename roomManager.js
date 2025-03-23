import Room from "./room.js";

class RoomManager {
    static rooms = new Map();

    static createRoom(info) {
        console.log(info);
        const room = new Room(info);
        this.rooms.set(room.id, room);
        return room;
    }

    static deleteRoom(roomId) {
        if (this.rooms.has(roomId)) {
            this.rooms.delete(roomId);
            console.log(`Room ${roomId} has been deleted.`);
        }
    }

    static getRoom(roomId) {
        return this.rooms.get(roomId);
    }
}

export default RoomManager;