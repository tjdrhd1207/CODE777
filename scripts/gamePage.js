import Player from "/game/model/Player.js";
import Game from "/game/Game.js";
// import { animateDeal, showAnswerField, checkAnswer } from "../game/logic/animation.js";
import { socket } from "../socket/socket.js";

let BACKEND_URL = "http://localhost:3030";

export async function initGamePage() {
    // const socket = io(BACKEND_URL); // 서버 주소
    const currentUserId = localStorage.getItem("currentUserId");
    const roomId = localStorage.getItem("roomId");
    const rawPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const humanPlayers = rawPlayers.map((name, index) => {
        return new Player(name, index);
    });
    const helperPlayer = new Player("NPC", humanPlayers.length);
    const players = [...humanPlayers, helperPlayer];

    console.log("현재 방 : " + roomId);
    console.log("참여자 : " + players);

    const game = new Game(players);

    const shuffleBtn = document.querySelector(".shuffle-button");
    const nextTurn = document.querySelector(".next-turn-button");
    const attemptAnswerBtn = document.querySelector(".attempt-answer-button");
    const submiAnswerBtn = document.querySelector(".submit-answer");

    shuffleBtn.addEventListener("click", () => {
        console.log("게임 시작 클릭");
        socket.emit("startGameAndShuffle", { roomId, players });
    });

    attemptAnswerBtn.addEventListener("click", () => {
        showAnswerField();
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

    socket.on("gameStarted", ({ distributedCards }) => {
        game.start(distributedCards, currentUserId); // start 함수에서 hand 기반으로 animateDeal 실행
    })
}

