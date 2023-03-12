/* eslint-disable max-len */
'use strict';

const Hand = require('../hand.js');
const BaccaratResultsEngine = require('../baccaratResultsEngine.js');
const Shoe = require('../shoe.js');

/**
 * Plays a baccarat game according to Punto Banco rules
 */
class BaccaratGameEngine {
  /**
   * Can another game be played without creating another deck.
   */
  get isBurnNeeded() {
    return this.shoe.cutCardReached;
  }

  /**
   * BaccaratGameEngine
   * @param {number} decks - Count of decks to be included in the shoe
   * @param {number} cutCardLengthFromBottom - Count of cards after the cut card
   * @constructor
   */
  constructor(decks = 8, cutCardLengthFromBottom = 16) {
    this.resultsEngine = new BaccaratResultsEngine();
    this.shoe = new Shoe(decks, cutCardLengthFromBottom);
    this.hand = new Hand();
    this.burnCard = null;
    this.additionalBurnCards = [];
  }

  /**
   * Re-shuffles the shoe
   * @param {number} cutCardLengthFromBottom - Count of cards after the cut
   *   card
   */
  reshuffle(cutCardLengthFromBottom = 16) {
    this.shoe.reshuffle(cutCardLengthFromBottom);
  }

  /**
   * Performs a burn operation
   */
  burnCards() {
    this.burnCard = this.shoe.draw();
    while (this.additionalBurnCards.length > 0) {
      this.additionalBurnCards.pop();
    }

    let burnCardValue = BaccaratResultsEngine.valueForCard(this.burnCard);

    // Face cards & T count for 10 during burn
    if (burnCardValue === 0) burnCardValue = 10;

    for (let i = 0; i < burnCardValue; i++) {
      this.additionalBurnCards.push(this.shoe.draw());
    }
  }

  nextGameOutcome() {
    this.dealGame();
    return this.resultsEngine.calculateOutcome(this.hand);
  }

  /**
   * Performs a game
   */
  dealGame() {
    let pCard1 = this.shoe.draw();
    let bCard1 = this.shoe.draw();
    let pCard2 = this.shoe.draw();
    let bCard2 = this.shoe.draw();

    this.hand.clear();
    this.hand.playerCards.push(pCard1, pCard2);
    this.hand.bankerCards.push(bCard1, bCard2);

    let bankerCardsValue = this.resultsEngine.calculateHandValue(
      this.hand.bankerCards,
    );
    let playerCardsValue = this.resultsEngine.calculateHandValue(
      this.hand.playerCards,
    );

    let bankerDraw = false;

    // Natural (Dealer or Player drew an 8 or 9) - neither side draws, game over.
    if (bankerCardsValue > 7 || playerCardsValue > 7) {
      // Player has 6 or 7 - stands
    } else if (playerCardsValue > 5) {
      // Player stood so dealer draws with [0-5] and stands with 6 or 7
      if (bankerCardsValue <= 5) {
        bankerDraw = true;
      }
      // Player has 0 - 5, draws 3rd card
    } else {
      let player3rdCard = this.shoe.draw();
      this.hand.playerCards.push(player3rdCard);
      let player3rdCardValue =
        BaccaratResultsEngine.valueForCard(player3rdCard);

      switch (player3rdCardValue) {
        case 2:
        case 3:
          // Player has 2, 3 - banker draws 0-4, stands 5-7
          if (bankerCardsValue < 5) bankerDraw = true;
          break;
        case 4:
        case 5:
          // Player has 4, 5 - banker draws 0-5, stands 6-7
          if (bankerCardsValue < 6) bankerDraw = true;
          break;
        case 6:
        case 7:
          // Player has 6, 7 - banker draws 0-6, stands 7
          if (bankerCardsValue < 7) bankerDraw = true;
          break;
        case 8:
          // Player has 8 - banker draws 0-2, stands 3-7
          if (bankerCardsValue < 3) bankerDraw = true;
          break;
        case 9:
        case 0:
        case 1:
          // Player has 9, T/K/Q/J, A - banker draws 0-3, stands 4-7
          if (bankerCardsValue < 4) bankerDraw = true;
          break;
      }
    }

    if (bankerDraw) {
      let banker3rdCard = this.shoe.draw();
      this.hand.bankerCards.push(banker3rdCard);
    }
  }
}

module.exports = BaccaratGameEngine;
