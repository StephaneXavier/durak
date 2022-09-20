const Card = require("./card");
const Game = require("./game");

class FindDefender {
    
    constructor({initialDefender, initialCardsAttacking = [] }) {
       this.initialDefender = initialDefender;
       this.initialCardsAttacking = initialCardsAttacking
    };

    findDefender() {
        while (this.initialDefender.pass())
            this.initialDefender = initialDefender.nextPlayer()
        return this.initialDefender
    }

    // Player class verifies if pass is correct
    // Player.pass(initialCardsAttacking){
    //     if(input){
    //        Card.playerCanPass(initialCardsAttacking, input)
    //     }
    // }
}



module.exports = FindDefender