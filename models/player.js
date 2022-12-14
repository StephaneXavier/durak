class Player {

    constructor({ userInterface, cardsInHand = [], nextPlayer}) {
        this.cardsInHand = cardsInHand
        this.userInterface = userInterface
        this.nextPlayer = nextPlayer
    };

    playCards(cardsToPlay) {
        for (let card of cardsToPlay) {
            this.cardsInHand = this.cardsInHand.filter(cardInHand => card.code !== cardInHand.code)
        }
    }

    doYouPass(cardsOnTable) {
        let input = this.userInterface.selectDefenderOption()

        if (input) {
            this.playCards(input)
        }
        return input
    }    
}



module.exports = Player