import './App.css';
import React, {useState, useEffect} from "react";
import { socket } from "./socket";
import { ConnectionManager } from './components/ConnectionManager';
import { ConnectionState } from './components/ConnectionState';
import { JoinGame } from './components/JoinGame';
import { CreateRoom } from './components/CreateRoom';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [role, setRole] = useState("");

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

  return (
    <div className="App">
      <ConnectionState isConnected={ isConnected } />
      <ConnectionManager />
      <JoinGame />
      <CreateRoom />
    </div>
  );
}

export default App;
