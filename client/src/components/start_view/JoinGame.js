import React, { useState } from "react";
import { socket } from "../../socket";

/**
 * Form component which takes a name and a game id to join
 * the corresponding game as player.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function JoinGame() {
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    socket.emit("joinGame", { name: playerName, gameId: gameId });
  }

  return (
    <form className="joinForm" onSubmit={onSubmit}>
      <h2>Join an existing Game</h2>
      <input
        className="joinInput"
        placeholder="Player Name"
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <input
        className="joinInput"
        placeholder="GameID"
        onChange={(e) => setGameId(e.target.value)}
      />
      <button className="button" type="submit">
        join
      </button>
    </form>
  );
}

export default JoinGame;
