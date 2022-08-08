class Card {

    constructor({image='default value', value, suit, code}){
     this.image = image;
     this.value = value;
     this.suit = suit;
     this.code = code;
    };

    numValue (){
        const valToNum = {"KING":12,"QUEEN":11,"JACK":10, "ACE":13}
        console.log(this.image)
        if(valToNum[this.value]){
            return valToNum[this.value]
        };

        return +this.value 
    };

    isJoker() {
        return ["X1","X2"].indexOf(this.code)!=-1
    };

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

    static playerCanPass(cardOnTable, playerCard){
        return (cardOnTable.value === playerCard.value)
    };

    
    static canPlaceCardOnTable(playerCard,valuesOnTable){
        return (valuesOnTable.indexOf(playerCard.value) !=-1)
    };


}



module.exports = Card;