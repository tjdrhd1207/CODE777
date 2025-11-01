import QuestionRule from "./QuestionRule";

// 노랑 2와 노랑 7 중에서 어느 것이 더 많이 보입니까?
export default class RuleQ14 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        let yellowTwo = 0;
        let yellowSeven = 0;

        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.id !== players[currentTurn].id) {

                player.hand.forEach((card) => {
                    if (card.value === 2 && card.color === YELLOW) {
                        yellowTwo += 1;
                    } else if (card.value === 7 && card.color === YELLOW) {
                        yellowSeven += 1;
                    }
                });
            }
        })
        count = (yellowTwo > yellowSeven) ? '노랑 2' : (yellowTwo === yellowSeven ? '더 많이 보이지 않습니다.' : '노랑 7');
        return count;
    }
}