import QuestionRule from "./QuestionRule.js";

// 분홍 6와 노랑 6 중에서 어느 것이 더 많이 보입니까?
export default class RuleQ15 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        let pinkSix = 0;
        let yellowSix = 0;

        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {

                player.hand.forEach((card) => {
                    if (card.value === 6 && card.color === PINK) {
                        pinkSix += 1;
                    } else if (card.value === 6 && card.color === YELLOW) {
                        yellowSix += 1;
                    }
                });
            }
        })
        count = (pinkSix > yellowSix) ? '분홍 6' : (pinkSix === yellowSix ? '더 많이 보이지 않습니다.' : '노랑 6');
        return count;
    }
}