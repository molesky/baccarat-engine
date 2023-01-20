export = RoadmapGenerator;
/**
 * Generator for common baccarat roadmaps.
 */
declare class RoadmapGenerator {
    /**
     * Calculates a bead plate based on games played.
     * @param {GameResult[]} gameResults The game results to
     *  calculate the roadmap from.
     * @param {BeadPlateConfig} config The configuration object for drawing options.
     * @return {BeadPlate} A data representation of how a bead plate can
     *  be drawn from this calculation.
     */
    beadPlate(gameResults: GameResult[], { columns, rows }: any): any;
    /**
     * Calculates a big road based on games played.
     * @param {GameResult[]} gameResults The game results to calculate the
     *  roadmap from.
     * @param {Object} config The configuration object for drawing options.
     * @return {Object} A data representation of how a big road can
     *  be drawn from this calculation.
     */
    bigRoad(gameResults?: GameResult[], { columns, rows, scroll }?: any): any;
    /**
     * Big road column definitions
     * @private
     * @param {BigRoad} bigRoad The big road data
     * @return {ColumnDictionary} Map of columns
     */
    private bigRoadColumnDefinitions;
    /**
     * Derived road using the given cycle
     * @private
     * @param {BigRoad} bigRoad The big road data
     * @param {int} cycleLength Cycle used to calculate the derived road
     * @return {DerivedRoad} A new list of derived road items (i.e., list of red/blue)
     */
    private derivedRoad;
    /**
     * Generates the big eye road - derived road with a cycle of 1
     * @public
     * @param {BigRoad} bigRoad The big road data
     * @return {BigEyeRoad} A new list of derived road items
     */
    public bigEyeRoad(bigRoad: any): any;
    /**
     * Generates the small road - derived road with a cycle of 2
     * @public
     * @param {BigRoad} bigRoad The big road data
     * @return {SmallRoad} A new list of derived road items
     */
    public smallRoad(bigRoad: any): any;
    /**
     * Generates the cockroach pig - derived road with a cycle of 3
     * @public
     * @param {BigRoad} bigRoad The big road data
     * @return {CockroachPigRoad} A new list of derived road items
     */
    public cockroachPig(bigRoad: any): any;
    /**
     * Scrolls the big road drawing to only show the specified amount of
     * drawing columns.
     * @private
     * @param {GameResult[]} results The big road data
     * @param {number} highestDrawingColumn The highest column reached in
     * the big road supplied.
     * @param {number} drawingColumns The amount of columns to show in the
     * big road
     * @return {BigRoad} A new list of big road items whose view is scrolled
     * to have the amount of drawing columns visible.
     */
    private scrollBigRoad;
    /**
     * Generates the column number for the game number of a game based
     * on the column size of the table to be drawn.
     * @private
     * @param {number} gameNumber The game number of the item in the sequence.
     * @param {number} columnSize The column size of the drawn table
     * @return {number} The column number that this gameNumber is drawn to.
     */
    private columnForGameNumber;
    /**
     * Generates the row number for the game number of a game based
     * on the column size of the table to be drawn.
     * @private
     * @param {number} gameNumber The game number of the item in the sequence.
     * @param {number} columnSize The column size of the drawn table
     * @return {number} The row number that this gameNumber is drawn to.
     */
    private rowForGameNumber;
}
import GameResult = require("../gameResult.js");
