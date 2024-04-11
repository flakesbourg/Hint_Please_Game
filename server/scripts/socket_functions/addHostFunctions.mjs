import GameState from '../game_logic/GameState.mjs';
import { updateGameState, getGameIdFromSocket } from './socketFunctions.mjs';
import { logger } from '../logger.mjs';

export function addHostFunctions (socket, gameRooms, io) {
  socket.on('createGame', () => {
    const gameId = '' + (Math.round(Math.random() * 90000) + 10000);
    while(gameRooms.get(gameId)) {
      '' + Math.round(Math.random() * 10000);
    }

    logger.info(`socket "${socket.id}" created game "${gameId}"`);
    const gameState = new GameState('./scripts/testData/test.json');
    socket.join(gameId);
    gameRooms.set(gameId, { host: socket, gameState, players: new Set() });
    updateGameState(socket, gameRooms, io);
  });

  socket.on('nextRound', (data) => {
    const gameId = getGameIdFromSocket(socket, io);
    const game = gameRooms.get(gameId);

    if (game) {
      const correctPlayers = data;
      try {
        game.gameState.nextRound(correctPlayers);
        logger.info(`game "${gameId}: "socket "${socket.id}" started next round (${game.gameState.currentRound})`);
        updateGameState(socket, gameRooms, io);
      } catch (error) {
        logger.error(`game "${gameId}: "socket "${socket.id}" tried to start next round --- ${error.message}`);
        socket.emit('error', error.message);
      }
    }
  });

  socket.on("endGame", (data) => {
    const gameId = getGameIdFromSocket(socket, io);
    const game = gameRooms.get(gameId);

    if (game && game.host === socket) {
      const correctPlayers = data;
      try {
        let ranking = game.gameState.endGame(correctPlayers);
        logger.info(`game "${gameId}: "socket "${socket.id}" ended the game (${game.gameState.currentRound})`);
        socket.emit("gameEnded", {ranking: ranking, gameId: gameId});
        game.players.forEach((player) => {
          player.socket.leave(gameId);
          player.socket.emit('gameEnded', {ranking: ranking, gameId: gameId});
        });
        game.host.leave(gameId);
        gameRooms.delete(gameId);
      } catch (error) {
        logger.error(`game "${gameId}: "socket "${socket.id}" tried to end the game --- ${error.message}`);
        socket.emit('error', error.message);
      }
    }
  });
}
