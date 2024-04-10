import { socket } from "../../socket";
import React from "react";
import PropTypes from "prop-types";

/**
 * Component that shows the correct Answer of the round
 * and contains a button to start the next round.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.gameState
 * @param {Object} props.gameState.state The current state of the game.
 * @param {Array} props.gameState.state.gameData The Hints and Answers of every round.
 * @param {number} props.gameState.state.currentRound The current round of the game.
 * @returns {JSX.Element} The rendered Component.
 */
function CorrectAnswer({ gameState, correctPlayers }) {
  let answer = gameState.state.gameData[gameState.state.currentRound]["answer"];

  let button = <NextRoundButton correctPlayers={correctPlayers} />;
  if (gameState.state.currentRound + 1 === gameState.state.gameData.length) {
    button = <EndGameButton correctPlayers={correctPlayers} />;
  }
  return (
    <div className="correctAnswerContainer">
      <div className="correctAnswer">
        <h3 className="answer">Answer: {answer}</h3>
      </div>
      {button}
    </div>
  );
}

/**
 * Component that starts the next round on click.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.correctPlayers
 * @returns {JSX.Element} The rendered Component.
 */
function NextRoundButton({ correctPlayers }) {
  function nextRound() {
    socket.emit("nextRound", correctPlayers);
  }

  return (
    <button className="nextRoundButton" onClick={nextRound}>
      Next Round
    </button>
  );
}

/**
 * Component that ends the game on click.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.correctPlayers
 * @returns {JSX.Element} The rendered Component.
 */
function EndGameButton({ correctPlayers }) {
  function endGame() {
    socket.emit("endGame", correctPlayers);
  }

  return (
    <button className="nextRoundButton" onClick={endGame}>
      End Game
    </button>
  );
}

CorrectAnswer.propTypes = {
  correctPlayers: PropTypes.array.isRequired,
  gameState: PropTypes.shape({
    state: PropTypes.shape({
      gameData: PropTypes.array.isRequired,
      currentRound: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

NextRoundButton.propTypes = {
  correctPlayers: PropTypes.array.isRequired,
};

EndGameButton.propTypes = {
  correctPlayers: PropTypes.array.isRequired,
};

export default CorrectAnswer;
