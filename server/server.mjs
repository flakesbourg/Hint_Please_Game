import express from 'express';
import { logger } from './scripts/logger.mjs';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { removeSocket } from './scripts/socket_functions/socketFunctions.mjs';
import { addPlayerFunctions } from './scripts/socket_functions/addPlayerFunctions.mjs';
import { addHostFunctions } from './scripts/socket_functions/addHostFunctions.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express();
app.use(express.static(path.resolve(__dirname, "./build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build", "index.html"));
});

const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
const io = new Server(httpServer, {
  transports: ['websocket'],
  upgrade: false,
  cors: {
    origin: '*'
  }
});

const gameRooms = new Map();

io.sockets.on('connection', (socket) => {
  logger.info(`socket "${socket.id}" connected`);

  addPlayerFunctions(socket, gameRooms, io);

  addHostFunctions(socket, gameRooms, io);

  socket.on('leaveGame', () => {
    removeSocket(socket, gameRooms, io);
  });

  socket.on('disconnect', () => {
    logger.info(`socket "${socket.id}" disconnected`);
  });
});

httpServer.listen(PORT);
logger.info(`server listening on port ${PORT}`);
