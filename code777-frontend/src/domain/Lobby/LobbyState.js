class LobbyState {
    participants = [];
    readyState = {};

    setParticipants(participants) {
        this.participants = participants;

        const currentIds = participants.map(p => p.userId);

        Object.keys(this.readyState).forEach(id => {
            if (!currentIds.includes(id)) delete this.readyState[id];
        });

        participants.forEach(p => {
            if (!(p.userId in this.readyState)) {
                this.readyState[p.userId] = false;
            }
        });
    }

    setReady(userId, ready) {
        this.readyState[userId] = ready;
    }

    isReady(userId) {
        return !!this.readyState[userId];
    }

    isAllReady() {
        return this.participants.length > 0 &&
               this.participants.every(p => this.readyState[p.userId]);
    }
}

export const lobbyState = new LobbyState();