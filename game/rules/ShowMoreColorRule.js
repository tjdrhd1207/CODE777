import QuestionRule from "./QuestionRule.js";
import { showMoreColor } from "./utils.js";

export default class ShowMoreColorRule extends QuestionRule {
    constructor(params) {
        super();
        this.params = params; // seq별 이름 + 색상
    }

    evaluate(players, currentTurn, cardDeck) {
        console.log("---플레이어정보----");
        console.log(players);
        return showMoreColor(
            players,
            currentTurn,
            this.params.color1,
            this.params.color2,
            this.params.color1Name,
            this.params.color2Name
        );
    }
}