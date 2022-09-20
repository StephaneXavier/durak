// Card class will be created for every card that a player holds in hand or plays on table.
class Card {
    // These values are provided by the card API. All values are provided as strings.
    constructor({image='default value', value, suit, code}){
     this.image = image;
     this.value = value;
     this.suit = suit;
     this.code = code;
    };

    // Converts the value of the card into an integer.
    numValue (){
        const valToNum = {"KING":12,"QUEEN":11,"JACK":10, "ACE":13}
        console.log(this.image)
        if(valToNum[this.value]){
            return valToNum[this.value]
        };

        return +this.value 
    };

    // Returns true if card is a joker
    isJoker() {
        return ["X1","X2"].indexOf(this.code)!=-1
    };

    // Determines if the card the player wants to lay on the tabled card can beat the tabled card
    // ex: on the table is JD, player puts AD -> true
    //     on the table is AD, player puts JD -> false 
    static playerCardWins(cardOnTable, playerCard, trump){
        if(playerCard.isJoker()){
            return true
        };
        if(playerCard.suit === trump && cardOnTable.suit !== playerCard.suit) {
            return true;
        };
        if(cardOnTable.suit === playerCard.suit){
            return cardOnTable.numValue() < playerCard.numValue()
        };
        return false
    };

    // If the receiving player has a card of the same value, player can pass
    // ex: player receives JD & JH, player places JS -> true
    static playerCanPass(cardOnTable, playerCard){
        return (cardOnTable.value === playerCard.value)
    };

    /* Returns true if an attacking player can add a card to the tabled cards
    ex: defending player has an array of following: AD, QH, KH and player wants to 
    table (attack with) a QD --> true
    */ 
    static canPlaceCardOnTable(playerCard,valuesOnTable){
        return (valuesOnTable.indexOf(playerCard.value) !=-1)
    };


}



module.exports = Card;