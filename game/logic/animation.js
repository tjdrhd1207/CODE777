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
    const deckAnswer = document.createElement("div");

    deck.classList.add("deck");
    deckAnswer.classList.add("answer");

    board.appendChild(deck);
    board.appendChild(deckAnswer);
}

export function hintDeckDrawSetting(drawedDeck) {
    console.log(drawedDeck);
    const deck = document.querySelector(".deck");
    deck.innerHTML = "";
    deck.innerHTML += `<span style="font-size: 1.5rem; font-weight: bold">${drawedDeck.seq}</span>`;
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
        playerDiv.classList.add(`player-${players[i].id}`);
        playerDiv.dataset.playerId = players[i].id;
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
            const imgDiv = document.createElement("div");
            imgDiv.classList.add("player-hand-card");
            
            const imgTag = document.createElement("img");
            const imgBack = document.createElement("img");
            imgTag.setAttribute("src", players[j].hand[i].src);

            imgBack.setAttribute("src", "assets/back-card.png");
            imgBack.classList.add("card-back");

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

export function deckAnswerSetting(answer) {
    const deckAnswerDiv = document.querySelector(".answer");
    while (deckAnswerDiv.firstChild) {
        deckAnswerDiv.removeChild(deckAnswerDiv.firstChild);
    }
    const answerTag = document.createElement("span");
    answerTag.classList.add("deck-answer");
    answerTag.innerHTML = "";
    answerTag.innerHTML += answer;
    deckAnswerDiv.appendChild(answerTag);
}

export function showAnswerNumberField(params, callback) {
    console.log(params.target);
    const answerContainer = params.target.querySelector(".answer-button-container");
    const oneToSevenBox = Array.from(answerContainer.childNodes).filter((ele) => ele.nodeType === ele.ELEMENT_NODE);
    console.log(params.open);
    if (params.open) {
        oneToSevenBox.forEach((box) => {
            box.classList.add('answer-container-show');
            box.removeEventListener("click", box._clickHandler);

            box._clickHandler = function (e) { // 이벤트 리스너를 변수에 저장하여 관리
                const selectedNumber = e.target.innerText.trim();
                // console.log("클릭된 번호:", selectedNumber);
                // console.log("현재 params.target:", params.target);

                // const input = params.target.querySelector(".answer-result");
                // input.innerText = selectedNumber;
                
                if (callback) {
                    callback(selectedNumber);
                }
            };

            box.addEventListener("click", box._clickHandler);
        })
    } else {
        oneToSevenBox.forEach((box) => {
            box.classList.remove('answer-container-show');
            box.removeEventListener("click", box._clickHandler);
        });
    }
}

export function showAnswerField() {
    const input = document.querySelector(".answer-container");
    input.classList.add("answer-container-show");
    let boxFlag = [false, false, false];

    const answerNumberCellArray = Array.from(input.childNodes).filter((ele) => {
        return ((ele.nodeType === ele.ELEMENT_NODE) && ele.classList.contains('answer-number-cell'));
    });

    answerNumberCellArray.forEach((answerNumberCell, index) => {
        answerNumberCell.addEventListener("click", function (e) {
            e.stopPropagation();
            boxFlag[index] = !boxFlag[index];
            const answerButtonContainer = e.target.querySelector(".answer-button-container");

            showAndHideNumber(answerButtonContainer, boxFlag, index);
        });

        const answerNumberElements = answerNumberCell.querySelectorAll(".answer-number");
        const answerResult = answerNumberCell.querySelector(".answer-result");
        answerNumberElements.forEach((answerNumber) => {
            answerNumber.addEventListener("click", function (e) {
                e.stopPropagation();

                answerResult.innerText = e.target.innerText;
                boxFlag[index] = !boxFlag[index];

                showAndHideNumber(e.target.parentNode, boxFlag, index);
            });
        })
    })
}

function showAndHideNumber(ele, boxFlag, index) {
    if (boxFlag[index]) {
        ele.style.visibility = "visible";
    } else {
        ele.style.visibility = "hidden";
    }
}

export function checkAnswer() {
    const submittedAnswer = document.querySelectorAll(".answer-result");

    const submittedArray = [];
    submittedAnswer.forEach((ele) => {
        submittedArray.push(ele.innerText);
    });

    return submittedArray;
}

// 카드 회수 애니메이션
export function retrieveAnimation(playerId) {
    console.log(playerId);
    const playerDiv = document.querySelector(`.player-${playerId}`);
    console.log(playerDiv.childNodes);
    const cardContainer = playerDiv.querySelector(".card-container");
    console.log(cardContainer.childNodes);
    cardContainer.childNodes.forEach((child) => {
        child.classList.add("card-retrieve");
    });
}