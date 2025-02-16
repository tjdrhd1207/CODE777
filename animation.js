export function animateShuffle() {
    const cardDeck = document.querySelector('.card-deck');
    
    let rotationAngle = 0;
    const shuffleInterval = setInterval(() => {
        rotationAngle += 10;  // 회전 각도 증가
        cardDeck.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;  // 회전 애니메이션

        if (rotationAngle >= 360) {
            clearInterval(shuffleInterval);  // 한 바퀴 돌면 애니메이션 종료
        }
    }, 50);  // 50ms마다 10도씩 회전

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