import QuestionRule from "./QuestionRule";

export default class RuleQ2 extends QuestionRule {
    evaluate(players, currentTurn) {
        let count = 0;
        players.forEach((player, idx) => {
            if (idx !== currentTurn) {
                const sum = player.hand.reduce((acc, card) => acc + card.value, 0);
                if (sum <= 12) count++;
            }
        });
        return count;
    }
}