import QuestionRule from "./QuestionRule";

// 파랑 7과 다른 색깔 7 중에서 어느 것이 더 많이 보입니까?
export default class RuleQ16 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        let blueSeven = 0;
        let anotherSeven = 0;

        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {

                player.hand.forEach((card) => {
                    if (card.value === 7 && card.color === BLUE) {
                        blueSeven += 1;
                    } else if (card.value === 7 && card.color !== BLUE) {
                        anotherSeven += 1;
                    }
                });
            }
        })
        count = (blueSeven > anotherSeven) ? '파랑 7' : (blueSeven === anotherSeven ? '더 많이 보이지 않습니다.' : '다른 7');
        return count;
    }
}