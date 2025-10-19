class Player {
    constructor(userId, index) {
        this.userId = userId;
        this.index = index;
        this.hand = [];
        this.coin = 0; //승리 코인
    }

    drawDeck() {
        // 덱을 드로우하는 행동
        this.draw = Deck.draw();
    }

    // 카드를 나눠받기
    deal(cardDeck) {
        for (let i=0; i < 3; i++) {
            this.hand.push(cardDeck.pop());
        }
        console.log(`${this.userId}에게 나눠진 카드 : ${this.hand[0].value}, ${this.hand[1].value}, ${this.hand[2].value}`);
    }

    callAnswer(answer) {
        
    }

    retrieve() {
        this.hand.splice(0, this.hand.length);
    }

    playerWin() {
        this.coin += 1;
    }

    getCoin() {
        return this.coin;
    }

}

export default Player;