import QuestionRule from "./QuestionRule.js";

// 몇 가지 색깔이 보입니까?
export default class RuleQ9 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        let valueMap = new Map();

        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.userId !== players[currentTurn].userId) {

                player.hand.forEach((card) => {
                    valueMap.set(card.color, (valueMap.get(card.color) || 0) + 1);
                });

                let filteredColors = Array.from(valueMap.entries()).filter(([color, count]) => count >= 3);
                count = filteredColors.length;
            }
        })
        return count;
    }
}