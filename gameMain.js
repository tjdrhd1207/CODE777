const hoverSound = new Audio('assets/mouse-hover.mp3');

let userInteracted = false;  // 사용자의 상호작용 여부

const mainList = document.querySelectorAll('.main-list');

mainList.forEach((list) => {
    list.addEventListener('click', () => {
        hoverSound.currentTime = -1000;
        hoverSound.play().catch(error => console.error('Sound play error', error));
        list.classList.add('clicked-list');
        console.log(list.classList);
        if (list.classList.contains("game-start")) {
            window.location.href = "waitRoom.html";
        }
    });
});