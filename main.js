import Player from "./player.js";
import Game from "./game.js";

const btn = document.querySelector(".shuffle-button");

const player1 = new Player("나", 0);
const player2 = new Player("용준", 1);
const player3 = new Player("동준", 2);
const player4 = new Player("호용", 3);


btn.addEventListener("click", () => {
    const cardDeck = document.querySelector('.card-deck');
    cardDeck.classList.add('card-shuffle');

    const game = new Game([player1, player2, player3, player4]);
    game.start();
});

