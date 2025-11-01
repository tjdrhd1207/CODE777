import Board from "/game/board.js";
import QuestionDeck from "/game/model/QuestionDeck.js";   // 또는 CardDeck.js
import CardDeck from "/game/logic/CardDeck.js";
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
import { correctAnswer } from "/game/logic/RuleEngine.js";

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

    start(distributedCards, currentUserId) {
        // TODO
        // 스타트 시에 이전의 정보는 다 리셋되어야 할 것 같음
        // 스타트를 계속하면 더 추가가 됨

        console.log("--Game Start--");
        const boardCenter = document.querySelector(".board-center");
        // let playerDivs = [];
        hintDeckInitSetting(boardCenter);
        this.previousTurn = this.currentTurn;
        console.log(distributedCards);
        this.players.forEach((player) => {
            if (distributedCards[player.userId]) {
                player.hand = distributedCards[player.userId];
            }
        });
        animateShuffle().then(() => {

            console.log(this.players);
            animateDeal(this.cardDeck.cards, this.players, currentUserId);

            this.nextTurn();
        });
        // 카드덱 셔플 - 실제 로직상 셔플
        // console.log(this.cardDeck);
        // this.cardDeck.shuffle();
        /* this.cardDeck.cards = initialCards;
        animateShuffle().then(() => {
            for (let i = 0; i < this.players.length; i++) {
                const player = this.players[i];
                player.deal(this.cardDeck.cards);
            }
            console.log(this.cardDeck.cards);
            animateDeal(this.cardDeck.cards, this.players, playerDivs);
    
            // 다음턴으로 이동
            this.nextTurn();
    
        }); */

        // 플레이어별 카드 나눠받기
    }

    nextTurn() {
        const previousNameTag = document.querySelector(`.${this.players[this.previousTurn].userId}`);
        const previousHandRow = previousNameTag.querySelector(".name-hand-row");
        if (previousHandRow) {
            const previousImgTag = previousHandRow.querySelector(".hand");
            if (previousImgTag) {
                previousHandRow.removeChild(previousImgTag);
            }
        }

        this.currentTurn = (this.currentTurn + 1) % this.players.length;
        this.previousTurn = this.currentTurn;

        const playerDiv = document.querySelector(`.${this.players[this.currentTurn].userId}`);
        let nameHandRow = playerDiv.querySelector(".name-hand-row");

        // name-hand-row가 없으면 새로 생성
        if (!nameHandRow) {
            nameHandRow = document.createElement("div");
            nameHandRow.classList.add("name-hand-row");
            nameHandRow.style.display = "flex";
            nameHandRow.style.alignItems = "center";
            nameHandRow.style.flexDirection = "row";

            const nameFont = playerDiv.querySelector(".name-font");
            if (nameFont) {
                // 기존 name-font를 row 안으로 이동
                nameHandRow.appendChild(nameFont);
            }

            //card-container보다 위에 추가
            const cardContainer = playerDiv.querySelector(".card-container");
            playerDiv.insertBefore(nameHandRow, cardContainer);
        }

        const turnImg = document.createElement("img");
        turnImg.classList.add("hand-image");
        turnImg.setAttribute("src", 'assets/hand-icon2.png');
        nameHandRow.appendChild(turnImg);

        console.log(`오레노 턴 : Player ${this.currentTurn + 1}`);
        console.log(this.getCurrentPlayer().name);

        // 질문덱에서 질문 뽑기
        const drawedDeck = this.questionDeck.draw();    
        hintDeckDrawSetting(drawedDeck, this.questionDeck);

        this.answer = correctAnswer(drawedDeck);
        deckAnswerSetting(this.answer);
    }

    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }





    

}

export default Game;