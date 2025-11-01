import RuleQ1 from "./RuleQ1";

export default class RuleEngin {
    constructor(cardDeck) {
        this.cardDeck = cardDeck;

        this.rules = {
            1: new RuleQ1(),
        }
    }

    evaluate(questionSeq, players, currentTurn) {
        const rule = this.rules[questionSeq];
        if (!rule) return null;
        return rule.evaluate(players, currentTurn, this.cardDeck);
    }
}