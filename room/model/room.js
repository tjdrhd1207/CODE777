import RoomManager from "../../store/roomManager.js";

class Room {
    constructor({ id, name, capacity, turnTime }) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.turnTime = turnTime;
        this.players = new Set();
    }

    join(player) {
        console.log("플레이어 입장");
        console.log(player);
        console.log(this.players);
        this.players.add(player);
    }

    exit(player) {
        this.players.filter((joinedPlayer) => {
            return player !== joinedPlayer;
        });
        this.deleteIfEmpty();
    }

    delete() {
        if (this.players.length === 0) {
            RoomManager.deleteRoom(this.id);
        }
    }

    get() {
        let info = {
            id: this.id,
            name: this.name
        };
        return info;
    }
}

// esm모듈
export default Room;

// commonJS 호환
if (typeof module !== "undefined") {
    module.exports = Room;
}