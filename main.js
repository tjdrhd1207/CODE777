import Player from "./player.js";
import Game from "./game.js";
import { animateDeal } from "./animation.js";

const shuffleBtn = document.querySelector(".shuffle-button");
const nextTurn = document.querySelector(".next-turn-button");

const answerInput = document.querySelector(".answer-input");
const submitBtn = document.querySelector(".submit-answer-button");

const deck = document.querySelector(".card-deck");

const player1 = new Player("나", 0);
const player2 = new Player("용준", 1);
const player3 = new Player("동준", 2);
const player4 = new Player("호용", 3);

const game = new Game([player1, player2, player3, player4]);

shuffleBtn.addEventListener("click", () => {
    const cardDeck = document.querySelectorAll('.deck-tail');
    console.log(cardDeck);
    // 임시효과 제거
    // https://codepen.io/Muskelkraft/pen/oJpMNW
    // cardDeck.classList.add('card-shuffle');
    
    // shuffle 효과
    for (let i = 0; i < cardDeck.length; i++) {
        cardDeck[i].classList.add(`is-animated-${i}`);
    
        // shuffle 애니메이션이 끝나면 deal 효과 적용
        cardDeck[i].addEventListener("animationend", function (event) {
            // 마지막 카드(`is-animated-2` 등)만 `deal` 효과를 적용하도록 설정
            if (event.animationName === "shuffle" && i === cardDeck.length - 1) {
                cardDeck[0].classList.add("card-deal");
            }
        }, { once: true }); // 이벤트 리스너 한 번만 실행되도록 설정

        // console.log(cardDeck[i]);
        /* cardDeck[i].addEventListener("animationstart", () => {
            console.log("애니메이션 시작");
        }); */
    }
    
    // animateDeal();
   
    game.start();
});

submitBtn.addEventListener("click", () => {
    if (answerInput.value.trim() === '') {
        alert("정답을 작성해주세요");
    } else {
        // TODO: 현재플레이어를 전달해야함
        game.submitAnswer(player1, answerInput.value);
    }

})

nextTurn.addEventListener("click", () => {
    game.nextTurn();
})