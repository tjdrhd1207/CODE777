export function animateShuffle() {
    return new Promise((resolve) => {
        const cardDeck = document.querySelectorAll('.deck-tail');
        let animationCompleted = 0;
        for (let i =0; i < cardDeck.length; i++) {
            cardDeck[i].classList.add(`is-animated-${i}`);
        
            // 애니메이션 종료 시 이벤트 리스너 등록
            cardDeck[i].addEventListener("animationend", (event) => {
                if (event.animationName === "shuffle") {
                    animationCompleted++;
                    if (animationCompleted === cardDeck.length) {
                        console.log("애니메이션 완료");
                        resolve();
                    }
                }
            }, { once: true });
        }
    });
}

export function hideMyHand(playerDiv) {
    console.log(playerDiv);
    playerDiv.classList.add("black-background");

    const imgElements = playerDiv.querySelectorAll('img');
    imgElements.forEach((img, index) => {
        console.log(img);
        img.classList.add("hide-img");
    });
}

export function hintDeckInitSetting(board) {
    const deck = document.createElement("div");
    deck.classList.add("deck");
    board.appendChild(deck);
}

export function hintDeckDrawSetting(drawedDeck) {
    console.log(drawedDeck);
    const deck = document.querySelector(".deck");
    deck.innerHTML = "";
    deck.innerHTML += drawedDeck.seq;
    deck.innerHTML += '<br></br>';
    deck.innerHTML += drawedDeck.question;
}

export function animateDeal(card, players, elements) {
    console.log('실행');
    const directions = ["위", "오른쪽", "왼쪽", "아래"];
    const startTime = 3500;
    const shortInterval = 400;
    const longInterval = 830;
    let playerDiv = null;
    let delay = startTime;
    const playerDivs = [];
    const totalCards = players[0].hand.length;

    for (let i =0; i< players.length; i++) {
        const board = document.querySelector(".board");
        playerDiv = document.createElement("div");
        const playerNameTag = document.createElement("div");
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card-container");

        playerNameTag.innerHTML = players[i].name;
        playerDiv.classList.add("div-alignment");
        playerDiv.classList.add(players[i].name);
        playerNameTag.classList.add('name-font');
        playerDiv.appendChild(playerNameTag);
        playerDiv.appendChild(cardContainer);

        setPlayerPosition(i, playerDiv);

        board.appendChild(playerDiv);
        playerDivs.push(playerDiv); // 플레이어 div 저장
    }

    const deckTail = document.querySelectorAll(".deck-tail");
    let count = 0;

    for (let i = 0; i < totalCards; i++) {
        for (let j = 0; j < players.length; j++) {
            const imgTag = document.createElement("img");
            imgTag.setAttribute("src", players[j].hand[i].src);

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
                    cardContainer.appendChild(imgTag);
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

function setPlayerPosition(playerId, element) {
    switch (playerId) {
        case 0 : {
            element.style.position = 'absolute';
            element.style.top = '50%';
            element.style.left = '0';
            element.style.transform = 'translateY(-50%)'; // 수직 중앙 맞추기
            return;
        }
        case 1 : {
            element.style.position = 'absolute';
            element.style.top = '50%';
            element.style.right = '0';
            element.style.transform = 'translateY(-50%)'; // 수직 중앙 맞추기
            return;
        }
        case 2 : {
            element.style.position = 'absolute';
            element.style.left = '50%';
            element.style.top = '0';
            element.style.transform = 'translateX(-50%)'; // 수평 중앙 맞추기
            return;
        }
        case 3 : {
            element.style.position = 'absolute';
            element.style.left = '50%';
            element.style.bottom = '0';
            element.style.transform = 'translateX(-50%)'; // 수평 중앙 맞추기
            return;
        }
    }
}

function animateLeftCardDeal(element) {
    let start = performance.now(); // 시작 시간
    const duration = 500; // 애니메이션 지속 시간 (500ms)
    const startX = 0; // 시작 위치
    const endX = 100; // 최종 위치 (예제: 100px 이동)

    function step(timestamp) {
        let progress = (timestamp - start) / duration;
        if (progress > 1) progress = 1; // 100% 이상 진행되지 않도록 제한
        element.style.transform = `translateX(${startX + (endX - startX) * progress}px)`;

        if (progress < 1) {
            requestAnimationFrame(step); // 다음 프레임 호출
        }
    }

    requestAnimationFrame(step);
}