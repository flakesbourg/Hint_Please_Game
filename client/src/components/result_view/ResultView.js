import React from "react";
import PropTypes from "prop-types";
import "./ResultView.css";
import GameHeader from "../common/GameHeader";

/**
 * Component with all the relevant information for the player
 * including player information, available hints, guess input and more.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.result
 * @param {Object} props.result.ranking
 * @param {string} props.result.gameId
 * @param {Function} props.setResult
 * @returns {JSX.Element} The rendered component
 */
function ResultView({ result, setResult }) {
  function onClick() {
    setResult(null);
  }

  return (
    <>
      <GameHeader />
      <h3 className="resultHeadline">Results of Game {result.gameId}</h3>
      <div className="rankingContainer">
        {Object.entries(result.ranking).map(([key, value], index) => {
          return (
            <div className={"rankingEntry i" + index} key={key} title={key}>
              <div className="index">{index + 1}</div>
              <div className="name">{key}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>
      <button className="backToMenuButton" onClick={onClick}>
        Back to Menu
      </button>
    </>
  );
}

ResultView.propTypes = {
  result: PropTypes.shape({
    ranking: PropTypes.object,
    gameId: PropTypes.string,
  }),
  setResult: PropTypes.func,
};

export default ResultView;
