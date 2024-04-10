import React from "react";
import PropTypes from "prop-types";

/**
 * Displays the players with all their information.
 * It also renders a checkbox which decides if the player is correct
 * and gets point after the "next round"-button is clicked.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.gameState
 * @param {Object} props.gameState.state Current state of the game.
 * @param {Array} props.gameState.state.players List of all participating players.
 * @param {Array} props.correctPlayers List of all players currently marked as correct.
 * @param {Function} props.setCorrectPlayers Function to set the list of all players currently marked as correct
 * @returns {JSX.Element} The rendered component.
 */
function PlayerComponent({ gameState, correctPlayers, setCorrectPlayers }) {
  let players = gameState.state.players;

  if (!players) return;

  const handleChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCorrectPlayers([...correctPlayers, value]);
    } else {
      setCorrectPlayers(correctPlayers.filter((elem) => elem !== value));
    }
  };

  return (
    <div className="playerContainer">
      {players.map((elem) => (
        <div key={elem.name} className="outerPlayerCard">
          <div className="playerCard" key={elem.name}>
            <h2 className="playerName" title={elem.name}>
              {elem.name}
            </h2>
            <div className="playerBalance">
              <h3>{elem.balance}</h3>
            </div>
            <h3 className="playerGuessHeadline">Current Guess:</h3>
            <div title={elem.guess} className="playerGuess">
              <h3>{elem.guess === "" ? "no guess" : elem.guess}</h3>
            </div>
            <CorrectCheckBox name={elem.name} handleChange={handleChange} />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * CheckBox that indicates if the player made a correct guess.
 *
 * @component
 * @param {Object} props
 * @param {string} props.name The name of the player that is correct.
 * @param {Function} props.handleChange Function which is called on change of the checkbox.
 * @returns {JSX.Element} The rendered component.
 */
function CorrectCheckBox({ name, handleChange }) {
  return (
    <label className="correctCheckboxLabel">
      <h4 className="correctCheckboxText">Correct Guess</h4>
      <input
        className="correctCheckbox"
        type="checkbox"
        name="correctPlayers"
        id={name}
        value={name}
        onChange={handleChange}
      />
      <span className="checkmark"></span>
    </label>
  );
}

PlayerComponent.propTypes = {
  gameState: PropTypes.shape({
    state: PropTypes.shape({
      players: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
  correctPlayers: PropTypes.array.isRequired,
  setCorrectPlayers: PropTypes.func.isRequired,
};

CorrectCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PlayerComponent;
