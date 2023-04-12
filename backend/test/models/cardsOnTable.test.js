const CardsOnTable = require('../../models/cardsOnTable');
const Card = require('../../models/card')

let table;
let card1;
let card2;

beforeEach(() => {
    card1 = new Card({ code: "AD" })
    card2 = new Card({ code: "KD" })
    table = new CardsOnTable({})

})



describe('addAttackingCard', () => {
    test('should add one card to uncoveredPiles', () => {
        table.addAttackingCards(card1)
        // expect(table.uncoveredPiles[0]).toEqual(card1)
        expect(table.uncoveredPiles).toContain(card1)
    })
    test('should add two cards to uncoveredPiles', () => {
        table.addAttackingCards(card1, card2)
        expect(table.uncoveredPiles).toContain(card1)
        expect(table.uncoveredPiles).toContain(card2)
    })
    test('should add an extra cards to uncoveredPiles which already has a uncovered card', () => {
        table.addAttackingCards(card1)
        table.addAttackingCards(card2)
        expect(table.uncoveredPiles).toContain(card1)
        expect(table.uncoveredPiles).toContain(card2)
    })
    test('should not allow more than 6 attacking cards', () => {
        table.addAttackingCards(new Card({}),new Card({}),new Card({}),new Card({}),new Card({}),new Card({}))
        
        expect(() => {table.addAttackingCards(card1)}).toThrow("Maximum of attacking cards reached")
    })
    test('should not allow more than 6 attacking cards, 3 cards already covered', () => {
        table.addAttackingCards(new Card({}),new Card({}),new Card({}),new Card({}),new Card({}))
        table.coveredPiles.push([new Card({}),new Card({})])
        expect(()=>{table.addAttackingCards(card1)}).toThrow("Maximum of attacking cards reached")
    })
    
})