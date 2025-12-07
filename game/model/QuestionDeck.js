class QuestionDeck {
    constructor() {
        this.deckCards = [
            { seq: 1, question: '숫자의 합이 18 이상인 선반은 몇 개입니까?' },
            { seq: 2, question: '숫자의 합이 12 이하인 선반은 몇 개입니까?' },
            { seq: 3, question: '숫자는 같고 색깔은 다른 타일이 있는 받침대는 몇 개입니까?' },
            { seq: 4, question: '3개의 타일이 모두 색깔이 다른 받침대는 몇 개입니까?' },
            { seq: 5, question: '짝수만 있거나 홀수만 있는 받침대는 몇 개입니까?' },
            { seq: 6, question: '색깔과 숫자 모두 완전히 같은 타일이 있는 받침대는 몇 개입니까?' },
            { seq: 7, question: '3개의 타일이 연속된 숫자인 받침대는 몇 개입니까?' },
            { seq: 8, question: '몇 가지 색깔이 보입니까?' },
            { seq: 9, question: '세번 이상 보이는 색깔은 몇개입니까?' },
            { seq: 10, question: '하나도 보이지 않는 숫자는 몇 개입니까?' },
            { seq: 11, question: '녹색 1, 검정 5, 분홍 7이 총 몇개 보입니까?' },
            { seq: 12, question: '3과 분홍6 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 13, question: '녹색 6과 노랑 7 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 14, question: '노랑 2와 노랑 7 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 15, question: '분홍 6와 노랑 6 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 16, question: '파랑 7과 다른 색깔 7 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 17, question: '갈색과 파랑 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 18, question: '빨강과 분홍 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 19, question: '녹색과 파랑 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 20, question: '노랑과 분홍 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 21, question: '검정과 갈색 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 22, question: '검정과 빨강 중에서 어느 것이 더 많이 보입니까?' },
            { seq: 23, question: '녹색과 노랑 중에서 어느 것이 더 많이 보입니까?' },
        ];
        this.nowQuestion = null;
        this.shuffle();
        this.originalCards = [...this.deckCards];
    }

    draw() {
        if (this.deckCards.length === 0) {
            this.reShuffle();
        }
        // 덱을 드로우 함
        // 덱 뭉치에서 하나 꺼냄
        const drawedQuestion = this.deckCards.shift();
        this.nowQuestion = drawedQuestion;
        return drawedQuestion;
    }

    question(deckCard) {
        // 다른 유저들에게 덱 내용을 질문함
        // deckCard.question 
    }

    shuffle() {
        for (let i= this.deckCards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.deckCards[i], this.deckCards[j]] = [this.deckCards[j], this.deckCards[i]];
        }
        console.log(this.deckCards);
        return this.deckCards;
    }

    reShuffle() {
        this.deckCards = [...this.originalCards];
        this.shuffle();
    }

    drawTest(seq) {
        return this.deckCards[seq-1];
    }
}

export default QuestionDeck;