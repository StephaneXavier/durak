let MAXIMUM_ATTACKING_CARDS = 6

class CardsOnTable {

    constructor({ uncoveredPiles = [], coveredPiles = [] }) {
        this.uncoveredPiles = uncoveredPiles;
        this.coveredPiles = coveredPiles
    }


    attackingCardLimitReached(cards) {
        let totalAttackingCards = this.uncoveredPiles.length + this.coveredPiles.length

        return totalAttackingCards + cards.length > MAXIMUM_ATTACKING_CARDS
    }

    canAttackWithCard

    //  
    addAttackingCards(...cards) {
        if (this.attackingCardLimitReached(cards)) {
            throw new Error("Maximum of attacking cards reached")
        }
        this.uncoveredPiles.push(...cards)
    }
}

module.exports = CardsOnTable

