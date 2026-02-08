class Room {
    constructor({ id, name, capacity, turnTime, users = [] }) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.turnTime = turnTime;
        this.users = users;
    }

    join(userId) {
        if (this.users.includes(userId)) return;

        if (this.users.length >= this.capacity) {
            throw new Error("방이 가득 찼습니다.");
        }
        this.users.push(userId);
    }
    
    leave(userId) {
        this.users = this.users.filter((user) => user !== userId);
    }
}

export default Room;