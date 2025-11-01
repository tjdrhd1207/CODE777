import QuestionRule from "./QuestionRule";

// 녹색 1, 검정 5, 분홍 7이 총 몇개 보입니까?
export default class RuleQ11 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;

        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {

                player.hand.forEach((card) => {
                    if ((card.value === 1 && card.color === GREEN) || (card.value === 5 && card.color === BLACK) || (card.value === 7 && card.color === PINK)) count++;
                });
            }
        })
        return count;
    }
}