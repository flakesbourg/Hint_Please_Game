import React from "react";

export function PlayerInfo({myPlayer, otherPlayers}) {
    return (
        <div className="playerInfoContainer">
            <h2 className="playerInfoHeadline">Player Info:</h2>
            <div className="playerInfoCard">
                <div>
                    <h3 className="playerInfoSubHeadline">Name:</h3>
                    <h3 className="playerInfo">{myPlayer.name}</h3>
                </div>
                <div>
                    <h3 className="playerInfoSubHeadline">Hints {myPlayer.hints.length}/2:</h3>
                    {myPlayer.hints.map((elem) => 
                       <h3 key={elem.category} className="playerInfo">{elem.category}: {elem.hint}</h3>
                    )}
                </div>
            </div>
            <h2 className="playerInfoHeadline">Other Players:</h2>
            <div>
                {otherPlayers.map((elem) => 
                    <div key={elem.name} className="otherPlayer">
                        <h3 className="otherPlayerName">{elem.name}</h3>
                        <div className="otherPlayerBalanceContainer">
                            <h4 className="otherPlayerBalance">{elem.balance}</h4>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}