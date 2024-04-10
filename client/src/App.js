import "./App.css";
import React, { useState, useEffect } from "react";
import HostView from "./components/host_view/HostView";
import PlayerView from "./components/player_view/PlayerView";
import StartView from "./components/start_view/StartView";
import ResultView from "./components/result_view/ResultView";
import { socket } from "./socket";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [gameState, setGameState] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [gameResult, setGameResult] = useState(null);

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

    socket.on("leftGame", () => {
      setPlayerState(null);
    });

    socket.on("hostLeft", () => {
      setGameState(null);
      setPlayerState(null);
    });

    socket.on("gameEnded", (data) => {
      setGameResult(data);
      setGameState(null);
      setPlayerState(null);
    });

    const handleBeforeUnload = () => {
      // Verbindung zum Socket schließen
      socket.emit("leaveGame");
      socket.disconnect();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      socket.off("error");
      socket.off("playerGameStateUpdated");
      socket.off("hostGameStateUpdated");
      socket.off("leftGame");
      socket.off("hostLeft");
      socket.off("gameEnded");
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  /**
   * Component that renders a certain view depending on gameState and playerState.
   * If the gameState isnt null the HostView will be rendered.
   * If the playerState isnt null the PlayerView will be rendered.
   * Or else the StartView will be rendered.
   *
   * @component
   * @returns {JSX.Element} The rendered view component.
   */
  function renderScreen() {
    if (gameResult) {
      return <ResultView result={gameResult} setResult={setGameResult} />;
    } else if (gameState) {
      return <HostView gameState={gameState} />;
    } else if (playerState) {
      return <PlayerView playerState={playerState} />;
    } else {
      return <StartView />;
    }
  }

  return (
    <div className="App">
      {renderScreen()}
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;
