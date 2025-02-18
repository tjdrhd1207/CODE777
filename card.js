const GREEN = 'GREEN';
const YELLOW = 'YELLOW';
const BLACK = 'BLACK';
const BROWN = 'BROWN';
const RED = 'RED';
const PINK = 'PINK';
const BLUE = 'BLUE';
const ASSETS_PATH = 'assets';
class Card {
    constructor() {
        this.cardInfo = [
            {value: 1, color: GREEN, src: `${ASSETS_PATH}/1_green.svg`},
            {value: 2, color: YELLOW, src: `${ASSETS_PATH}/2_yellow.svg`},
            {value: 3, color: BLACK, src: `${ASSETS_PATH}/3_black.svg`},
            {value: 4, color: BROWN, src: `${ASSETS_PATH}/4_brown.svg`},
            {value: 5, color: RED, src: `${ASSETS_PATH}/5_red.svg`},
            {value: 5, color: BLACK, src: `${ASSETS_PATH}/5_black.svg`},
            {value: 6, color: PINK, src: `${ASSETS_PATH}/6_pink.svg`},
            {value: 6, color: GREEN, src: `${ASSETS_PATH}/6_green.svg`},
            {value: 7, color: YELLOW, src: `${ASSETS_PATH}/7_yellow.svg`},
            {value: 7, color: PINK, src: `${ASSETS_PATH}/7_pink.svg`},
            {value: 7, color: BLUE, src: `${ASSETS_PATH}/7_blue.svg`},
        ];

        this.cardCounts = {
            "1_GREEN": 1,
            "2_YELLOW": 2,
            "3_BLACK": 3,
            "4_BROWN": 4,
            "5_RED": 4,
            "5_BLACK": 1,
            "6_PINK": 3,
            "6_GREEN": 3,
            "7_YELLOW": 2,
            "7_PINK": 1,
            "7_BLUE": 4
        };
        this.card = [];
        // this.cardSetting();

    }

    cardSetting() {
        this.cardInfo.forEach((card) => {
            let keyInfo = `${card.value}_${card.color}`;
            const mappingKey = Object.keys(this.cardCounts).find(key => key === keyInfo);
            const count = this.cardCounts[mappingKey];
            for (let i = 0; i < count; i++){
                this.card.push({...card});
            }
        });
        this.shuffle();
    }

    shuffle() {
        for (let i= this.card.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.card[i], this.card[j]] = [this.card[j], this.card[i]];
        }
    }

    dealCards(player) {
        let playerCard = [];

        for (let i=0; i < 3; i++) {
            playerCard.push(this.card.pop());
        }
        console.log(`${player.name}에게 나눠진 카드 : ${playerCard[0].value}, ${playerCard[1].value}, ${playerCard[2].value}`);
        console.log(this.card);

        const board = document.querySelector('.board');
        const players = document.querySelectorAll('.player');
        
  
    }
}

export default Card;