import QuestionRule from "./QuestionRule";

// 색깔과 숫자 모두 완전히 같은 타일이 있는 받침대는 몇 개입니까?
export default class RuleQ6 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {

                const valueMap = new Map();

                player.hand.forEach((card) => {
                    const key = `${card.value}-${card.color}`;
                    valueMap.set(key, (valueMap.get(key) || 0) + 1);
                });
                // 숫자는 같고 색깔이 다른카드 확인
                let sameFlag = false;
                valueMap.forEach((count) => {
                    if (count > 1) {
                        sameFlag = true;
                    }
                });
                if (sameFlag) count++;
            }
        })
        return count;
    }
}