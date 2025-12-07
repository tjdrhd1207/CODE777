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

    constructor({players, questionDeck}) {
        this.players = players;
        this.previousTurn = 0;
        this.currentTurn = 0;
        this.answer = "";
        this.board = new Board();
        // this.questionDeck = new QuestionDeck();
        this.questionDeck = questionDeck;
        // this.questionCard = null;
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

    // 이전턴 세팅
    setPreviousTurn(previousTurn) {
        this.previousTurn = previousTurn;
    }

    // 정답 세팅
    setAnswer(answer) {
        this.answer = answer;
    }

    // 질문
    showQuestion(question) {
        console.log(question);
        this.questionDeck.nowQuestion = question;
    }

    //현재 플레이어
    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }

    getCurrentTurn() {
        return this.currentTurn;
    }

    getPreivousTurn() {
        return this.previousTurn;
    }

    drawQuestionCard() {
        return this.questionDeck.draw();
    }

    getCorrectAnswer(question) {
        // 원래 correctAnswer 내부 로직을 여기에 통합하거나 utils로 분리 가능
    }

    //이전 턴
    /* advanceTurn() {
        this.previousTurn = this.currentTurn;
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    } */

    reshufflePlayerCards(player) {
        this.cardDeck.playerCardShuffle(player);
        player.retrieve();
        player.deal(this.cardDeck.card);
    }

    start({ distributedCards, questionCard, answer }, currentUserId) {
        // TODO
        // 스타트 시에 이전의 정보는 다 리셋되어야 할 것 같음
        // 스타트를 계속하면 더 추가가 됨
        console.log("--Game Start--");
        const boardCenter = document.querySelector(".board-center");

        // 이전 카드 제거
        const existingPlayerDivs = boardCenter.querySelectorAll(".div-alignment");
        existingPlayerDivs.forEach(div => div.remove());

        hintDeckInitSetting(boardCenter);
        /* this.previousTurn = this.currentTurn; */

        this.players.forEach(player => {
            const playerId = typeof player.userId === "object" ? player.userId.userId : player.userId;
            player.hand = distributedCards[playerId] || [];
        });

        console.log("핸드 할당 완료:", this.players.map(p => ({ userId: p.userId, hand: p.hand })));

        this.questionCard = questionCard;
        this.answer = answer;

        animateShuffle().then(() => {
            animateDeal(Object.values(distributedCards).flat(), this.players, currentUserId);

            // ⭐ 첫 턴 질문/정답 세팅
            // this.questionCard = this.drawQuestionCard();
            // const ruleEngine = new RuleEngine(this.cardDeck);
            // this.answer = ruleEngine.evaluate(this.questionCard.seq, this.players, this.currentTurn);

            this.updateTurnUI(this.players, this.questionCard, this.answer);
        });
    }

    nextTurn() {

        // 1. 턴 갱신
        this.currentTurn = ((this.currentTurn + 1) + this.players.length) % this.players.length;
        this.previousTurn = ((this.currentTurn - 1) + this.players.length) % this.players.length;

        // NPC 스킵
        if (this.players[this.currentTurn].userId === "NPC") {
            this.currentTurn = (this.currentTurn + 1) % this.players.length;
        }
        
        // 질문덱에서 질문 뽑기
        this.questionCard = this.drawQuestionCard();
        const ruleEngine = new RuleEngine(this.cardDeck);
        console.log(this.players);

        this.answer = ruleEngine.evaluate(this.questionCard.seq, this.players, this.currentTurn);
    }

    updateTurnUI(players, question, answer) {
        console.log(this.previousTurn);
        if (this.previousTurn >= 0) {
            const previousNameTag = document.querySelector(`.${players[this.previousTurn].userId}`);
            console.log(previousNameTag);
            if (previousNameTag) {
                const previousHandRow = previousNameTag.querySelector(".name-hand-row");
                console.log(previousHandRow);
                if (previousHandRow) {
                    const previousImgTag = previousHandRow.querySelector(".hand-image");
                    if (previousImgTag) {
                        previousHandRow.removeChild(previousImgTag);
                    }
                }
            }
        }

        const playerDiv = document.querySelector(`.${players[this.currentTurn].userId}`);
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
        console.log("질문");
        console.log(question);
        console.log(answer);
        // question, answer가 있을 때만 호출
        if (question) hintDeckDrawSetting(question);
        if (answer !== undefined && answer !== null) deckAnswerSetting(answer);
    }

}

export default Game;