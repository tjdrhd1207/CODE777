// frontend/store/RoomStore.js
class RoomStore {
  static rooms = new Map();

  static registerFromServer(roomList) {
    roomList.forEach(room => {
      this.rooms.set(room.id, room);
    });
  }

  static getRoom(id) {
    return this.rooms.get(id);
  }
}

// esm모듈
export default RoomStore;

// commonJS 호환
if (typeof module !== "undefined") {
    module.exports = RoomStore;
}