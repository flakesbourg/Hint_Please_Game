import React, {useEffect, useState } from "react";
import { socket } from "../../socket";
import { PlayerHeader } from "../GameHeader";
import { PlayerInfo } from "./PlayerInfo";
import { CurrentBalance } from "./CurrentBalance";
import HintComponent from "./HintComponent";
import GuessComponent from "./GuessComponent";
import PropTypes from "prop-types";
import "../../styles/PlayerView.css";

function PlayerView({ setPlayerState, playerState }) {
    const [guess, setGuess] = useState("");

    useEffect(() => {
        socket.on("leftGame", () => {
            setPlayerState(null);
        });

        socket.on("hostLeft", () => {
            setPlayerState(null);
        });

        return () => {
            socket.off("leftGame");
            socket.off("hostLeft");
        }
    }, []);

    function leaveGame () {
        socket.emit("leaveGame");
    }

    return (
        <div>
            <PlayerHeader currentRound={playerState.round} gameId={playerState.gameId}/>
            <div className="playerViewContainer">
                <button onClick={leaveGame}>leave</button>
                <div className="playerRightSide">
                    <CurrentBalance balance={playerState.player.balance} />
                    <GuessComponent setGuess={setGuess} guess={guess} />
                    <HintComponent hints={playerState.hints} />
                </div>
                <div className="playerLeftSide">
                    <PlayerInfo  myPlayer={playerState.player} otherPlayers={playerState.players} />
                </div>
            </div>
        </div>
    )
}

PlayerView.propTypes = {
    setPlayerState: PropTypes.func.isRequired,
    playerState: PropTypes.shape({
        round: PropTypes.number.isRequired,
        gameId: PropTypes.string.isRequired,
        player: PropTypes.shape({
            balance: PropTypes.number.isRequired,
        }),
        hints: PropTypes.array.isRequired,
        players: PropTypes.array.isRequired
    }).isRequired,
};

export {PlayerView};
