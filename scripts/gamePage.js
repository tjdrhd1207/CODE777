import Player from "/game/model/Player.js";
import Game from "/game/Game.js";
// import { animateDeal, showAnswerField, checkAnswer } from "../game/logic/animation.js";

export async function initGamePage() {

    const roomId = localStorage.getItem("roomId");
    const rawPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const players = rawPlayers.map((name, index) => {
        return new Player(name, index);
    });

    console.log("현재 방 : " + roomId);
    console.log("참여자 : " + players);

    const game = new Game(players);

    const shuffleBtn = document.querySelector(".shuffle-button");
    const nextTurn = document.querySelector(".next-turn-button");
    const attemptAnswerBtn = document.querySelector(".attempt-answer-button");
    const submiAnswerBtn = document.querySelector(".submit-answer");

    // const player1 = new Player("나", 0);
    // const player2 = new Player("용준", 1);
    // const player3 = new Player("동준", 2);
    // const player4 = new Player("호용", 3);

    // const game = new Game([player1, player2, player3, player4]);

    shuffleBtn.addEventListener("click", () => {
        game.start();
    });

    attemptAnswerBtn.addEventListener("click", () => {
        showAnswerField();
        ;
    });

    nextTurn.addEventListener("click", () => {
        game.nextTurn();
    })

    submiAnswerBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        console.log("제출");
        const submitArray = checkAnswer();
        // 세개의 값을 적고 제출했는지 체크
        game.submitAnswer(player1, submitArray);
    });
}

