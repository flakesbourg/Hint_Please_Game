/**
 * This class defines players in a game of "Hint Please!".
 * Every player has a name, a balance, array of hints and a guess.
 */
export default class Player {
  /**
   * Create a player with a certain name.
   * @param {string} name name of the created player.
   */
  constructor (name) {
    this.name = name;
    this.balance = 10;
    this.hints = [];
    this.guess = '';
  }

  /**
   * Change the Balance by the given value.
   * @param {number} value the value by which the balance should be changed.
   */
  changeBalance (value) {
    this.balance += value;
  }
}
