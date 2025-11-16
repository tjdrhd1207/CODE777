import QuestionRule from "./QuestionRule.js";

export default class RuleQ1 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        players.forEach((player, idx) => {
            /* 현재턴이 아닌 사람들 중 */
            if (idx !== currentTurn) {
                const sum = player.hand.reduce((acc, val) => acc + val, 0);
                if (sum >= 18) count++;
            }
        })
        return count;
    }
}