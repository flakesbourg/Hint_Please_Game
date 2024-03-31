import './App.css';
import React, {useState, useEffect} from "react";
import { HostView } from './components/host_view/HostView';
import { PlayerView } from './components/player_view/PlayerView';
import { StartView } from './components/start_view/StartView';

function App() {
  const [gameState, setGameState] = useState(null);
  const [playerState, setPlayerState] = useState(null);

  function renderScreen() {
    if (gameState) {
      return (
        <HostView setGameState={setGameState} gameState={gameState} />
      )
    } else if (playerState) {
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
    </div>
  );
}

export default App;
