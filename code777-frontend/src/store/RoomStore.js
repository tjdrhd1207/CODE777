import Room from "../domain/Room/Room.js";

// frontend/store/RoomStore.js
class RoomStore {
  static rooms = new Map();

  // 단일 room 등록
  static registerFromData(roomData) {
    if (!roomData || !roomData.id) return;

    const room = roomData instanceof Room ? roomData : new Room(roomData);
    this.rooms.set(room.id, room);
  }

  static registerFromServer(roomList) {
    roomList.forEach(roomData =>
      this.registerFromData(roomData)
    );
  }

  static getRoom(id) {
    return this.rooms.get(id);
  }

  static createRoom(room) {
    this.registerFromData(room);
  }

  static getAllRooms() {
    return Array.from(this.rooms.values());
  }

}

// esm모듈
export default RoomStore;

// commonJS 호환
if (typeof module !== "undefined") {
  module.exports = RoomStore;
}