import { GREEN, YELLOW } from "./colorMap.js";
import QuestionRule from "./QuestionRule.js";

// 녹색 6과 노랑 7 중에서 어느 것이 더 많이 보입니까?
export default class RuleQ13 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        let greenSix = 0;
        let yellowSeven = 0;

        players.forEach((player) => {
            /* 현재턴이 아닌 사람들 중 */
            if (player.userId !== players[currentTurn].userId) {

                player.hand.forEach((card) => {
                    if (card.value === 6 && card.color === GREEN) {
                        greenSix += 1;
                    } else if (card.value === 7 && card.color === YELLOW) {
                        yellowSeven += 1;
                    }
                });
            }
        });
        count = (greenSix > yellowSeven) ? '녹색 6' : (greenSix === yellowSeven ? '더 많이 보이지 않습니다.' : '노랑 7');
        return count;
    }
}