export function animateShuffle() {
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

export function deckInitSetting(board) {
    const deck = document.createElement("div");
    deck.classList.add("deck");
    board.appendChild(deck);
}

export function deckDrawSetting(drawedDeck) {
    console.log(drawedDeck);
    const deck = document.querySelector(".deck");
    deck.innerHTML = "";
    deck.innerHTML += drawedDeck.seq;
    deck.innerHTML += '<br></br>';
    deck.innerHTML += drawedDeck.question;
}

export function animateDeal(card, players, elements) {
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

    for (let i = 0; i < totalCards; i++) { 
        for (let j = 0; j < players.length; j++) {
            setTimeout(() => {
                const imgTag = document.createElement("img");
                imgTag.setAttribute("src", players[j].hand[i].src);
                playerDivs[j].appendChild(imgTag);
            }, delay);
        
            // 처음 4장은 0.5초 간격, 이후 0.7초 간격 반복
            if (j % 4 === 3) {
                delay += longInterval; // 5번째, 9번째 카드 0.7초 간격
            } else {
                delay += shortInterval;
            }
        }
    }

    
    
}