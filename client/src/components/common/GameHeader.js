import React from "react";
import PropTypes from "prop-types";
import "./Common.css";

/**
 * This component is the header with information about
 * the game and the current round.
 *
 * @component
 * @param {Object} props
 * @param {number} props.currentRound Current round of the game.
 * @param {string} props.gameId Id of the current game.
 * @returns {JSX.Element} The rendered component.
 */
function GameHeader({ currentRound, gameId }) {
  if (currentRound !== undefined && gameId !== undefined) {
    return (
      <div className="playerHeader">
        <h2 className="playerHeadline">Hint Please!</h2>
        <h2 className="playerHeadline">Round: {currentRound}</h2>
        <h2 className="playerHeadline">GameID: {gameId}</h2>
      </div>
    );
  }

  return (
    <div className="startHeader">
      <h2 className="startHeadline">"Hint Please!" 🔍</h2>
    </div>
  );
}

GameHeader.propTypes = {
  currentRound: PropTypes.number,
  gameId: PropTypes.string,
};

export default GameHeader;
