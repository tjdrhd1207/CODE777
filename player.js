import Card from './card.js';

class Player {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.hand = [];
        
    }

    drawDeck() {
        // 덱을 드로우하는 행동
        this.draw = Deck.draw();
    }

    // 질문에 대답하기
    answer(question) {
        
    }

    // 카드를 나눠받기
    deal(cardDeck) {
        for (let i=0; i < 3; i++) {
            this.hand.push(cardDeck.pop());
        }
        console.log(`${this.name}에게 나눠진 카드 : ${this.hand[0].value}, ${this.hand[1].value}, ${this.hand[2].value}`);
    }

}

export default Player;