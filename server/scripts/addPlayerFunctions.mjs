import { getGameIdFromSocket, updateGameState } from "./socketFunctions.mjs";
import Player from "./game/Player.mjs";

export function addPlayerFunctions (socket, gameRooms, io) {
    socket.on("joinGame", (data) => {
        const gameRoom = gameRooms.get(data.gameId);

        if (!gameRoom) {
            socket.emit("error", "room not found");
            return;
        }

        if (!data.name) {
            socket.emit("error", "name unvalid");
            return;
        }
            
        try{  
            gameRoom.gameState.addPlayer(new Player(data.name));
            socket.join(data.gameId);
            gameRoom.players.add({socket: socket, name: data.name});
            updateGameState(socket, gameRooms, io);
        } catch (error) {
            socket.emit("error", error.message);
        }
    });

    socket.on("playerIsCorrect", (data) => {
        const gameId = getGameIdFromSocket(socket, io);
        if (!gameId) return;

        const gameRoom = gameRooms.get(gameId);

        if (!gameRoom) return;

        if (gameRoom.host === socket) {
            let gameState = gameRoom.gameState;
            try {
                gameState.playerIsCorrect(data);
                updateGameState(socket, gameRooms, io);
            } catch (error) {
                socket.emit("error", error.message);
            }
        }
    });

    socket.on("makeGuess", (data) => {
        const gameId = getGameIdFromSocket(socket, io);
        if (!gameId) return;

        const gameRoom = gameRooms.get(gameId);

        if (!gameRoom) return;

        let name;
        gameRoom.players.forEach((elem) => {
            if (elem.socket === socket) {
                name = elem.name;
            }
        });

        try{
            gameRoom.gameState.playerMakesGuess(name, data);
            updateGameState(socket, gameRooms, io);
        } catch (error) {
            socket.emit("error", error.message);
        }
    });

    socket.on("playerBuysHint", (data) => {
        const gameId = getGameIdFromSocket(socket, io);
        if (!gameId) return;

        const gameRoom = gameRooms.get(gameId);

        if (!gameRoom) return;

        let name;
        gameRoom.players.forEach((elem) => {
            if (elem.socket === socket) {
                name = elem.name;
            }
        });

        try{
            gameRoom.gameState.playerBuysHint(name, data);
            updateGameState(socket, gameRooms, io);
        } catch (error) {
            socket.emit("error", error.message);
        }
    });
}