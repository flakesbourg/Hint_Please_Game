import React from "react";
import PropTypes from "prop-types";

/**
 * Component that shows relevant information about player and
 * every opponent.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.myPlayer Information about the player.
 * @param {string} props.myPlayer.name Name of the player.
 * @param {Array} props.myPlayer.hints List of every hint the player bought.
 * @param {Array} props.otherPlayers List of every opponent with name and balance.
 * @returns {JSX.Element} The rendered component.
 */
function PlayerInfo({ myPlayer, otherPlayers }) {
  return (
    <div className="playerInfoContainer">
      <h2 className="playerInfoHeadline">Player Info:</h2>
      <div className="playerInfoCard">
        <div className="subHeadlineContainer">
          <h3 className="playerInfoSubHeadline">Name:</h3>
          <h3 className="playerInfo" title={myPlayer.name}>
            {myPlayer.name}
          </h3>
        </div>
        <div className="subHeadlineContainer">
          <h3 className="playerInfoSubHeadline">
            Hints {myPlayer.hints.length}/2:
          </h3>
          {myPlayer.hints.map((elem) => (
            <h3
              title={elem.category + ": " + elem.hint}
              key={elem.category}
              className="playerInfo"
            >
              {elem.category}: {elem.hint}
            </h3>
          ))}
        </div>
      </div>
      <OtherPlayers otherPlayers={otherPlayers} />
    </div>
  );
}

/**
 * Component that displays a list of all other players and their balance.
 * If there are no other players this component returns nothing.
 *
 * @param {Object} props
 * @param {Array} props.otherPlayers List of every opponent with name and balance.
 * @returns {JSX.Element | undefined}
 */
function OtherPlayers({ otherPlayers }) {
  if (otherPlayers.length === 0) {
    return;
  }

  return (
    <>
      <h2 className="playerInfoHeadline">Other Players:</h2>
      {otherPlayers.map((elem) => (
        <div key={elem.name} className="otherPlayer">
          <h3 className="otherPlayerName">{elem.name}</h3>
          <div className="otherPlayerBalanceContainer">
            <h4 className="otherPlayerBalance">{elem.balance}</h4>
          </div>
        </div>
      ))}
    </>
  );
}

OtherPlayers.propTypes = {
  otherPlayers: PropTypes.array.isRequired,
};

PlayerInfo.propTypes = {
  myPlayer: PropTypes.shape({
    name: PropTypes.string.isRequired,
    hints: PropTypes.array.isRequired,
  }).isRequired,
  otherPlayers: PropTypes.array.isRequired,
};

export default PlayerInfo;
