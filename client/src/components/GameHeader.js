import React from "react";
import PropTypes from "prop-types";

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
function PlayerHeader({currentRound, gameId}) {
    return (
        <div className="playerHeader">
            <h2 className="playerHeadline">Hint Please!</h2>
            <h2 className="playerHeadline">Round: {currentRound}</h2>
            <h2 className="playerHeadline">GameID: {gameId}</h2>
        </div>
    )
}

PlayerHeader.propTypes = {
    currentRound: PropTypes.number.isRequired,
    gameId: PropTypes.string.isRequired
};

export default PlayerHeader;