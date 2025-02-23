import Board from "./board.js";
import Deck from "./deck.js";
import Card from "./card.js";
import { animateShuffle, hideMyHand, deckInitSetting, deckDrawSetting } from "./animation.js";

const GREEN = 'GREEN';
const YELLOW = 'YELLOW';
const BLACK = 'BLACK';
const BROWN = 'BROWN';
const RED = 'RED';
const PINK = 'PINK';
const BLUE = 'BLUE';

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
            const playerNameTag = document.createElement("div");
            playerNameTag.innerHTML = player.name;
            playerDiv.classList.add("div-alignment");
            playerDiv.classList.add(player.name);
            playerDiv.appendChild(playerNameTag);
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
        console.log(this.getCurrentPlayer().name);
        alert(this.players[this.currentTurn].name + "의 턴");

        const drawedDeck = this.deck.draw();
        deckDrawSetting(drawedDeck, this.deck);

        this.answer(drawedDeck);
    }

    getCurrentPlayer() {
        return this.players[this.currentTurn];
    }

    // 질문에 대답하기
    answer(question) {
        console.log(question);
        switch (question.seq) {
            // 숫자의 합이 18 이상인 선반은 몇 개입니까?
            case 1: {
                let pedestal = 0;
                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {
                        const handSum = player.hand.reduce((acc, val) => acc + val, 0);
                        if (handSum >= 18) {
                            pedestal += 1;
                        }
                    }
                })
                return pedestal;
            }
            // 숫자의 합이 12 이하인 선반은 몇 개입니까?
            case 2: {
                let pedestal = 0;
                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {
                        const handSum = player.hand.reduce((acc, val) => acc + val, 0);
                        if (handSum <= 12) {
                            pedestal += 1;
                        }
                    }
                })
                return pedestal;
            }
            // 숫자는 같고 색깔은 다른 타일이 있는 받침대는 몇 개입니까?
            case 3: {
                let pedestal = 0;
                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        const valueMap = new Map();

                        player.hand.forEach((card) => {
                            if (!valueMap.has(card.value)) {
                                valueMap.set(card.value, new Set());
                            }
                            valueMap.get(card.value).add(card.color);
                        });

                        console.log(valueMap);
                        // 숫자는 같고 색깔이 다른카드 확인
                        let count = 0;
                        valueMap.forEach((colors) => {
                            if (colors.size > 1) count++;
                        });
                        if (count !== 0) {
                            pedestal += 1;
                        }
                    }
                })
                return pedestal;
            }
            // 3개의 타일이 모두 색깔이 다른 받침대는 몇 개입니까?
            case 4: {
                let pedestal = 0;
                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        const valueMap = new Map();

                        player.hand.forEach((card) => {
                            if (!valueMap.has(card.color)) {
                                valueMap.set(card.color, new Set());
                            }
                            valueMap.get(card.color).add(card.value);
                        });

                        // 세개의 색이 다다른 핸드 확인
                        if (valueMap.size < 3) {
                            pedestal +=1;
                        }
                    }
                })
                return pedestal;
            }
            // 짝수만 있거나 홀수만 있는 받침대는 몇 개입니까?
            case 5: {
                let pedestal = 0;
                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        let even = 0; // 짝수
                        let odd = 0; // 홀수

                        player.hand.forEach((card) => {
                            if(card.value % 2 === 0) {
                                even += 1;
                            } else {
                                odd += 1;
                            }
                        });

                        // 세개의 색이 다다른 핸드 확인
                        if (even === 3 || odd === 3) {
                            pedestal +=1;
                        }
                    }
                })
                return pedestal;
            }

            // 색깔과 숫자 모두 완전히 같은 타일이 있는 받침대는 몇 개입니까?
            case 6: {
                let pedestal = 0;
                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        const valueMap = new Map();

                        player.hand.forEach((card) => {
                            const key = `${card.value}-${card.color}`;
                            valueMap.set(key, (valueMap.get(key) || 0) + 1);
                        });
                        // 숫자는 같고 색깔이 다른카드 확인
                        let sameFlag = false;
                        valueMap.forEach((count) => {
                            if (count > 1) {
                                sameFlag = true;
                            }
                        });
                        if (sameFlag) {
                            pedestal += 1;
                        }
                    }
                })
                return pedestal;
            }
            // 3개의 타일이 연속된 숫자인 받침대는 몇 개입니까?
            case 7: {
                let pedestal = 0;
                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        const sortedCards = [...player.hand].sort((a, b) => a.value - b.value);
                        
                        let continuous = false;
                        // 정렬한 핸드를 통해 연속된 숫자인지 확인
                        for (let i = 1; i < sortedCards.length; i++) {
                            if (sortedCards[i].value !== sortedCards[i - 1].value + 1) {
                                continuous = false;
                            }
                        }
                        continuous = true; // 모두 연속됨

                        if (continuous) {
                            pedestal += 1;
                        }
                    }
                })
                return pedestal;
            }
            // 몇 가지 색깔이 보입니까?
            case 8: {
                let pedestal = 0;

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {
                        
                        const valueMap = new Map();

                        player.hand.forEach((card) => {
                            if (!valueMap.get(card.color)) {
                                valueMap.set(card.color, 0);
                            }
                        });

                        console.log(valueMap.size);
                        pedestal = valueMap.size;
                    }
                })
                return pedestal;
            }
            // 세번 이상 보이는 색깔은 몇개입니까?
            case 9: {
                let pedestal = 0;
                let valueMap = new Map();

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        player.hand.forEach((card) => {
                            valueMap.set(card.color, (valueMap.get(card.color) || 0) + 1);
                        });
                        
                        let filteredColors = Array.from(valueMap.entries()).filter(([color, count]) => count >= 3);
                        pedestal = filteredColors.length;
                    }
                })
                return pedestal;
            }
            // 하나도 보이지 않는 숫자는 몇 개입니까?
            case 10: {
                let pedestal = 0;
                let cardSet = new Set();

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        player.hand.forEach((card) => {
                            cardSet.add(card.value);
                        });

                        const allCard = this.cardDeck.getAllCardValues();

                        let cardType = Array.from(allCard).filter((card) => {
                            return !cardSet.has(card)
                        });

                        pedestal = cardType.length;
                    }
                })
                return pedestal;
            }
            // 녹색 1, 검정 5, 분홍 7이 총 몇개 보입니까?
            case 11: {
                let pedestal = 0;

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        player.hand.forEach((card) => {
                            if ((card.value === 1 && card.color === GREEN) || (card.value === 5 && card.color === BLACK) || (card.value === 7 && card.color === PINK)) {
                                pedestal += 1;
                            }
                        });
                    }
                })
                return pedestal;
            }
            // 3과 분홍6 중에서 어느 것이 더 많이 보입니까?
            case 12: {
                let pedestal = 0;
                let three = 0;
                let pinkSix = 0;

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        player.hand.forEach((card) => {
                            if (card.value === 3) {
                                three += 1;
                            } else if (card.value === 6 && card.color === PINK) {
                                pinkSix += 1;
                            }
                        });
                    }
                })
                console.log("3 갯수 : " + three);
                console.log("분홍 6 갯수 : " + pinkSix);
                pedestal = (three > pinkSix) ? '3' : (three === pinkSix ? '더 많이 보이지 않습니다.' : '분홍 6');
                console.log(pedestal);

                return pedestal;
            }
            // 녹색 6과 노랑 7 중에서 어느 것이 더 많이 보입니까?
            case 13: {
                let pedestal = 0;
                let greenSix = 0;
                let yellowSeven = 0;

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        player.hand.forEach((card) => {
                            if (card.value === 6 && card.color === GREEN) {
                                greenSix += 1;
                            } else if (card.value === 7 && card.color === YELLOW) {
                                yellowSeven += 1;
                            }
                        });
                    }
                })
                console.log("녹색 6 갯수 : " + greenSix);
                console.log("노랑 7 갯수 : " + yellowSeven);
                pedestal = (greenSix > yellowSeven) ? '녹색 6' : (greenSix === yellowSeven ? '더 많이 보이지 않습니다.' : '노랑 7');
                console.log(pedestal);

                return pedestal;
            }
            // 노랑 2와 노랑 7 중에서 어느 것이 더 많이 보입니까?
            case 14: {
                let pedestal = 0;
                let yellowTwo = 0;
                let yellowSeven = 0;

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        player.hand.forEach((card) => {
                            if (card.value === 2 && card.color === YELLOW) {
                                yellowTwo += 1;
                            } else if (card.value === 7 && card.color === YELLOW) {
                                yellowSeven += 1;
                            }
                        });
                    }
                })
                console.log("노랑 2 갯수 : " + yellowTwo);
                console.log("노랑 7 갯수 : " + yellowSeven);
                pedestal = (yellowTwo > yellowSeven) ? '노랑 2' : (yellowTwo === yellowSeven ? '더 많이 보이지 않습니다.' : '노랑 7');
                console.log(pedestal);

                return pedestal;
            }
            // 분홍 6와 노랑 6 중에서 어느 것이 더 많이 보입니까?
            case 15: {
                let pedestal = 0;
                let pinkSix = 0;
                let yellowSix = 0;

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        player.hand.forEach((card) => {
                            if (card.value === 6 && card.color === PINK) {
                                pinkSix += 1;
                            } else if (card.value === 6 && card.color === YELLOW) {
                                yellowSix += 1;
                            }
                        });
                    }
                })
                console.log("분홍 6 갯수 : " + pinkSix);
                console.log("노랑 6 갯수 : " + yellowSix);
                pedestal = (pinkSix > yellowSix) ? '분홍 6' : (pinkSix === yellowSix ? '더 많이 보이지 않습니다.' : '노랑 6');
                console.log(pedestal);

                return pedestal;
            }
            // 파랑 7과 다른 색깔 7 중에서 어느 것이 더 많이 보입니까?
            case 16: {
                let pedestal = 0;
                let blueSeven = 0;
                let anotherSeven = 0;

                this.players.forEach((player) => {
                    /* 현재턴이 아닌 사람들 중 */
                    if (player.id !== this.players[this.currentTurn].id) {

                        player.hand.forEach((card) => {
                            if (card.value === 7 && card.color === BLUE) {
                                blueSeven += 1;
                            } else if (card.value === 7 && card.color !== BLUE) {
                                anotherSeven += 1;
                            }
                        });
                    }
                })
                console.log("파랑 7 갯수 : " + blueSeven);
                console.log("다른 7 갯수 : " + anotherSeven);
                pedestal = (blueSeven > anotherSeven) ? '파랑 7' : (blueSeven === anotherSeven ? '더 많이 보이지 않습니다.' : '다른 7');
                console.log(pedestal);

                return pedestal;
            }
        }
    }
    
}

export default Game;