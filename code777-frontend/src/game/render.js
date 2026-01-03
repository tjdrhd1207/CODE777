/* 
DOM 관련 함수
*/

export function renderGame(state) {
    renderBoard(state);
    renderQuestion(state.question);
    renderPlayers(state.players);
    renderTimer(state.timer);
}

export function renderBoard(gameState) {

}

export function drawCards(gameState) {

}

export function updateUI(gameState) {

}

export function renderPlayers(players) {

}

export function renderQuestion(question) {

}

export function renderTurnUI(players, question, answer) {

}

export function renderTimer(timeLeft) {

}

export function renderPlayerAnswer(userId, answer, isCorrect) {

}

export function clearAnswers() {

}