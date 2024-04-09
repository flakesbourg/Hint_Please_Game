import Player from './Player.mjs';
import fs from 'fs';

/**
 * Represents the current state of a game of "Hint Please!".
 * In this game every player needs to guess a game using hints that a
 * player can buy with the available balance.
 */
class GameState {
  /**
   * Creates a new game of "Hint Please!"
   * @param {string} gameDataPath a valid path to a json file containing the game data.
   */
  constructor (gameDataPath) {
    this.players = [];
    this.currentRound = 0;
    this.gameData = JSON.parse(fs.readFileSync(gameDataPath).toString());
  }

  /**
   * Adds a new player to the game.
   * @param {Player} player the player to be added.
   * @throws an Error if the player is Undefined.
   * @throws an Error if the argument is not an instance of Player.
   * @throws an Error if a player with the same name already exists.
   */
  addPlayer (player) {
    if (!player) { throw new Error('this player is undefined'); }

    if (!(player instanceof Player)) { throw new Error('argument is not an instance of class Player'); }

    if (this.players.find((elem) => elem.name === player.name)) { throw new Error('Player with this name already exists'); }

    this.players.push(player);
  }

  /**
   * Returns a player with the given name.
   * @param {string} name name of the wanted player.
   * @returns {Player} Returns a player or undefined.
   */
  getPlayer (name) {
    return this.players.find((elem) => elem.name === name);
  }

  /**
   * Returns the balance of the player with the given name.
   * @param {string} name name of the wanted player.
   * @returns {(number|undefined)} Returns the balance of the player with the given name or undefined
   */
  getBalanceOfPlayer (name) {
    const player = this.getPlayer(name);
    return player ? player.balance : undefined;
  }

  /**
   * Starts the next round if possible. It also clears 
   * every hint and guess of every player.
   * @throws an Error if the last round is already reached.
   */
  nextRound () {
    if (this.currentRound + 1 >= this.gameData.length) { throw new Error('already the last round'); }

    this.currentRound++;
    this.players.forEach((player) => {
      player.hints = [];
      player.guess = '';
      player.hintNumbers = [];
    });
  }

  /**
   * Player buys a hint with the available balance. The balance gets reduced
   * and the hint will be added to the player if possible.
   * @param {string} name name of the wanted player.
   * @param {number} hintNumber index of the wanted hint.
   * @throws an Error if the wanted hint is unvalid.
   * @throws an Error if the wanted player is unvalid.
   * @throws an Error if the player already bought two hints.
   * @throws an Error if the player doesnt have enough money.
   */
  playerBuysHint (name, hintNumber) {
    const hint = this.gameData[this.currentRound].hints[hintNumber];
    const player = this.getPlayer(name);

    if (!hint) { throw new Error('hint is unvalid'); }

    if (!player) { throw new Error('player is unvalid'); }

    if (player.hintNumbers.includes(hintNumber)) { throw new Error('player cant buy the same hint twice'); }

    if (player.hints.length >= 2) { throw new Error('player cant buy another hint'); }

    const price = hint.price;

    if (player.balance < price) { throw new Error('player doesnt have enough money'); }

    player.changeBalance(-price);
    player.hints.push({ category: this.gameData[this.currentRound].hints[hintNumber].category, hint: this.gameData[this.currentRound].hints[hintNumber].hint });
    player.hintNumbers.push(hintNumber);
  }

  /**
   * Adds 15 to the balance of the given player.
   * @param {string} name name of the wanted player.
   * @throws an Error if the wanted player is unvalid.
   */
  playerIsCorrect (name) {
    const player = this.getPlayer(name);

    if (!player) { throw new Error('player is unvalid'); }

    player.balance += 15;
  }

  /**
   * Player makes a guess to what the wanted game is.
   * @param {string} name name of the wanted player.
   * @param {string} guess guess made by the player.
   * @throws an Error if the player is unvalid.
   * @throws an Error if the guess isnt a string.
   */
  playerMakesGuess (name, guess) {
    const player = this.getPlayer(name);
    guess = guess.trim();

    if (!player) { throw new Error('player is unvalid'); }

    if (typeof guess !== 'string') { throw new Error('guess is unvalid'); }

    if (!guess) { guess = ''; }

    player.guess = guess;
  }

  /**
   * Get the category and price of every hint of the current round.
   * @returns {Array} an Array of dictionaries with the category and price of every hint.
   */
  getHints () {
    const hints = this.gameData[this.currentRound].hints;
    const result = [];

    for (let i = 0; i < hints.length; i++) {
      result.push({ category: this.gameData[this.currentRound].hints[i].category, price: this.gameData[this.currentRound].hints[i].price, hintNumber: i });
    }

    return result;
  }

  /**
   * Get all players except the player with the given name.
   * @param {string} name name of the wanted player.
   * @returns {Array} an Array with dictionaries containing the name and balance of every player except the given.
   */
  getAllOtherPlayers (name) {
    const result = [];
    this.players.forEach((elem) => {
      if (elem.name !== name) {
        result.push({ name: elem.name, balance: elem.balance });
      }
    });

    return result;
  }
}

export default GameState;
