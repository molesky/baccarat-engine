'use strict';

const Card = require('./card.js');

const shuffleArray = require('shuffle-array');

// const CutCardLengthFromBottom = 16;

/**
 * Baccarat shoe
 */
class Shoe {

    /**
     * Cards left
     * @return {number} Count of cards left
     */
    get cardsLeft() {
        return this.cards.length - this.cardIndex;
    }

    /**
     * Number of cards before the cut card
     * @return {number} Count of cards left before cut card
     */
    get cardsBeforeCutCard() {
        return Math.max(0, this.cardsLeft - this.cutCardLengthFromBottom);
    }

    /**
     * Has the cut card been reached
     * @return {boolean} true if the cut card has been reached, false otherwise
     */
    get cutCardReached() {
        return this.cardsBeforeCutCard <= 0;
    }

    /**
     * Shoe constructor
     * @param {number} decks - Count of decks to be included in the shoe
     * @param {number} cutCardLengthFromBottom - Count of cards after the cut
     *   card
     * @constructor
     */
    constructor(decks, cutCardLengthFromBottom) {
        this.decks = decks;
        this.cutCardLengthFromBottom = cutCardLengthFromBottom;
        this.cards = [];
    }

  /**
   * Re-shuffles the cards array to reuse the shoe
   * @param {number} cutCardLengthFromBottom - Count of cards after the cut
   *   card
   */
  reshuffle(cutCardLengthFromBottom) {
    this.cutCardLengthFromBottom = cutCardLengthFromBottom;
    this.shuffle();
  }

    /**
     * Creates the cards array
     */
    createDecks() {
        for (let i = 0; i < this.decks; i++) {
            for (let j = 0; j < 52; j++) {
                this.cards.push(this.createCard(j));
            }
        }
    }

    /**
     * Shuffles the cards array
     */
    shuffle() {
        shuffleArray(this.cards);
        this.cardIndex = 0;
    }

    /**
     * Draws the next card
     * @return {Card} Card drawn
     */
    draw() {
        if (this.cards.length === 0 ||
            this.cardIndex === null ||
            this.cardIndex >= this.cards.length) {
            this.shuffle();
        }

        let card = this.cards[this.cardIndex];
        this.cardIndex += 1;
        return card;
    }

    /**
     * To string
     * @return {string} String representation of the shoe
     */
    toString() {
        return `[${this.cards.map((c) => c.toString()).join(', ')}]`;
    }

    /**
     * Creates a card from the value passed in
     * @param {number} value - The integer value to be converted
     * @return {Card} Card created
     */
    createCard(value) {
        const suit = Math.floor(value / 13);
        const cardValue = value % 13;

        let suitString = Card.DefaultSuits[suit];
        let valueString = Card.DefaultValues[cardValue];

        return new Card(suitString, valueString);
    }
}

module.exports = Shoe;
