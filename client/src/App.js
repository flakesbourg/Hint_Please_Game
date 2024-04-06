import './App.css';
import React, {useState, useEffect} from "react";
import { HostView } from './components/host_view/HostView';
import { PlayerView } from './components/player_view/PlayerView';
import { StartView } from './components/start_view/StartView';
import { socket } from './socket';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [gameState, setGameState] = useState(null);
  const [playerState, setPlayerState] = useState(null);

  useEffect(() => {
    socket.on("error", (data) => {
        toast.error(data, {
          position: "bottom-left",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
    });

    socket.on("playerGameStateUpdated", (data) => {
      setPlayerState(data);
    });

    socket.on("hostGameStateUpdated", (data) => {
      setGameState(data);
    });

    const handleBeforeUnload = () => {
      // Verbindung zum Socket schließen
      socket.emit("leaveGame");
      socket.disconnect();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        socket.off("error");
        socket.off("playerGameStateUpdated");
        socket.off("hostGameStateUpdated");
        window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, []);

  function renderScreen() {
    if (gameState) {
      return (
        <HostView setGameState={setGameState} gameState={gameState} />
      )
    } else if (playerState !== null) {
      return (
        <PlayerView setPlayerState={setPlayerState} playerState={playerState} />
      )
    } else {
      return (
        <StartView setPlayerState={ setPlayerState } setGameState={ setGameState } />
      );
    }
  }

  return (
    <div className="App">
      {renderScreen()}
      <ToastContainer position='top-right' />
    </div>
  );
}

export default App;
