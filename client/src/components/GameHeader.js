import React from "react";

export function PlayerHeader({currentRound, gameId}) {
    return (
        <div className="playerHeader">
            <h2 className="playerHeadline">Hint Please!</h2>
            <h2 className="playerHeadline">Round: {currentRound}</h2>
            <h2 className="playerHeadline">GameID: {gameId}</h2>
        </div>
    )
}