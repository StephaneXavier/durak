const Deck = require('./deck')

class Game {

    constructor({ players, deck }) {
        this.players = players;
        this.deck = deck;
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
        game.defineNewDealer()
        game.sendStartGame()
        return game
    }

    async sendStartGame() {
        const playerIds = this.players.map(player => player.id)

        this.players.forEach((player) => {
            player.send(JSON.stringify({ type: 'gameStarted', yourId: player.id, playerIds: playerIds, dealerId: this.dealer.id }))
        })
    }

    async defineNewDealer() {
        if(this.dealer){
            console.log('already have a dealer, choosing the next one')
        }else{
            const chosenPlayerIndex = Math.floor(Math.random() * this.players.length)
            this.dealer = this.players[chosenPlayerIndex]
        }
    }

    async distributeInitialCards() {
        const cards = await this.deck.drawCards(5 * this.players.length)

        this.players.forEach((player) => {
            player.giveCards(cards.splice(0, 5)) // TODO handle message to clients when redistribution happens
        })

        const tempTrump = await this.deck.drawCards(1)
        this.trump = tempTrump[0]
    }

    async sendTrump() {
        this.players.forEach((player) => {
            player.send(JSON.stringify({ type: 'trumpCard', value: this.trump }))
        })
    }
}


module.exports = Game;