import React, {useEffect, useState } from "react";
import { socket } from "../../socket";
import { PlayerHeader } from "../GameHeader";
import { PlayerInfo } from "./PlayerInfo";
import { CurrentBalance } from "./CurrentBalance";
import HintComponent from "./HintComponent";
import GuessComponent from "./GuessComponent";
import "../../styles/PlayerView.css";

export function PlayerView({ setPlayerState, playerState }) {
    const [guess, setGuess] = useState("");

    useEffect(() => {
        socket.on("playerGameStateUpdated", (data) => {
            setPlayerState(data);
        });

        socket.on("leftGame", () => {
            setPlayerState(null);
        });

        return () => {
            socket.off("playerGameStateUpdated");
            socket.off("leftGame");
        }
    }, [playerState]);

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