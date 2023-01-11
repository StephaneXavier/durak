const Game = require('./game');

let game;
let player1;
let player2;
let player3;
let player4;
let deck;

beforeEach(() => {
    player1 = { hand: {} };
    player2 = { hand: {} };
    player3 = { hand: {} };
    player4 = { hand: {} };
    deck = {};
    game = new Game([player1, player2, player3, player4], deck)

})


describe('Game model', () => {
    test('game.start distribute 5 cards to each player', () => {
        game.start();

        for (let player of game.players) {
            let numOfCards = Object.keys(player.hand).length;
            expect(numOfCards).toBe(5)
        };
    });
})