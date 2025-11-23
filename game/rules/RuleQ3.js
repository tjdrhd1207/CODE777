import QuestionRule from "./QuestionRule.js";

export default class RuleQ3 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.userId !== players[currentTurn].userId) {
                const valueMap = new Map();

                player.hand.forEach((card) => {
                    if (!valueMap.has(card.value)) {
                        valueMap.set(card.value, new Set());
                    }
                    valueMap.get(card.value).add(card.color);
                });

                console.log(valueMap);
                // 숫자는 같고 색깔이 다른카드 확인
                let count = 0;
                valueMap.forEach((colors) => {
                    if (colors.size > 1) count++;
                });
                if (count !== 0) count++;
            }
        })
        return count;
    }
}