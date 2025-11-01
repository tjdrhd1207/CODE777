import QuestionRule from "./QuestionRule.js";

// 3과 분홍6 중에서 어느 것이 더 많이 보입니까?
export default class RuleQ12 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        let three = 0;
        let pinkSix = 0;

        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {

                player.hand.forEach((card) => {
                    if (card.value === 3) {
                        three += 1;
                    } else if (card.value === 6 && card.color === PINK) {
                        pinkSix += 1;
                    }
                });
            }
        })
        count = (three > pinkSix) ? '3' : (three === pinkSix ? '더 많이 보이지 않습니다.' : '분홍 6');
        return count;
    }
}