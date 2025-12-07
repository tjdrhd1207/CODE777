import QuestionRule from "./QuestionRule.js";

// 몇 가지 색깔이 보입니까?
export default class RuleQ8 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        const valueMap = new Map();

        players.forEach((player) => {

            /* 현재턴이 아닌 사람들 중 */
            if (player.userId !== players[currentTurn].userId) {
        
                player.hand.forEach((card) => {
                    console.log(card.color);
                    if (!valueMap.get(card.color)) {
                        valueMap.set(card.color, 0);
                        console.log(valueMap);
                    }
                });
                count = valueMap.size;
            }
        })
        return count;
    }
}