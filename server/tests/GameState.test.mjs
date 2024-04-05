import GameState from '../scripts/game_logic/GameState.mjs';
import Player from '../scripts/game_logic/Player.mjs';

describe('GameState', () => {
  /**
   * @type {GameState}
   */
  let gameState;

  beforeEach(() => {
    gameState = new GameState('./scripts/testData/test.json');
  });

  describe('.addPlayer()', () => {
    test('defines a function', () => {
      expect(typeof gameState.addPlayer).toBe('function');
    });

    test('call addPlayer without arguments', () => {
      expect(() => gameState.addPlayer()).toThrow(Error);
    });

    test('call addPlayer with wrong argument', () => {
      expect(() => gameState.addPlayer('string')).toThrow(Error);
    });

    test('call addPlayer with an argument', () => {
      const player = new Player('name');
      expect(() => gameState.addPlayer(player)).not.toThrow(Error);
      expect(gameState.players.length).toBe(1);
    });

    test('call addPlayer with a second player with the same name', () => {
      const player1 = new Player('name');
      const player2 = new Player('name');
      expect(() => gameState.addPlayer(player1)).not.toThrow(Error);
      expect(() => gameState.addPlayer(player2)).toThrow(Error);
      expect(gameState.players.length).toBe(1);
    });

    test('call addPlayer with distinct arguments', () => {
      const player1 = new Player('name1');
      const player2 = new Player('name2');
      expect(() => gameState.addPlayer(player1)).not.toThrow(Error);
      expect(() => gameState.addPlayer(player2)).not.toThrow(Error);
      expect(gameState.players.length).toBe(2);
    });
  });

  describe('.getPlayer(name)', () => {
    test('defines a function', () => {
      expect(typeof gameState.getPlayer).toBe('function');
    });

    test('call getPlayer with existing player', () => {
      const player = new Player('name');
      gameState.addPlayer(player);
      expect(gameState.getPlayer('name')).toBe(player);
    });

    test('call getPlayer with not existing players name', () => {
      expect(gameState.getPlayer('name')).toBeUndefined();
    });

    test('call getPlayer without argument', () => {
      expect(gameState.getPlayer()).toBeUndefined();
    });
  });

  describe('.playerBuysHint(name, hintnumber)', () => {
    test('defines a function', () => {
      expect(typeof gameState.playerBuysHint).toBe('function');
    });

    test('call playerBuysHint without an argument', () => {
      const player = new Player('name');
      const balance = player.balance;

      gameState.addPlayer(player);

      expect(() => gameState.playerBuysHint()).toThrow(Error);
      expect(player.hints[0]).toBeUndefined();
      expect(player.balance).toBe(balance);
    });

    test('call playerBuysHint with one argument', () => {
      const player = new Player('name');
      const balance = player.balance;

      gameState.addPlayer(player);

      expect(() => gameState.playerBuysHint('name')).toThrow(Error);
      expect(player.hints[0]).toBeUndefined();
      expect(player.balance).toBe(balance);
    });

    test('call playerBuysHint one time with two valid arguments', () => {
      const player = new Player('name');
      const hintNumber = 0;
      const balance = player.balance;

      gameState.addPlayer(player);

      expect(() => gameState.playerBuysHint('name', hintNumber)).not.toThrow(Error);
      expect(player.hints[0]).toEqual({ category: gameState.gameData[gameState.currentRound].hints[hintNumber].category, hint: gameState.gameData[gameState.currentRound].hints[hintNumber].hint });
      expect(player.balance).toBe(balance - gameState.gameData[gameState.currentRound].hints[hintNumber].price);
    });

    test('call playerBuysHint with unvalid playerName', () => {
      const player = new Player('name');
      const hintNumber = 0;
      const balance = player.balance;

      gameState.addPlayer(player);

      expect(() => gameState.playerBuysHint('unvalid_name', hintNumber)).toThrow(Error);
      expect(player.hints[0]).toBeUndefined();
      expect(player.balance).toBe(balance);
    });

    test('call playerBuysHint with unvalid hintNumber', () => {
      const player = new Player('name');
      const hintNumber = -1;
      const balance = player.balance;

      gameState.addPlayer(player);

      expect(() => gameState.playerBuysHint('name', hintNumber)).toThrow(Error);
      expect(player.hints[0]).toBeUndefined();
      expect(player.balance).toBe(balance);
    });

    test('call playerBuysHint too often', () => {
      const player = new Player('name');
      const hintNumber = 0;

      gameState.addPlayer(player);

      expect(() => gameState.playerBuysHint('name', hintNumber)).not.toThrow(Error);
      expect(() => gameState.playerBuysHint('name', hintNumber)).not.toThrow(Error);
      expect(() => gameState.playerBuysHint('name', hintNumber)).toThrow(Error);
    });

    test('call playerBuysHint but balance too low', () => {
      const player = new Player('name');
      const hintNumber = 0;

      gameState.addPlayer(player);

      expect(() => gameState.playerBuysHint('name', hintNumber)).not.toThrow(Error);
      expect(player.balance).toBe(8);
      expect(() => gameState.playerBuysHint('name', hintNumber)).not.toThrow(Error);
      expect(player.balance).toBe(6);
      gameState.nextRound();
      expect(() => gameState.playerBuysHint('name', hintNumber)).not.toThrow(Error);
      expect(player.balance).toBe(2);
      expect(() => gameState.playerBuysHint('name', hintNumber)).toThrow(Error);
      expect(player.balance).toBe(2);
    });
  });

  describe('.getBalanceOfPlayer(name)', () => {
    test('defines a function', () => {
      expect(typeof gameState.getBalanceOfPlayer).toBe('function');
    });

    test('get Balance of existing player', () => {
      const player = new Player('name');
      gameState.addPlayer(player);
      expect(gameState.getBalanceOfPlayer('name')).toBe(10);
      player.balance = 5;
      expect(gameState.getBalanceOfPlayer('name')).toBe(5);
    });

    test('get Balance of nonexistent player', () => {
      expect(gameState.getBalanceOfPlayer('name')).toBeUndefined();
    });
  });

  describe('.playerMakesGuess(name, guess)', () => {
    test('defines a function', () => {
      expect(typeof gameState.playerMakesGuess).toBe('function');
    });

    test('call without arguments', () => {
      expect(() => gameState.playerMakesGuess()).toThrow(Error);
    });

    test('call with one argument', () => {
      expect(() => gameState.playerMakesGuess('name')).toThrow(Error);
    });

    test('call with unvalid player', () => {
      const player = new Player('name');
      gameState.addPlayer(player);
      expect(() => gameState.playerMakesGuess('unvalid_name', 'guess')).toThrow(Error);
    });

    test('call with valid player', () => {
      const player = new Player('name');
      gameState.addPlayer(player);
      expect(() => gameState.playerMakesGuess('name', 'guess')).not.toThrow(Error);
    });

    test('call with unvalid guess', () => {
      const player = new Player('name');
      gameState.addPlayer(player);
      expect(() => gameState.playerMakesGuess('name', 2)).toThrow(Error);
    });
  });

  describe('.playerIsCorrect(name)', () => {
    test('describe a function', () => {
      expect(typeof gameState.playerIsCorrect).toBe('function');
    });

    test('call without argument', () => {
      expect(() => gameState.playerIsCorrect()).toThrow(Error);
    });

    test('call with unvalid name', () => {
      const player = new Player('name');
      const balance = player.balance;
      gameState.addPlayer(player);

      expect(() => gameState.playerIsCorrect('unvalid_name')).toThrow(Error);
      expect(player.balance).toBe(balance);
    });

    test('call with valid name', () => {
      const player = new Player('name');
      const balance = player.balance;
      gameState.addPlayer(player);

      expect(() => gameState.playerIsCorrect('name')).not.toThrow(Error);
      expect(player.balance).toBe(balance + 15);
    });
  });

  describe('.nextRound()', () => {
    test('describe a function', () => {
      expect(typeof gameState.nextRound).toBe('function');
    });

    test('call once', () => {
      const player = new Player('name');
      gameState.addPlayer(player);
      gameState.playerBuysHint('name', 0);
      gameState.playerMakesGuess('name', 'guess');
      gameState.playerIsCorrect('name');

      expect(player.hints.length).toBe(1);
      expect(gameState.currentRound).toBe(0);

      gameState.nextRound();

      expect(player.hints.length).toBe(0);
      expect(gameState.currentRound).toBe(1);
    });

    test('call function too often', () => {
      const player = new Player('name');
      const gameDataLength = gameState.gameData.length;

      gameState.addPlayer(player);
      gameState.playerBuysHint('name', 0);
      gameState.playerMakesGuess('name', 'guess');
      gameState.playerIsCorrect('name');

      expect(player.hints.length).toBe(1);
      expect(gameState.currentRound).toBe(0);

      for (let i = 0; i < gameDataLength - 1; i++) {
        gameState.nextRound();
      }

      expect(() => gameState.nextRound()).toThrow(Error);

      expect(player.hints.length).toBe(0);
      expect(gameState.currentRound).toBe(gameDataLength - 1);
    });
  });
});
