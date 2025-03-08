import Player from "./player.js";
import Game from "./game.js";
import { animateDeal, showAnswerField } from "./animation.js";

const shuffleBtn = document.querySelector(".shuffle-button");
const nextTurn = document.querySelector(".next-turn-button");

const submitBtn = document.querySelector(".submit-answer-button");

const deck = document.querySelector(".card-deck");

const player1 = new Player("나", 0);
const player2 = new Player("용준", 1);
const player3 = new Player("동준", 2);
const player4 = new Player("호용", 3);

const game = new Game([player1, player2, player3, player4]);

shuffleBtn.addEventListener("click", () => {   
    game.start();
});

submitBtn.addEventListener("click", () => {
    showAnswerField();
;});

nextTurn.addEventListener("click", () => {
    game.nextTurn();
})