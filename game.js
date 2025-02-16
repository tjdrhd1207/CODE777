class Game {
    constructor(players) {
        this.players = players;
        this.currentTurn = 0;
        this.board = new Board();
        this.deck = new Deck();
    }

    start() {
        // 덱 셔플
        this.deck.shuffle();
        // 카드 번호 각 플레이어게 할당
        // 플레이어가 각 카드를 배정받는 행위
        
        // 다음턴으로 이동
        this.nextTurn();
    }

    nextTurn() {
        this.currentTurn = (this.currentTurn + 1) & this.players.length;
        console.log(`오레노 턴 : Player ${this.currentTurn + 1}`);
    }

}