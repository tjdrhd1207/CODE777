export function showMoreColor(players, currentTurn, color1, color2, color1Name, color2Name) {
    let count1 = 0, count2 = 0;

    players.forEach(player => {
        if (player.userId !== players[currentTurn].userId) {
            player.hand.forEach(card => {
                if (card.color === color1) count1++;
                else if (card.color === color2) count2++;
            });
        }
    });
    
    if (count1 > count2) return color1Name;
    if (count1 < count2) return color2Name;
    return '더 많이 보이지 않습니다.';
}