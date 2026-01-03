/* 
카드 shuffle 관련 animation
*/
export function animateShuffle() {
    return new Promise((resolve) => {
        const cardDeck = document.querySelectorAll('.deck-tail');
        let animationCompleted = 0;
        for (let i = 0; i < cardDeck.length; i++) {
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