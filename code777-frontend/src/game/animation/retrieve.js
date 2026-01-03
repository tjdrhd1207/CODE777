/* 
카드 회수 관련 animation
*/

// 카드 회수 애니메이션
export function retrieveAnimation(playerId) {
    const playerDiv = document.querySelector(`.player-${playerId}`);
    const cardContainer = playerDiv.querySelector(".card-container");
    cardContainer.childNodes.forEach((child) => {
        child.classList.add("card-retrieve");
    });
}

