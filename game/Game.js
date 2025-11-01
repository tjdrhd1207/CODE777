import Board from "/game/board.js";
import QuestionDeck from "/game/model/QuestionDeck.js";   // 또는 CardDeck.js
import CardDeck from "/game/logic/CardDeck.js";
import { generateDeck } from "/game/logic/cardFactory.js";
import {
    animateShuffle,
    hintDeckDrawSetting,
    hideMyHand,
    hintDeckInitSetting,
    animateDeal,
    deckAnswerSetting,
    retrieveAnimation
} from "/game/logic/animation.js";
import RuleEngine from "./rules/RuleEngine.js";

class Game {

    constructor(players) {
        this.players = players;
        this.previousTurn = 0;
        this.currentTurn = 0;
        this.answer = "";
        this.board = new Board();
        this.questionDeck = new QuestionDeck();
        const deckArray = generateDeck();
        this.cardDeck = new CardDeck(deckArray);
        // this.cardDeck.cardSetting();
    }

    shuffleQuestionDeck() {
        this.questionDeck.shuffle();
    }

    // 현재턴 세팅
    setCurrentTurn(currentTurn) {
        this.currentTurn = currentTurn;
    }

    // 정답 세팅
    setAnswer(answer) {
        this.answer = answer;
    }

    // 질문
    showQuestion(question) {
        this.questionDeck = question;
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
    }

    nextTurn() {
        // 1. 턴 갱신
        // this.currentTurn = (this.currentTurn + 1) % this.players.length;
        this.previousTurn = (this.currentTurn - 1) % this.players.length;

        // 질문덱에서 질문 뽑기
        const drawedDeck = this.questionDeck.draw();
        console.log(this.questionDeck);
        console.log(drawedDeck);
        hintDeckDrawSetting(drawedDeck);
        const ruleEngine = new RuleEngine(this.cardDeck);
        this.answer = ruleEngine.evaluate(drawedDeck.seq, this.players, this.currentTurn);
        deckAnswerSetting(this.answer);

        this.updateTurnUI(this.players, this.previousTurn, this.currentTurn);
    }

    updateTurnUI(players, previousTurn, currentTurn) {
        console.log(players);
        console.log(previousTurn);
        if (previousTurn >= 0) {
            const previousNameTag = document.querySelector(`.${players[previousTurn].userId}`);
            const previousHandRow = previousNameTag.querySelector(".name-hand-row");
            if (previousHandRow) {
                const previousImgTag = previousHandRow.querySelector(".hand");
                if (previousImgTag) {
                    previousHandRow.removeChild(previousImgTag);
                }
            }
        }

        const playerDiv = document.querySelector(`.${players[currentTurn].userId}`);
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
    }

    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }





    

}

export default Game;