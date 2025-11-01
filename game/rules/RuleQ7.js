import QuestionRule from "./QuestionRule";

// 3개의 타일이 연속된 숫자인 받침대는 몇 개입니까?
export default class RuleQ7 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {

                const sortedCards = [...player.hand].sort((a, b) => a.value - b.value);

                let continuous = false;
                // 정렬한 핸드를 통해 연속된 숫자인지 확인
                for (let i = 1; i < sortedCards.length; i++) {
                    if (sortedCards[i].value !== sortedCards[i - 1].value + 1) {
                        return;
                    } else {
                        continuous = true; // 모두 연속됨
                    }
                }

                if (continuous) count++;
            }
        })
        return count;
    }
}