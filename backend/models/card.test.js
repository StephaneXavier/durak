const Card = require('./card');
// const Game = require('./game')

// const game = new Game({trump:"CLUBS"})


describe('Test numValue instance method', () => {
    test('2 face cards one number card', () => {
        const card1 = new Card({value: "KING", suit:"DIAMOND", code:"KD"});
        const card2 = new Card({suit:"DIAMOND", value: "QUEEN", code:"QD"});
        const card3 = new Card({value: "8", suit:"DIAMOND", code:"8D"});
        expect(card1.numValue()).toBe(12);
        expect(card2.numValue()).toBe(11);
        expect(card3.numValue()).toBe(8);
    })
})
describe('Test playerCardWins class method', () => {
    test("there is a KD on table and QD in player's hand", () => {
        const cardOnTable = new Card({value: "KING", suit:"DIAMOND", code:"KD"});
        const playerCard = new Card({suit:"DIAMOND", value: "QUEEN", code:"QD"});
        expect(Card.playerCardWins(cardOnTable, playerCard, "CLUBS")).toBe(false);
    });

    test("there is a QD on table and KD in player's hand", () => {
        const playerCard = new Card({value: "KING", suit:"DIAMOND", code:"KD"});
        const cardOnTable = new Card({suit:"DIAMOND", value: "QUEEN", code:"QD"});
        expect(Card.playerCardWins(cardOnTable, playerCard, "CLUBS")).toBe(true);
    });

    test("QH on table KD in hand", () => {
        const playerCard = new Card({value: "KING", suit:"DIAMOND", code:"KD"});
        const cardOnTable = new Card({suit:"HEARTS", value: "QUEEN", code:"QD"});
        expect(Card.playerCardWins(cardOnTable, playerCard, "CLUBS")).toBe(false);
    });

    test("KD on table 2C in hand and the trump is clubs", () => {
        const playerCard = new Card({suit:"CLUBS", value: "2", code:"2C"});
        const cardOnTable = new Card({value: "KING", suit:"DIAMOND", code:"KD"});
        expect(Card.playerCardWins(cardOnTable, playerCard, "CLUBS")).toBe(true);
    });

    test("KD on table X1 (joker black) in hand", () => {
        const playerCard = new Card({suit:"BLACK", value: "JOKER", code:"X1"});
        const cardOnTable = new Card({value: "KING", suit:"DIAMOND", code:"KD"});
        expect(Card.playerCardWins(cardOnTable, playerCard, "CLUBS")).toBe(true);
    })
})

describe('Test playerCanPass class method', () => {
    test("there is a KD on table and KH in player's hand", () => {
        const cardOnTable = new Card({value: "KING", suit:"DIAMOND", code:"KD"});
        const playerCard = new Card({value: "KING", suit:"HEARTS", code:"KH"});
        expect(Card.playerCanPass(cardOnTable, playerCard)).toBe(true);
    });
});


describe('Test canPlaceCardOnTable class method', () => {
    test("there is a KD on table and player wants to play KH", () => {
        const playerCard = new Card({value: "KING", suit:"HEARTS", code:"KH"});
        expect(Card.canPlaceCardOnTable(playerCard, ["KING"])).toBe(true);
    });
    test("there is a KD on table and player wants to play QH", () => {
        const playerCard = new Card({value: "QUEEN", suit:"HEARTS", code:"KH"});
        expect(Card.canPlaceCardOnTable(playerCard, ["KING"])).toBe(false);
    });
    test("there is a KD and 3H on table and player wants to play KH", () => {
        const playerCard = new Card({value: "KING", suit:"HEARTS", code:"KH"});
        expect(Card.canPlaceCardOnTable(playerCard, ["KING", "3"])).toBe(true);
    });
});