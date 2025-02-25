import Player from "./player.js";
import Game from "./game.js";

const btn = document.querySelector(".shuffle-button");
const nextTurn = document.querySelector(".next-turn-button");
const deck = document.querySelector(".card-deck");

const player1 = new Player("나", 0);
const player2 = new Player("용준", 1);
const player3 = new Player("동준", 2);
const player4 = new Player("호용", 3);

const game = new Game([player1, player2, player3, player4]);

btn.addEventListener("click", () => {
    const cardDeck = document.querySelector('.card-deck');
    // 임시효과 제거
    // https://codepen.io/Muskelkraft/pen/oJpMNW
    // cardDeck.classList.add('card-shuffle');
    cardDeck.classList.add('is-animated');
    
    game.start();
});

nextTurn.addEventListener("click", () => {
    game.nextTurn();
})