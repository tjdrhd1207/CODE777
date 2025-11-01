import QuestionRule from "./QuestionRule.js";

export default class RuleQ4 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {
                const valueMap = new Map();
                player.hand.forEach((card) => {
                    if (!valueMap.has(card.color)) {
                        valueMap.set(card.color, new Set());
                    }
                    valueMap.get(card.color).add(card.value);
                });
                console.log(valueMap);
                // 세개의 색이 다다른 핸드 확인
                if (valueMap.size === 3) count++;
            }
        })
        return count;
    }
}