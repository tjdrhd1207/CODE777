import { CARD_INFO } from "../model/Card";

export class CardDeck {
    constructor(cards) {
        this.cards = [...cards];
    }

    shuffle() {
        for (let i= this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    draw() {
        // 숫자덱을 드로우 함
        // 숫자덱 뭉치에서 하나 꺼냄
        const deck = this.cards.pop();
        return deck;
    }

    playerCardShuffle(player) {
        player.hand.forEach((handCard) => {
            this.cards.push(handCard);
        });
        this.shuffle();
    }

    dealCards() {
        console.log(this.cards);
        return this.cards;
  
    }

    getAllCardValues() {
        const cardSet = new Set();
        CARD_INFO.forEach((card) => {
            cardSet.add(card.value);
        });

        return cardSet;
    }
}