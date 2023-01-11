class Game {

    constructor({players,deck, trump}){
     this.players = players;
     this.deck = deck;
     this.trump = trump
    };

    


    

}


// 1. create a game (generate a Game with an ID) (REST POST /new_game)
// 2. while Game has less than 4 players, don't do anything (REST POST :game_id/join) (REST GET :game_id/game)
// 3. When Game has 4 players, than one player can start the game (REST POST :game_id/start_game)
// 4. 





module.exports = Game;