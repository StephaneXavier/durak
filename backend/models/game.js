const Deck = require('./deck')

class Game {

    constructor({ players, deck, trump }) {
        this.players = players;
        this.deck = deck;
        this.trump = trump
    };

    static async start(players) {
        let game;
        
        do {
            const deck = await Deck.newDeck()
            game = new Game({ players, deck })
            await game.distributeInitialCards() // game.selectInitialCards()
        }
        while (game.trump.code === "X2" || game.trump.code === "X1")


        // send trump card to players to be displayed on the table // game.distributeInitialCards()
        game.sendTrump()
        return game
    }

    async distributeInitialCards() {
        const cards = await this.deck.drawCards(5 * this.players.length)

        this.players.forEach((player) => {
            player.giveCards(cards.splice(0, 5)) // TODO handle message to clients when redistribution happens
        })

        const tempTrump = await this.deck.drawCards(1)
        this.trump = tempTrump[0]
    }
    
    async sendTrump(){
        this.players.forEach((player) => {
            player.send(JSON.stringify({type:'trumpCard', value: this.trump }))
        })
    }
}


module.exports = Game;