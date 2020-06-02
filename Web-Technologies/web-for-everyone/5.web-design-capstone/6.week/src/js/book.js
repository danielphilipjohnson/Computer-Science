/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {}

/**
 * Solves equations of the form a * x = b
 * @example <caption>Example usage of method1.</caption>
 * // returns 2
 * globalNS.method1(5, 10);
 * @returns {Number} Returns the value of x for the equation.
 */
globalNS.method1 = function(a, b) {
    return b / a;
};

/**
 * Set the shoe's color. Use {@link Shoe#setSize} to set the shoe size.
 *
 * @param {string} color - The shoe's color.
 */
Shoe.prototype.setColor = function(color) {
    // ...
};

/**
 * The Thingy class is available to all.
 * @public
 * @class
 */
function Thingy() {
    /**
     * The Thingy~foo member. Note that 'foo' is still an inner member
     * of 'Thingy', in spite of the @public tag.
     * @public
     */
    var foo = 0;
}