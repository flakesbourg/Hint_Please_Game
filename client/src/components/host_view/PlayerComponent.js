import { socket } from "../../socket";
import React from "react";
import PropTypes from "prop-types";

/**
 * Displays the players with all their information.
 * 
 * @component
 * @param {Object} props
 * @param {Object} props.gameState
 * @param {Object} props.gameState.state Current state of the game.
 * @param {Array} props.gameState.state.players List of all participating players.
 * @returns {JSX.Element} The rendered component.
 */
function PlayerComponent ({gameState}) {
    let players = gameState.state.players;
    if (!players) return;

    return (
        <div className="playerContainer">
            {players.map(elem => 
            <div key={elem.name} className="outerPlayerCard">
                <div className="playerCard" key={elem.name}>
                    <h2 className="playerName">{elem.name}</h2>
                    <div className="playerBalance">
                        <h3>{elem.balance}</h3>
                    </div>
                    <h3 className="playerGuessHeadline">Current Guess:</h3>
                    <div title={elem.guess} className="playerGuess">
                        <h3>{elem.guess === "" ? "no guess" : elem.guess}</h3>
                    </div>
                    <CorrectButton playerName={elem.name}/>
                </div>
            </div>
            )}
        </div>
    );
}

/**
 * Component that increases the balance of the respective player on click.
 * 
 * @component
 * @param {Object} props
 * @param {string} props.playerName Name of the player whose balance should be increased.
 * @returns {JSX.Element} The rendered component.
 */
function CorrectButton({playerName}) {
    function playerIsCorrect() {
        socket.emit("playerIsCorrect", playerName);
    }

    return (
        <button className="correctAnswerButton" onClick={playerIsCorrect}>Correct Answer</button>
    );
}

PlayerComponent.propTypes = {
    gameState: PropTypes.shape({
        state: PropTypes.shape({
            players: PropTypes.array.isRequired,
        }).isRequired
    }).isRequired
};

CorrectButton.propTypes = {
    playerName: PropTypes.string.isRequired,
};

export default PlayerComponent;