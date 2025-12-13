import Player from "/game/model/Player.js";
import Game from "/game/Game.js";
// import { animateDeal, showAnswerField, checkAnswer } from "../game/logic/animation.js";
import { socket } from "../socket/socket.js";
import RuleEngine from "../game/rules/RuleEngine.js";
import { generateDeck } from "../game/logic/cardFactory.js";
import QuestionDeck from "../game/model/QuestionDeck.js";
import CardDeck from "../game/logic/CardDeck.js";
import openAnswerModal from "./answerModal.js";

let BACKEND_URL = "http://localhost:3030";

export async function initGamePage() {

    // 타이머 DOM 생성
    const timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.style.display = "none";
    timerElement.style.fontSize = "32px";
    timerElement.style.fontWeight = "bold";
    timerElement.style.color = "black";
    timerElement.style.position = "absolute";
    timerElement.style.top = "20px";
    timerElement.style.right = "20px";

    document.body.appendChild(timerElement);

    // const socket = io(BACKEND_URL); // 서버 주소
    const currentUserId = localStorage.getItem("currentUserId");
    const roomId = localStorage.getItem("roomId");
    const rawPlayers = JSON.parse(localStorage.getItem("players") || "[]");
    const humanPlayers = rawPlayers.map((name, index) => {
        return new Player(name, index);
    });
    const helperPlayer = new Player("NPC", humanPlayers.length);
    const players = [...humanPlayers, helperPlayer];
    const game = new Game({
        players,
        questionDeck: new QuestionDeck()
    });

    const shuffleBtn = document.querySelector(".shuffle-button");
    const nextTurn = document.querySelector(".next-turn-button");
    const attemptAnswerBtn = document.querySelector(".attempt-answer-button");
    const submitAnswerBtn = document.querySelector(".submit-answer");

    shuffleBtn.addEventListener("click", () => {
        socket.emit("startGameAndShuffle", { roomId });
        document.querySelector("#timer").style.display = "block";
    });

    attemptAnswerBtn.addEventListener("click", async function (e) {
        e.stopPropagation();
        console.log("제출");
        socket.emit("submitAnswer", { roomId });

        try {
            const submitArray = await openAnswerModal();
            // 세개의 값을 적고 제출했는지 체크
            // game.submitAnswer(player1, submitArray);
            socket.emit("submitAnswer", {
                roomId,
                userId: currentUserId,
                answer: submitArray
            });
        } catch {
            console.log("답안제출 취소");
        }
    });

    nextTurn.addEventListener("click", () => {
        console.log("다음턴 실행");
        socket.emit("nextTurn", {
            roomId
        });
    })

    submitAnswerBtn.addEventListener("click", async function (e) {
        
    });

    socket.on("gameStarted", ({ distributedCards, players: serverPlayers, currentTurn, questionCard, answer }) => {
        game.players = serverPlayers.map(playerData => {
            const id = typeof playerData.userId === "object" ? playerData.userId.userId : playerData.userId;
            return new Player(id, playerData.index);
        });

        game.players.forEach(player => {
            player.hand = distributedCards[player.userId] || [];
        });

        game.start({ distributedCards, questionCard, answer }, currentUserId); // start 함수에서 hand 기반으로 animateDeal 실행
    });

    socket.on("turnChanged", ({ currentTurn, previousTurn, currentPlayer, question, answer }) => {
        console.log(`🔁 턴 변경 - 현재턴: ${currentPlayer}`);
        console.log(question);
        console.log(answer);

        game.setCurrentTurn(currentTurn);
        game.setPreviousTurn(previousTurn);
        game.setAnswer(answer);
        game.showQuestion(question);
        game.updateTurnUI(game.players, question, answer);
    });

    socket.on("timer", ({ timeLeft }) => {
        const timerDiv = document.getElementById("timer");
        if (timerDiv) {
            timerDiv.style.display = "block"; // ⭐ 핵심
            timerDiv.innerText = timeLeft;
        }
    });
}