const Game = require('../../models/game');
const Player = require('../../models/player')
const Deck = require('../../models/deck')

let game;
let fakeWebClient;
let player1;
let player2;
let player3;
let player4;
let deck;
let card;

beforeEach(() => {
    fakeWebClient = { send: (message) => { } }
    player1 = new Player({ cardsInHand: [], webClient: fakeWebClient });
    player2 = new Player({ cardsInHand: [], webClient: fakeWebClient });
    player3 = new Player({ cardsInHand: [], webClient: fakeWebClient });
    player4 = new Player({ cardsInHand: [], webClient: fakeWebClient });

    card = {
        code: '8S',
        image: 'https://deckofcardsapi.com/static/img/8S.png',
        images: [Object],
        value: '8',
        suit: 'SPADES'
    }
    deck = { drawCards: (numberOfCards) => { return Array(numberOfCards).fill(card) } };
    Deck.newDeck = () => { return deck }
    
})






describe('Game model', () => {
    test('game.distributeInitialCards gives each player 5 cards', async() => {
        let game = new Game({players: [player1, player2, player3, player4], deck})
        
        await game.distributeInitialCards()
        
        for (let player of game.players) {
            let numOfCards = Object.keys(player.cardsInHand).length;
            expect(numOfCards).toBe(5)
        };
    })

    test('game.distributeInitialCards has trump card', async() => {
        let game = new Game({players: [player1, player2, player3, player4], deck})
        
        await game.distributeInitialCards()

        expect(game.trump).not.toBeNull()
    })

    test('Game.start redistribute cards when trump is a joker', async() => {
        deck.drawCards = jest.fn((_numOfCards) => { return {} }); // Jest mock https://jestjs.io/docs/mock-functions
         
        deck.drawCards
          .mockReturnValueOnce(Array(20).fill(card))
          .mockReturnValueOnce([{code: "X1"}])
          .mockReturnValueOnce(Array(20).fill(card))
          .mockReturnValueOnce([card])

        let game = await Game.start([player1, player2, player3, player4]) 
        
        expect(game.trump).not.toBeNull()
        expect(deck.drawCards.mock.calls.length).toBe(4)
        
    })
    
})