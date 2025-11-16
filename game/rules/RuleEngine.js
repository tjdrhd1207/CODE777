import { SHOW_MORE_COLOR_PARAMS } from "./ruleParams.js";
import RuleQ1 from "./RuleQ1.js";
import RuleQ2 from "./RuleQ2.js";
import RuleQ3 from "./RuleQ3.js";
import RuleQ4 from "./RuleQ4.js";
import RuleQ5 from "./RuleQ5.js";
import RuleQ6 from "./RuleQ6.js";
import RuleQ7 from "./RuleQ7.js";
import RuleQ8 from "./RuleQ8.js";
import RuleQ9 from "./RuleQ9.js";
import RuleQ10 from "./RuleQ10.js";
import RuleQ11 from "./RuleQ11.js";
import RuleQ12 from "./RuleQ12.js";
import RuleQ13 from "./RuleQ13.js";
import RuleQ14 from "./RuleQ14.js";
import RuleQ15 from "./RuleQ15.js";
import RuleQ16 from "./RuleQ16.js";
import RuleQ17 from "./RuleQ17.js";
import ShowMoreColorRule from "./ShowMoreColorRule.js";


export default class RuleEngine {
    constructor(cardDeck) {
        this.cardDeck = cardDeck;

        this.rules = {
            1: new RuleQ1(),
            2: new RuleQ2(),
            3: new RuleQ3(),
            4: new RuleQ4(),
            5: new RuleQ5(),            
            6: new RuleQ6(),
            7: new RuleQ7(),
            8: new RuleQ8(),
            9: new RuleQ9(),
            10: new RuleQ10(),
            11: new RuleQ11(),
            12: new RuleQ12(),
            13: new RuleQ13(),
            14: new RuleQ14(),
            15: new RuleQ15(),
            16: new RuleQ16(),
            17: new RuleQ17(),
            17: new ShowMoreColorRule(SHOW_MORE_COLOR_PARAMS[17]),
            18: new ShowMoreColorRule(SHOW_MORE_COLOR_PARAMS[18]),
            19: new ShowMoreColorRule(SHOW_MORE_COLOR_PARAMS[19]),
            20: new ShowMoreColorRule(SHOW_MORE_COLOR_PARAMS[20]),
            21: new ShowMoreColorRule(SHOW_MORE_COLOR_PARAMS[21]),
            22: new ShowMoreColorRule(SHOW_MORE_COLOR_PARAMS[22]),
            23: new ShowMoreColorRule(SHOW_MORE_COLOR_PARAMS[23]),
        }
    }

    evaluate(questionSeq, players, currentTurn) {
        const rule = this.rules[questionSeq];
        console.log(currentTurn);
        if (!rule) return null;
        return rule.evaluate(players, currentTurn, this.cardDeck);
    }
}