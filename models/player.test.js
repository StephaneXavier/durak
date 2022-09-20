const Card = require('./card');
const Player = require('./player');
const Game = require('./game')

let p1;
let card1;
let card6;
let cardsOnTable;
let userInterface;
let defenderOptionStub = { value: false };

beforeEach(() => {
    userInterface = {
        selectDefenderOption: () => { return defenderOptionStub.value }
    }

    card1 = new Card({ value: "KING", suit: "DIAMOND", code: "KD" });
    let card2 = new Card({ suit: "DIAMOND", value: "QUEEN", code: "QD" });
    let card3 = new Card({ value: "8", suit: "DIAMOND", code: "8D" });
    let card4 = new Card({ value: "9", suit: "CLUBS", code: "9C" });
    let card5 = new Card({ suit: "HEARTS", value: "QUEEN", code: "QH" });
    card6 = new Card({ value: "KING", suit: "CLUBS", code: "KC" });

    cardsOnTable = [new Card({ value: "KING", suit: "HEARTS", code: "KH" })];
    p1 = new Player({ userInterface: userInterface, cardsInHand: [card1, card2, card3, card4, card5, card6] })

})



describe('doYouPass works', () => {
    test('Player does not pass, cardsInHand stays same method returns false', () => {
        expect(p1.doYouPass(cardsOnTable)).toBe(false)
        expect(p1.cardsInHand.length).toBe(6)
    })

    test('Player does pass, cardsInHand pops the passing card', () => {
        defenderOptionStub.value = [card1]
        expect(p1.doYouPass(cardsOnTable)).toEqual([card1])
        expect(p1.cardsInHand.length).toBe(5)
    })

    test('Player does pass with 2 cards, cardsInHand pops the 2 passing cards', () => {
        defenderOptionStub.value = [card1, card6]
        expect(p1.doYouPass(cardsOnTable)).toEqual([card1, card6])
        expect(p1.cardsInHand.length).toBe(4)
    })
})
