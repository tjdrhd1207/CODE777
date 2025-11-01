import QuestionRule from "./QuestionRule";

// 몇 가지 색깔이 보입니까?
export default class RuleQ8 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;

        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {

                const valueMap = new Map();

                player.hand.forEach((card) => {
                    if (!valueMap.get(card.color)) {
                        valueMap.set(card.color, 0);
                    }
                });
                count = valueMap.size;
            }
        })
        return count;
    }
}