class Coin {
    constructor(coin) {
        this.player = coin.player;
        this.coin = 0;
    }

    getWin(player) {
        player.coin = player.coin + 1;
    }

    getCurrentCoin(player) {
        return player.coin; 
    }
}



export default Coin;