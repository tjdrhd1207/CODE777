import Board from "/game/board.js";
import QuestionDeck from "/game/model/QuestionDeck.js";   // 또는 CardDeck.js
import { CardDeck } from "/game/logic/CardDeck.js";
import { generateDeck } from "/game/logic/cardFactory.js";
// import { arrayHasElement } from "../../utils/utils.js";
import {
  animateShuffle,
  hintDeckDrawSetting,
  hideMyHand,
  hintDeckInitSetting,
  animateDeal,
  deckAnswerSetting,
  retrieveAnimation
} from "/game/logic/animation.js";

class Game {

    constructor(players) {
        this.players = players;
        this.previousTurn = 0;
        this.currentTurn = 0;
        this.board = new Board();
        this.questionDeck = new QuestionDeck();
        // const allCards = Card.CARD_INFO.map(info => new Card(info));
        // console.log(allCards);
        const deckArray = generateDeck();
        console.log(deckArray);
        this.cardDeck = new CardDeck(deckArray);
        // this.cardDeck.cardSetting();
    }

    shuffleQuestionDeck() {
        this.questionDeck.shuffle();
    }

    //현재 플레이어
    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }

    drawQuestionCard() {
        return this.questionDeck.draw();
    }

    getCorrectAnswer(question) {
        // 원래 correctAnswer 내부 로직을 여기에 통합하거나 utils로 분리 가능
    }

    //이전 턴
    advanceTurn() {
        this.previousTurn = this.currentTurn;
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    reshufflePlayerCards(player) {
        this.cardDeck.playerCardShuffle(player);
        player.retrieve();
        player.deal(this.cardDeck.card);
    }

    start() {
        // TODO
        // 스타트 시에 이전의 정보는 다 리셋되어야 할 것 같음
        // 스타트를 계속하면 더 추가가 됨

        console.log("--Game Start--");
        const board = document.querySelector(".board");
        const boardCenter = document.querySelector(".board-center");
        let playerDivs = [];
        hintDeckInitSetting(boardCenter);
        this.previousTurn = this.currentTurn;

        // 알고리즘 덱 셔플
        console.log(this.cardDeck);
        // this.deck.shuffle();
        // 애니메이션 덱 셔플
        animateShuffle().then(() => {
            for (let i = 0; i < this.players.length; i++) {
                const player = this.players[i];
                player.deal(this.cardDeck.card);
            }
            console.log(this.cardDeck.card);
            animateDeal(this.cardDeck.card, this.players, playerDivs);
    
            // 다음턴으로 이동
            this.nextTurn();
    
        });

        // 플레이어별 카드 나눠받기
    }

    nextTurn() {
        const previousNameTag = document.querySelector(`.${this.players[this.previousTurn].name}`);
        const previousImgTag = previousNameTag.querySelector(".hand");
        if (previousImgTag) {
            previousNameTag.removeChild(previousImgTag);
        }

        this.currentTurn = (this.currentTurn + 1) % this.players.length;
        this.previousTurn = this.currentTurn;

        const nameTag = document.querySelector(`.${this.players[this.currentTurn].name}`);
        const turnImg = document.createElement("img");

        turnImg.classList.add("hand");
        turnImg.setAttribute("src", 'assets/hand-icon2.png');
        nameTag.appendChild(turnImg);

        console.log(`오레노 턴 : Player ${this.currentTurn + 1}`);
        console.log(this.getCurrentPlayer().name);

        const drawedDeck = this.deck.draw();
        hintDeckDrawSetting(drawedDeck, this.deck);

        this.answer = this.correctAnswer(drawedDeck);
        deckAnswerSetting(this.answer);
    }

    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }

    

    

    showMoreColor(color1, color2, color1Name, color2Name) {
        let pedestal;
        let color1Count = 0;
        let color2Count = 0;
        
        this.players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== this.players[this.currentTurn].id) {

                player.hand.forEach((card) => {
                    if (card.color === color1) {
                        color1Count += 1;
                    } else if (card.color === color2) {
                        color2Count += 1;
                    }
                });
            }
        })
        pedestal = (color1Count > color2Count) ? color1Name : (color1Count === color2Count ? '더 많이 보이지 않습니다.' : color2Name);
        
        return pedestal;
    }
    
}

export default Game;