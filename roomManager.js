import Room from "./room.js";

class RoomManager {
    static rooms = new Map();

    static createRoom(name) {
        const room = new Room(name);
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