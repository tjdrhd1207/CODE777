/*
정답덱 관련 세팅
*/

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