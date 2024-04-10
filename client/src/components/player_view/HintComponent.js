import React from "react";
import { socket } from "../../socket";
import PropTypes from "prop-types";

/**
 * A componenet that contains a list of every hint for the current round with price.
 * Hints that are already bought will be disabled.
 *
 * @component
 * @param {Object} props
 * @param {Array} props.hints List of every Hint with category and price.
 * @param {Array} props.boughtHints List of the hints that the player already bought.
 * @returns {JSX.Element} The renderd component.
 */
function HintComponent({ hints, boughtHints }) {
  return (
    <div className="hintContainer">
      <h3 className="hintHeadline">Buy Hints:</h3>
      <div className="allHints">
        {hints.map((elem) => (
          <HintButton
            key={elem.hintNumber}
            hint={elem}
            boughtHints={boughtHints}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Button component wich shows the category and price of the hint.
 * The player buys the displayed hint on click.
 * Hints that the player already bought will be disabled.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.hint A single hint with all relevant information.
 * @param {number} props.hint.hintNumber
 * @param {string} props.hint.category
 * @param {number} props.hint.price
 * @param {Array} props.boughtHints
 * @returns {JSX.Element} The rendered component.
 */
function HintButton({ hint, boughtHints }) {
  function playerBuysHint() {
    socket.emit("playerBuysHint", hint.hintNumber);
  }

  let className = "singleHint";

  if (boughtHints.includes(hint.hintNumber)) {
    className += " disabledHint";
  }

  return (
    <div className={className} onClick={playerBuysHint}>
      <h3>{hint.category}</h3>
      <div className="hintPrice">
        <div className="verticalDivider"></div>
        <h3>{hint.price}</h3>
      </div>
    </div>
  );
}

HintButton.propTypes = {
  hint: PropTypes.shape({
    hintNumber: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  boughtHints: PropTypes.array.isRequired,
};

HintComponent.propTypes = {
  hints: PropTypes.array.isRequired,
  boughtHints: PropTypes.array.isRequired,
};

export default HintComponent;
