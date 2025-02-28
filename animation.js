export function animateShuffle() {
    return new Promise((resolve) => {
        const cardDeck = document.querySelectorAll('.deck-tail');
        let animationCompleted = 0;
        for (let i =0; i < cardDeck.length; i++) {
            cardDeck[i].classList.add(`is-animated-${i}`);
        
            // 애니메이션 종료 시 이벤트 리스너 등록
            cardDeck[i].addEventListener("animationend", (event) => {
                console.log(event.animationName);
                if (event.animationName === "shuffle") {
                    animationCompleted++;
                    console.log(animationCompleted);
                    console.log(cardDeck.length);
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
        playerNameTag.innerHTML = players[i].name;
        playerDiv.classList.add("div-alignment");
        playerDiv.classList.add(players[i].name);
        playerDiv.appendChild(playerNameTag);

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

        board.appendChild(playerDiv);
        playerDivs.push(playerDiv); // 플레이어 div 저장
    }

    const deckTail = document.querySelectorAll(".deck-tail");
    console.log(deckTail);
    let count = 0;
    for (let i = 0; i < totalCards; i++) { 
        for (let j = 0; j < players.length; j++) {
                const imgTag = document.createElement("img");
                imgTag.setAttribute("src", players[j].hand[i].src);
                console.log('ㅇㅇㅇ');
                // 순차적 애니메이션 구현이 필요함
                if (j == 0) {
                        console.log(`left-card-deal-${i}-${j}`);
                        deckTail[count].classList.add(`left-card-deal-${i}-${j}`);
                }
                count++;
                playerDivs[j].appendChild(imgTag);
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