/* 
힌트 덱 관련 화면 세팅
*/

export function hintDeckInitSetting(board) {
    const deck = document.createElement("div");
    const deckAnswer = document.createElement("div");

    deck.classList.add("deck");
    deckAnswer.classList.add("answer");

    board.appendChild(deck);
    board.appendChild(deckAnswer);
}

export function hintDeckDrawSetting(drawedDeck) {
    const deck = document.querySelector(".deck");
    deck.innerHTML = "";
    deck.innerHTML += `<span style="font-size: 1.5rem; font-weight: bold">${drawedDeck.seq}</span>`;
    deck.innerHTML += '<br></br>';
    deck.innerHTML += drawedDeck.question;
}