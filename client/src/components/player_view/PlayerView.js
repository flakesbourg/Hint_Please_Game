import React from "react";
import GameHeader from "../common/GameHeader";
import PlayerInfo from "./PlayerInfo";
import CurrentBalance from "./CurrentBalance";
import LeaveButton from "../common/LeaveButton";
import HintComponent from "./HintComponent";
import GuessComponent from "./GuessComponent";
import PropTypes from "prop-types";
import "./PlayerView.css";

/**
 * Component with all the relevant information for the player
 * including player information, available hints, guess input and more.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.playerState The state of the game containing information relevant for the player.
 * @param {number} props.playerState.round The current round of the game.
 * @param {string} props.playerState.gameId The Id of the game.
 * @param {Array} props.playerState.hints List of available Hints with category and price.
 * @param {Array} props.playerState.players List of all otherPlayers with name and balance.
 * @param {Object} props.playerState.player Object with information about player.
 * @param {number} props.playerState.player.balance Balance of player.
 * @param {Array} props.playerState.player.hintNumbers Hints that the player already bought
 * @returns {JSX.Element} The rendered component
 */
function PlayerView({ playerState }) {
  return (
    <>
      <GameHeader
        currentRound={playerState.round}
        gameId={playerState.gameId}
      />
      <div className="playerViewContainer">
        <div className="playerRightSide">
          <CurrentBalance balance={playerState.player.balance} />
          <GuessComponent />
          <HintComponent
            hints={playerState.hints}
            boughtHints={playerState.player.hintNumbers}
          />
        </div>
        <div className="playerLeftSide">
          <PlayerInfo
            myPlayer={playerState.player}
            otherPlayers={playerState.players}
          />
        </div>
      </div>
      <LeaveButton />
    </>
  );
}

PlayerView.propTypes = {
  playerState: PropTypes.shape({
    round: PropTypes.number.isRequired,
    gameId: PropTypes.string.isRequired,
    player: PropTypes.shape({
      balance: PropTypes.number.isRequired,
      hintNumbers: PropTypes.array.isRequired,
    }),
    hints: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
  }).isRequired,
};

export default PlayerView;
