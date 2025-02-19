import Board from "./board.js";
import Deck from "./deck.js";
import Card from "./card.js";
import { animateShuffle, hideMyHand, deckInitSetting, deckDrawSetting } from "./animation.js";

class Game {
    constructor(players) {
        this.players = players;
        this.currentTurn = 0;
        this.board = new Board();
        this.deck = new Deck();
        this.cardDeck = new Card();
        this.cardDeck.cardSetting();

    }

    start() {
        // TODO
        // 스타트 시에 이전의 정보는 다 리셋되어야 할 것 같음
        // 스타트를 계속하면 더 추가가 됨

        console.log("--Game Start--");
        const board = document.querySelector(".board");

        // 덱 셔플
        this.deck.shuffle();
        deckInitSetting(board);

        // 카드 번호 각 플레이어게 할당
        // 플레이어가 각 카드를 배정받는 행위
        animateShuffle();
        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            player.deal(this.cardDeck.card);
        
            const playerDiv = document.createElement("div");
            playerDiv.classList.add("div-alignment");
            // 사람별 위치를 다르게 설정
            if (i === 0) {
                // 첫 번째 사람: 기본 위치 (좌측 중앙)
                playerDiv.style.position = 'absolute';
                playerDiv.style.top = '50%';
                playerDiv.style.left = '0';
                playerDiv.style.transform = 'translateY(-50%)'; // 수직 중앙 맞추기
            } else if (i === 1) {
                // 두 번째 사람: 오른쪽
                playerDiv.style.position = 'absolute';
                playerDiv.style.top = '50%';
                playerDiv.style.right = '0';
                playerDiv.style.transform = 'translateY(-50%)'; // 수직 중앙 맞추기
            } else if (i === 2) {
                // 세 번째 사람: 위쪽
                playerDiv.style.position = 'absolute';
                playerDiv.style.left = '50%';
                playerDiv.style.top = '0';
                playerDiv.style.transform = 'translateX(-50%)'; // 수평 중앙 맞추기
            } else if (i === 3) {
                // 네 번째 사람: 아래쪽
                playerDiv.style.position = 'absolute';
                playerDiv.style.left = '50%';
                playerDiv.style.bottom = '0';
                playerDiv.style.transform = 'translateX(-50%)'; // 수평 중앙 맞추기
            }

        
            // 각 플레이어의 카드를 playerDiv에 추가
            for (let j = 0; j < player.hand.length; j++) {
                const imgTag = document.createElement("img");
                imgTag.setAttribute("src", player.hand[j].src);
                playerDiv.appendChild(imgTag);
                board.appendChild(playerDiv);

            }

            if (player.id === 3) {
                hideMyHand(playerDiv);
            }

        }
        // 다음턴으로 이동
        this.nextTurn();
    }

    nextTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
        console.log(`오레노 턴 : Player ${this.currentTurn + 1}`);
        
        const drawedDeck = this.deck.draw();
        deckDrawSetting(drawedDeck, this.deck);

        this.players[this.currentTurn].answer(drawedDeck.question);
    }

    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }
}

export default Game;