import QuestionRule from "./QuestionRule";

// 하나도 보이지 않는 숫자는 몇 개입니까?
export default class RuleQ10 extends QuestionRule {
    evaluate(players, currentTurn, cardDeck) {
        let count = 0;
        let cardSet = new Set();

        players.forEach((player) => {
            if (player.id !== players[currentTurn].id) {
                player.hand.forEach((card) => cardSet.add(card.value));
            }
        });

        const allCardValues = cardDeck.getAllCardValues();
        const invisibleNumbers = Array.from(allCardValues).filter(
            (val) => !cardSet.has(val)
        );

        return invisibleNumbers.length;
    }
}