
class Room {
    constructor(room) {
        this.id = 1;
        this.name = room.name;
        this.capacity = room.capacity;
        this.turnTime = room.turnTime;
        this.players = [];
    }

    join(player) {
        console.log("플레이어 입장");
        console.log(player);
        this.players.push(player);
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
}

export default Room;