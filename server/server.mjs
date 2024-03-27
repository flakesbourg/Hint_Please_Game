import express from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import GameState from "./scripts/GameState.mjs";
import Player from "./scripts/Player.mjs";

const app = express();
app.use(bodyParser);

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

const gameRooms = new Map();

io.sockets.on("connection", (socket) => {
    socket.on("createGame", () => {
        const gameId = "" + Math.round(Math.random() * 1000);
        let gameState = new GameState('./scripts/testData/test.json');
        socket.join(gameId);
        gameRooms.set(gameId, {host: socket, gameState: gameState, players: new Set()});
        socket.emit("gameCreated", {gameId: gameId, gameState: gameState});
    });

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
            updateGameState(socket);
        } catch (error) {
            socket.emit("error", error.message);
        }
    });

    socket.on('disconnect', () => {
        const gameId = getGameIdFromSocket(socket);
        if (!gameId) return;

        const gameRoom = gameRooms.get(gameId);

        if (!gameRoom) return;

        if (gameRoom.host === socket) {
            // Wenn der Host das Spiel verlässt, alle anderen Benutzer benachrichtigen
            gameRoom.players.forEach((player) => {
                player.socket.emit("hostLeft");
            });
            gameRooms.delete(gameId); // Spiel aus der Liste der aktiven Spiele entfernen
        } else {
            // Wenn ein Spieler das Spiel verlässt, den Host benachrichtigen
            gameRoom.players.forEach((player) => {
                if (player.socket === socket) {
                    gameRoom.players.delete(socket);
                }
            });
            gameRoom.host.emit('playerLeft', socket.id);
        }
    });
});

httpServer.listen(PORT);

function getGameIdFromSocket(socket) {
    const rooms = io.sockets.adapter.rooms;
    for (const roomId of rooms.keys()) {
        if (roomId != socket.id && rooms.get(roomId).has(socket.id)) {
            return roomId;
        }
    }
    return null;
}

function updateGameState(socket) {
    let gameId = getGameIdFromSocket(socket);
    let game = gameRooms.get(gameId);

    if (game) {
        let hints = game.gameState.getHints();
        game.host.emit("hostGameStateUpdated", game.gameState);
        game.players.forEach((player) => {
            let otherPlayers = game.gameState.getAllOtherPlayers(player.name);
            console.log(otherPlayers);
            player.socket.emit("playerGameStateUpdated", {player: game.gameState.getPlayer(player.name), gameId: gameId, players: otherPlayers, hints: hints});
        });
    }
}