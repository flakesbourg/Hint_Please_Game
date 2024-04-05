import express from 'express';
import { logger } from './scripts/logger.mjs';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { removeSocket } from './scripts/socketFunctions.mjs';
import { addPlayerFunctions } from './scripts/addPlayerFunctions.mjs';
import { addHostFunctions } from './scripts/addHostFunctions.mjs';

const app = express();
app.use(bodyParser);

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
