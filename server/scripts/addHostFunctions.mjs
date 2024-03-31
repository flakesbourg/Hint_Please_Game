import GameState from "./game/GameState.mjs";
import { updateGameState, getGameIdFromSocket } from "./socketFunctions.mjs";

export function addHostFunctions(socket, gameRooms, io) {
    socket.on("createGame", () => {
        const gameId = "" + Math.round(Math.random() * 1000);
        let gameState = new GameState('./scripts/testData/test.json');
        socket.join(gameId);
        gameRooms.set(gameId, {host: socket, gameState: gameState, players: new Set()});
        updateGameState(socket, gameRooms, io);
    });

    socket.on("nextRound", () => {
        let gameId = getGameIdFromSocket(socket, io);
        let game = gameRooms.get(gameId);

        if (game) {
            try {
                game.gameState.nextRound();
                updateGameState(socket, gameRooms, io);
            } catch (error) {
                socket.emit("error", error.message);
            }
        }
    });
}