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
function CorrectAnswer ({gameState}) {
    let answer = gameState.state.gameData[gameState.state.currentRound]["answer"];

    return (
        <div className="correctAnswerContainer">
            <div className="correctAnswer">
                <h3>Correct Answer: </h3>
                <h3 className="answer">{answer}</h3>
            </div>
            <NextRoundButton />
        </div>
    );
}

/**
 * Component that starts the next round on click.
 * 
 * @component
 * @returns {JSX.Element} The rendered Component.
 */
function NextRoundButton () {
    function nextRound() {
        socket.emit("nextRound");
    }

    return (
        <button className="nextRoundButton" onClick={nextRound}>Next Round</button>
    );
}

CorrectAnswer.propTypes = {
    gameState: PropTypes.shape({
        state: PropTypes.shape({
            gameData: PropTypes.array.isRequired,
            currentRound: PropTypes.number.isRequired
        }).isRequired
    }).isRequired
};

export default CorrectAnswer;