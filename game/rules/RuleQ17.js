import QuestionRule from "./QuestionRule";
import { showMoreColor } from "./utils";

export default class ShowMoreColorRule extends QuestionRule {
    constructor(params) {
        super();
        this.params = params;
    }

    evaluate(players, currentTurn, cardDeck) {
        return showMoreColor(players, 
            currentTurn, 
            this.params.color1, 
            this.params.color2, 
            this.params.color1Name, 
            this.params.color2Name
        );
    }
}