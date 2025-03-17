import { v4 as uuid } from "uuid";

class Room {
    constructor(name, players) {
        this.id = uuid();
        this.name = name;
        this.players = players;
    }

    join(player) {
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