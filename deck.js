class Deck {
    constructor() {
        this.deckCards = [
            { seq: 1, question: '숫자의 합이 18 이상인 선반은 몇 개입니까?' },
            { seq: 2, question: '숫자의 합이 12 이하인 선반은 몇 개입니까?' },
            { seq: 3, question: '숫자는 같고 색깔은 다른 타일이 있는 받침대는 몇 개입니까?' },
            { seq: 4, question: '3개의 타일이 모두 색깔이 다른 받침내느 몇 개입니까?' },
            { seq: 5, question: '짝수만 있거나 홀수만 있는 받침대는 몇 개입니까?' },
            { seq: 6, question: '색깔과 숫자 모두 완전히 같은 타일이 있는 받침대는 몇 개입니까?' },
            { seq: 7, question: '3개의 타일이 연속된 숫자인 받침대는 몇 개입니까?' },
            { seq: 8, question: '몇 가지 색깔이 보입니까?' },
        ];
    }

    draw() {
        // 덱을 드로우 함
        // 덱 뭉치에서 하나 꺼냄
        this.deckCards.pop(); 
    }

    question(deckCard) {
        // 다른 유저들에게 덱 내용을 질문함
        // deckCard.question 
    }

    shuffle() {
        this.deckCards
    }

    reShuffle() {

    }

}