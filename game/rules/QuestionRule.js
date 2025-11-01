// Rule 관련 추상 클래스
export default class QuestionRule {
    evaluate(players, currentTurn, cardDeck) {
        throw new Error ("evaluate() must be implemented by subclass");
    }
}