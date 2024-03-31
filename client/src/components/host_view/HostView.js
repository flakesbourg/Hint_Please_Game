import React, {useEffect } from "react";
import { socket } from "../../socket";
import { PlayerComponent } from "./PlayerComponent";
import { PlayerHeader } from "../GameHeader";
import { CorrectAnswer } from "./CorrectAnswer";
import "../../styles/HostView.css";

export function HostView({ setGameState, gameState }) {
    useEffect(() => {
        socket.on("hostGameStateUpdated", (data) => {
            setGameState(data);
        });

        return () => {
            socket.off("hostGameStateUpdated");
        }
      }, [setGameState]);

    /*function PlayerComponent() {
        
    }*/

    return (
        <>
        <PlayerHeader currentRound={gameState.state.currentRound} gameId={gameState.gameId}/>
        <div>
            <CorrectAnswer gameState={gameState} />
            <PlayerComponent gameState={gameState} />
        </div>
        </>
    )
}