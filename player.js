class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        
    }

    drawDeck() {
        // 덱을 드로우하는 행동
        this.draw = Deck.draw();
    }

    // 질문에 대답하기
    answer(question) {
        
    }

}