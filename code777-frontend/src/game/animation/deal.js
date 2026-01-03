/* 
카드 나누기 관련 animation
*/

export function animateDeal(card, players, currentUserId) {
    const startTime = 3500;
    let playerDiv = null;
    let delay = startTime;
    const playerDivs = [];
    const totalCards = players[0].hand.length;

    for (let i = 0; i < players.length; i++) {
        const board = document.querySelector(".board");
        playerDiv = document.createElement("div");
        const playerNameTag = document.createElement("div");
        const cardContainer = document.createElement("div");
        const playerAnswer = document.createElement("div");

        cardContainer.classList.add("card-container");

        playerNameTag.innerHTML = players[i].userId;
        playerDiv.classList.add("div-alignment");
        playerDiv.classList.add(players[i].userId);
        playerDiv.classList.add(`player-${players[i].userId}`);
        playerDiv.dataset.playerId = players[i].userId;
        playerNameTag.classList.add('name-font');
        playerAnswer.classList.add('player-answer');


        playerDiv.appendChild(playerNameTag);
        playerDiv.appendChild(playerAnswer);
        playerDiv.appendChild(cardContainer);

        setPlayerPosition(i, playerDiv);

        board.appendChild(playerDiv);
        playerDivs.push(playerDiv); // 플레이어 div 저장
    }

    const deckTail = document.querySelectorAll(".deck-tail");
    let count = 0;

    for (let i = 0; i < totalCards; i++) {
        for (let j = 0; j < players.length; j++) {
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("player-hand-card");

            const imgTag = document.createElement("img");
            const imgBack = document.createElement("img");

            // 자기 자신일 경우, 앞면 숨기기
            if (players[j].userId === currentUserId) {
                imgTag.setAttribute("src", "assets/back-card.png");
                imgTag.classList.add("card-back");
            } else {
                imgTag.setAttribute("src", players[j].hand[i].src);
            }

            imgDiv.appendChild(imgTag);
            imgDiv.appendChild(imgBack);

            setTimeout(() => {
                const animationClass = getAnimationClass(j, i);

                if (!deckTail[count]) {
                    console.error(`Error: deckTail[${count}] is undefined!`);
                    return;
                }

                deckTail[count].classList.add(animationClass);

                let currentCount = count; // 현재 count 값을 저장 (이벤트 핸들러에서 올바른 값을 참조하도록)
                count++; // **여기서 증가시켜야 모든 카드가 고유한 deckTail[count]를 참조함!**

                deckTail[currentCount].addEventListener("animationend", function onAnimationEnd() {
                    deckTail[currentCount].removeEventListener("animationend", onAnimationEnd);
                    const cardContainer = playerDivs[j].querySelector(".card-container");
                    cardContainer.appendChild(imgDiv);
                });

            }, (i * players.length + j) * delay);
        }
    }
}

// 플레이어별 애니메이션 클래스 반환
function getAnimationClass(playerIndex, cardIndex) {
    switch (playerIndex) {
        case 0: return `left-card-deal-${cardIndex}-${playerIndex}`;
        case 1: return `right-card-deal-${cardIndex}-${playerIndex}`;
        case 2: return `top-card-deal-${cardIndex}-${playerIndex}`;
        case 3: return `bottom-card-deal-${cardIndex}-${playerIndex}`;
        default: return "";
    }
}

// 플레이어별 포지션 지정
function setPlayerPosition(playerId, element) {
    switch (playerId) {
        case 0: {
            element.style.position = 'absolute';
            element.style.top = '50%';
            element.style.left = '0';
            element.style.transform = 'translateY(-50%)'; // 수직 중앙 맞추기
            return;
        }
        case 1: {
            element.style.position = 'absolute';
            element.style.top = '50%';
            element.style.right = '0';
            element.style.transform = 'translateY(-50%)'; // 수직 중앙 맞추기
            return;
        }
        case 2: {
            element.style.position = 'absolute';
            element.style.left = '50%';
            element.style.top = '0';
            element.style.transform = 'translateX(-50%)'; // 수평 중앙 맞추기
            return;
        }
        case 3: {
            element.style.position = 'absolute';
            element.style.left = '50%';
            element.style.bottom = '0';
            element.style.transform = 'translateX(-50%)'; // 수평 중앙 맞추기
            return;
        }
    }
}