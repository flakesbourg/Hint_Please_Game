import './App.css';
import React, {useState, useEffect} from "react";
import { socket } from "./socket";
import { ConnectionManager } from './components/ConnectionManager';
import { ConnectionState } from './components/ConnectionState';
import { JoinGame } from './components/JoinGame';
import { CreateRoom } from './components/CreateRoom';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [gameState, setGameState] = useState(null);
  const [playerState, setPlayerState] = useState(null);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnected() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnected);
    }
  }, []);

  function renderScreen() {
    if (gameState) {
      console.log(gameState);
      return (
        <>
        <h1>Ciao</h1>
        </>
      )
    } else if (playerState) {

    } else {
      return (
        <>
          <ConnectionState isConnected={ isConnected } />
          <ConnectionManager />
          <JoinGame setPlayerState={ setPlayerState }/>
          <CreateRoom setGameState={ setGameState }/>
        </>
      );
    }
  }

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
