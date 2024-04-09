import { logger } from '../logger.mjs';

export function getGameIdFromSocket (socket, io) {
  const rooms = io.sockets.adapter.rooms;
  for (const roomId of rooms.keys()) {
    if (roomId !== socket.id && rooms.get(roomId).has(socket.id)) {
      return roomId;
    }
  }
  return null;
}

export function updateGameState (socket, gameRooms, io) {
  const gameId = getGameIdFromSocket(socket, io);
  const game = gameRooms.get(gameId);

  if (game) {
    const hints = game.gameState.getHints();
    game.host.emit('hostGameStateUpdated', { gameId, state: game.gameState });
    game.players.forEach((player) => {
      const otherPlayers = game.gameState.getAllOtherPlayers(player.name);
      player.socket.emit('playerGameStateUpdated', { gameId, round: game.gameState.currentRound, player: game.gameState.getPlayer(player.name), players: otherPlayers, hints });
    });
  }
}

export function removeSocket (socket, gameRooms, io) {
  const gameId = getGameIdFromSocket(socket, io);
  if (!gameId) return;

  const gameRoom = gameRooms.get(gameId);

  if (!gameRoom) return;

  if (gameRoom.host === socket) {
    // Wenn der Host das Spiel verlässt, alle anderen Benutzer benachrichtigen
    gameRoom.players.forEach((player) => {
      player.socket.leave(gameId);
      player.socket.emit('hostLeft');
    });
    gameRooms.delete(gameId); // Spiel aus der Liste der aktiven Spiele entfernen
    logger.info(`game "${gameId}": host "${socket.id}" left the game`);
  } else {
    // Wenn ein Spieler das Spiel verlässt, den Host benachrichtigen
    gameRoom.players.forEach((player) => {
      if (player.socket === socket) {
        gameRoom.players.delete(player);
        gameRoom.gameState.players = gameRoom.gameState.players.filter((item) => {
          return item !== gameRoom.gameState.getPlayer(player.name);
        });
        socket.emit('leftGame');
        logger.info(`game "${gameId}": player "${socket.id}" left the game`);
      }
    });
    updateGameState(gameRoom.host, gameRooms, io);
  }
}
