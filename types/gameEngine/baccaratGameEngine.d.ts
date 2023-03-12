export = BaccaratGameEngine;
/**
 * Plays a baccarat game according to Punto Banco rules
 */
declare class BaccaratGameEngine {
    /**
     * BaccaratGameEngine
     * @param {number} decks - Count of decks to be included in the shoe
     * @param {number} cutCardLengthFromBottom - Count of cards after the cut card
     * @constructor
     */
    constructor(decks?: number, cutCardLengthFromBottom?: number);
    /**
     * Can another game be played without creating another deck.
     */
    get isBurnNeeded(): boolean;
    resultsEngine: BaccaratResultsEngine;
    shoe: Shoe;
    hand: Hand;
    /**
     * Re-shuffles the shoe
     * @param {number} cutCardLengthFromBottom - Count of cards after the cut
     *   card
     */
    reshuffle(cutCardLengthFromBottom?: number): void;
    /**
     * Performs a burn operation
     * @return {Card} Burn indicator card
     * @return {Card[]} Burn cards
     */
    burnCards(): any;
    nextGameOutcome(): string;
    /**
     * Performs a game
     */
    dealGame(): void;
}
import BaccaratResultsEngine = require("../baccaratResultsEngine.js");
import Shoe = require("../shoe.js");
import Hand = require("../hand.js");
