export function getGameIdFromSocket(socket, io) {
    const rooms = io.sockets.adapter.rooms;
    for (const roomId of rooms.keys()) {
        if (roomId != socket.id && rooms.get(roomId).has(socket.id)) {
            return roomId;
        }
    }
    return null;
}

export function updateGameState(socket, gameRooms, io) {
    let gameId = getGameIdFromSocket(socket, io);
    let game = gameRooms.get(gameId);

    if (game) {
        let hints = game.gameState.getHints();
        game.host.emit("hostGameStateUpdated", {gameId: gameId, state: game.gameState});
        game.players.forEach((player) => {
            let otherPlayers = game.gameState.getAllOtherPlayers(player.name);
            player.socket.emit("playerGameStateUpdated", {gameId: gameId, round: game.gameState.currentRound, player: game.gameState.getPlayer(player.name), gameId: gameId, players: otherPlayers, hints: hints});
        });
    }
}