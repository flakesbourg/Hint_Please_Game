import GameState from '../game_logic/GameState.mjs';
import { updateGameState, getGameIdFromSocket } from './socketFunctions.mjs';
import { logger } from '../logger.mjs';

export function addHostFunctions (socket, gameRooms, io) {
  socket.on('createGame', () => {
    const gameId = '' + Math.round(Math.random() * 1000);
    logger.info(`socket "${socket.id}" created game "${gameId}"`);
    const gameState = new GameState('./scripts/testData/test.json');
    socket.join(gameId);
    gameRooms.set(gameId, { host: socket, gameState, players: new Set() });
    updateGameState(socket, gameRooms, io);
  });

  socket.on('nextRound', () => {
    const gameId = getGameIdFromSocket(socket, io);
    const game = gameRooms.get(gameId);

    if (game) {
      try {
        game.gameState.nextRound();
        logger.info(`game "${gameId}: "socket "${socket.id}" started next round (${game.gameState.currentRound})`);
        updateGameState(socket, gameRooms, io);
      } catch (error) {
        logger.error(`game "${gameId}: "socket "${socket.id}" tried to start next round --- ${error.message}`);
        socket.emit('error', error.message);
      }
    }
  });
}
