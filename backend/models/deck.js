const axios = require('axios');
const INCLUDED_CARDS = 'X1,X2,6H,6S,6D,6C,7H,7S,7D,7C,8H,8S,8D,8C,9H,9S,9D,9C,0H,0S,0D,0C,JH,JS,JD,JC,QH,QS,QD,QC,KH,KS,KD,KC,AH,AS,AC,AD';
const BASE_URL = 'https://deckofcardsapi.com/api/deck/';
const NEW_DECK_URL = BASE_URL + 'new/shuffle/?jokers_enabled=true&cards=' + INCLUDED_CARDS;

class Deck {
    constructor({deckId, numOfCards}){
        this.deckId = deckId;
        this.numOfCards = numOfCards;
    };

    static async newDeck() {
        const deckResp =  await axios.get(NEW_DECK_URL);
        const deckId = deckResp.data.deck_id
        const numOfCards = deckResp.data.remaining
        return new Deck({deckId, numOfCards})
    }

     async drawCards(numOfCardsToBeDrawn){
        const cardsResp = await axios.get(BASE_URL + this.deckId + '/draw/?count=' + numOfCardsToBeDrawn);

        return cardsResp.data.cards
    }
}


module.exports = Deck;