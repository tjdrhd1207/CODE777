export function animateShuffle() {
    
/*     const cardDeck = document.querySelectorAll('.deck-tail');
    
    let rotationAngle = 0;
    const shuffleInterval = setInterval(() => {
        rotationAngle += 10;  // 회전 각도 증가
        cardDeck.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;  // 회전 애니메이션

        if (rotationAngle >= 360) {
            clearInterval(shuffleInterval);  // 한 바퀴 돌면 애니메이션 종료
        }
    }, 50);  // 50ms마다 10도씩 회전 */

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
    console.log("뭐가 문제야");
    console.log(drawedDeck);
    const deck = document.querySelector(".deck");
    deck.innerHTML = "";
    deck.innerHTML += drawedDeck.seq;
    deck.innerHTML += '<br></br>';
    deck.innerHTML += drawedDeck.question;
}

export function animateDeal() {
    const directions = ["위", "오른쪽", "왼쪽", "아래"];
    const startTime = 3800;
    const shortInterval = 500;
    const longInterval = 700;

    let delay = startTime;

    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            console.log(directions[i % 4]); // "위 → 오른쪽 → 왼쪽 → 아래" 반복
        }, delay);
    
        // 처음 4장은 0.5초 간격, 이후 0.7초 간격 반복
        if (i % 4 === 3) {
            delay += longInterval; // 5번째, 9번째 카드 0.7초 간격
        } else {
            delay += shortInterval;
        }
    }
}