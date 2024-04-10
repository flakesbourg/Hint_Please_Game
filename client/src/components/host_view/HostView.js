import React, { useState } from "react";
import PlayerComponent from "./PlayerComponent";
import GameHeader from "../common/GameHeader";
import CorrectAnswer from "./CorrectAnswer";
import PropTypes from "prop-types";
import "./HostView.css";
import LeaveButton from "../common/LeaveButton";

/**
 * View of the Host of the game.
 *
 * @component
 * @param {object} props
 * @param {object} props.gameState
 * @param {string} props.gameState.gameId ID of the game room.
 * @param {Object} props.gameState.state Current state of the game.
 * @param {number} props.gameState.state.currentRound Current round of the game.
 * @returns {JSX.Element} The rendered Component.
 */
function HostView({ gameState }) {
  const [correctPlayers, setCorrectPlayers] = useState([]);

  return (
    <>
      <GameHeader
        currentRound={gameState.state.currentRound}
        gameId={gameState.gameId}
      />
      <div>
        <CorrectAnswer gameState={gameState} correctPlayers={correctPlayers} />
        <PlayerComponent
          gameState={gameState}
          correctPlayers={correctPlayers}
          setCorrectPlayers={setCorrectPlayers}
        />
        <LeaveButton />
      </div>
    </>
  );
}

HostView.propTypes = {
  gameState: PropTypes.shape({
    gameId: PropTypes.string.isRequired,
    state: PropTypes.shape({
      currentRound: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default HostView;
