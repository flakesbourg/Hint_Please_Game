import { getGameIdFromSocket, updateGameState } from './socketFunctions.mjs';
import Player from '../game_logic/Player.mjs';
import { logger } from '../logger.mjs';

export function addPlayerFunctions (socket, gameRooms, io) {
  socket.on('joinGame', (data) => {
    const gameRoom = gameRooms.get(data.gameId);

    if (!gameRoom) {
      logger.error(`socket "${socket.id}" tried to join non-existing game ${data.gameId}`);
      socket.emit('error', 'room not found');
      return;
    }

    if (!data.name) {
      logger.error(`socket "${socket.id}" tried to join game ${data.gameId} with unvalid name`);
      socket.emit('error', 'name unvalid');
      return;
    }

    try {
      gameRoom.gameState.addPlayer(new Player(data.name));
      socket.join(data.gameId);
      gameRoom.players.add({ socket, name: data.name });
      logger.info(`game "${data.gameId}": socket "${socket.id} joined as ${data.name}`);
      updateGameState(socket, gameRooms, io);
    } catch (error) {
      logger.error(`game "${data.gameId}: "socket "${socket.id}" tried to join game --- ${error.message}`);
      socket.emit('error', error.message);
    }
  });

  socket.on('makeGuess', (data) => {
    const [gameId, gameRoom] = getGameRoomFromSocket(socket, io, gameRooms);

    if (!gameId || !gameRoom) return;

    let name;
    gameRoom.players.forEach((elem) => {
      if (elem.socket === socket) {
        name = elem.name;
      }
    });

    try {
      gameRoom.gameState.playerMakesGuess(name, data);
      updateGameState(socket, gameRooms, io);
    } catch (error) {
      logger.error(`game "${data.gameId}: "socket "${socket.id}" tried to make a guess --- ${error.message}`);
      socket.emit('error', error.message);
    }
  });

  socket.on('playerBuysHint', (data) => {
    const [gameId, gameRoom] = getGameRoomFromSocket(socket, io, gameRooms);

    if (!gameId || !gameRoom) return;

    let name;
    gameRoom.players.forEach((elem) => {
      if (elem.socket === socket) {
        name = elem.name;
      }
    });

    try {
      gameRoom.gameState.playerBuysHint(name, data);
      logger.info(`game "${gameId}": socket "${socket.id} buys hint`);
      updateGameState(socket, gameRooms, io);
    } catch (error) {
      logger.error(`game "${data.gameId}: "socket "${socket.id}" tried to buy a hint --- ${error.message}`);
      socket.emit('error', error.message);
    }
  });
}

function getGameRoomFromSocket(socket, io, gameRooms) {
  const gameId = getGameIdFromSocket(socket, io);
  if (!gameId) {
    logger.error(`socket "${socket.id}" isnt playing a game`);
    socket.emit("error", "player isnt playing a game");
    return [null, null];
  }

  const gameRoom = gameRooms.get(gameId);

  if (!gameRoom) {
    logger.error(`socket "${socket.id}": game room doesnt exist`);
    socket.emit('error', 'room not found');
    return [null, null];
  }

  return [gameId, gameRoom];
}
