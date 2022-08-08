class Game {

    constructor({players,deck, trump}){
     this.players = players;
     this.deck = deck;
     this.trump = trump
    };

    start(){
        for(let player in this.players){
            player.hand
        }
    }

}








module.exports = Game;