import express from "express";
import bodyParser from "body-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import { getGameIdFromSocket } from "./scripts/socketFunctions.mjs";
import { addPlayerFunctions } from "./scripts/addPlayerFunctions.mjs";
import { addHostFunctions } from "./scripts/addHostFunctions.mjs";

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
    addPlayerFunctions(socket, gameRooms, io);

    addHostFunctions(socket, gameRooms, io);

    socket.on('disconnect', () => {
        const gameId = getGameIdFromSocket(socket, io);
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