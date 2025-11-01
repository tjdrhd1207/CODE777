export function showMoreColor(players, currentTurn, color1, color2, color1Name, color2Name) {
    let count1 = 0, count2 = 0;
    console.log(players);
    console.log(currentTurn);
    console.log(color1);
    console.log(color2);

    players.forEach(player => {
        if (player.userId !== players[currentTurn].userId) {
            player.hand.forEach(card => {
                console.log("카드.칼라 : " + card.color);
                console.log("color1 : " + color1);
                console.log("color2 : " + color2);
                if (card.color === color1) count1++;
                else if (card.color === color2) count2++;
            });
        }
    });

    if (count1 > count2) return color1Name;
    if (count1 < count2) return color2Name;
    return '더 많이 보이지 않습니다.';
}