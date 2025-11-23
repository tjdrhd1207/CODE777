/* import { CardDeck } from "./CardDeck";
import { generateDeck } from "./cardFactory";

export class GameController {
    constructor(playerInfo) {
        // 조회해온 플레이어드을 통해 정보를 얻는 로직으로 바꿔야함
        this.players = playerInfo.map((name, idx) => new Player(name, idx));
        this.deck = new CardDeck(generateDeck());
        this.deck.shuffle();
    }

    async start() {
        console.log("--Game Start--");
        hintDeckInitSetting(this.boardCenter);
        this.game.reset();
        await animateShuffle();

        this.game.dealCards();
        animateDeal(this.game.cardDeck.cards, this.game.players, this.playerDivs);

        this.nextTurn();
    }

    nextTurn() {
        clearPreviousTurnIcon(this.game.getPreviousPlayer());

        const currentPlayer = this.game.advanceTurn();
        renderTurnIcon(currentPlayer);

        const questionCard = this.game.deck.draw();
        hintDeckDrawSetting(questionCard, this.game.deck);

        const answer = this.game.evaluateQuestion(questionCard);
        deckAnswerSetting(answer);
    }

    handleAnswerSubmission(player, submittedAnswer) {
        const isCorrect = this.game.submitAnswer(player, submittedAnswer);
        if (!isCorrect) {
          retrieveAnimation(player.id);
        }
    } 


    dealCards() {
        this.players.forEach((player) => {
            for (let i = 0; i < 3; i++) {
                const card = this.deck.draw();
                player.hand.push(card);
            }
        });
    }

    startRound() {
        console.log('게임 시작');
        this.dealCards();
    }

    submitAnswer(player, answer) {
        
        let playerHasAnswer = [];
        player.hand.forEach((hand) => {
            playerHasAnswer.push(hand.value);
        });

        let answerYN = arrayHasElement(answer, playerHasAnswer);
        console.log(answerYN);
        // 정답
        if (answerYN) {

        } else {
        // 오답
            this.deck.playerCardShuffle(player);
            player.retrieve(); // 카드 회수
            player.deal(this.deck); //카드 다시 나누기
            // 카드 나누기 애니메이션
            retrieveAnimation(player.id);
        }

        const isCorrect = RuleEngine.compare(answer, this.answer);

        if (!isCorrect) {
          this.deck.returnCards(player.hand);
          player.clearHand();
          this.dealCardsTo(player);
        }
    }
} */