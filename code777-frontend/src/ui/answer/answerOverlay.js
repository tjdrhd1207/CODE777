export function initAnswerOverlay() {
    if (document.getElementById("answer-overlay")) return;

    const overlay = document.createElement("div");
    overlay.id = "answer-overlay";
    overlay.className = "answer-overlay hidden";

    overlay.innerHTML = `
        <div class="answer-box">
            <div id="answer-user" class="answer-user"></div>
            <div id="answer-text" class="answer-text"></div>
            <div id="answer-result" class="answer-result"></div>
        </div>
    `;

    document.body.appendChild(overlay);
}

export function showAnswerResultOverlay(userId, answer, isCorrect) {
    const overlay = document.getElementById("answer-overlay");
    const userEl = document.getElementById("answer-user");
    const textEl = document.getElementById("answer-text");
    const resultEl = document.getElementById("answer-result");

    userEl.innerText = `${userId}님의 선택`;
    textEl.innerText = answer.join(", ");

    resultEl.innerText = isCorrect ? "정답!" : "오답!";
    resultEl.className = `answer-result ${isCorrect ? "correct" : "wrong"}`;

    overlay.classList.remove("hidden");

    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 1800);
}