import QuestionRule from "./QuestionRule.js";

export default class RuleQ5 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.userId !== players[currentTurn].userId) {

                let even = 0; // 짝수
                let odd = 0; // 홀수

                player.hand.forEach((card) => {
                    if (card.value % 2 === 0) {
                        even += 1;
                    } else {
                        odd += 1;
                    }
                });

                // 세개의 색이 다다른 핸드 확인
                if (even === 3 || odd === 3) count++;
            }
        })
        return count;
    }
}