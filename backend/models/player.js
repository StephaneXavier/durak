class Player {

    constructor({ webClient, cardsInHand = [], nextPlayer }) {
        this.cardsInHand = cardsInHand
        this.webClient = webClient
        this.nextPlayer = nextPlayer
        
    };

    send(message) {
        this.webClient.send(message)
    }

    giveCards(arrOfCards){
        this.cardsInHand = arrOfCards;
        this.send(JSON.stringify({type:'receivedCards', value: arrOfCards}))
    }

    // playCards(cardsToPlay) {
    //     for (let card of cardsToPlay) {
    //         this.cardsInHand = this.cardsInHand.filter(cardInHand => card.code !== cardInHand.code)
    //     }
    // }

    // doYouPass(cardsOnTable) {
    //     let input = this.userInterface.selectDefenderOption()

    //     if (input) {
    //         this.playCards(input)
    //     }
    //     return input
    // }    
}



module.exports = Player