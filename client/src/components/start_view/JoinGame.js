import React, {useState, useEffect} from "react";
import { socket } from "../../socket";

export function JoinGame({setPlayerState}) {
    const [playerName, setPlayerName] = useState("");
    const [gameId, setGameId] = useState("");

    useEffect(() => {
        socket.on("error", (error) => {
            console.log(error);
        });

        socket.on("playerGameStateUpdated", (data) => {
            setPlayerState(data);
        });

        return () => {
            socket.off("playerGameStateUpdated");
            socket.off("error");
        }
      }, [setPlayerState]);

    function onSubmit(event) {
        event.preventDefault();

        socket.emit('joinGame', { name: playerName, gameId: gameId });
    }

    return (
        <form className="joinForm" onSubmit={ onSubmit }>
            <h2>Join an existing Game</h2>
            <input className="joinInput" placeholder="Player Name" onChange={ e => setPlayerName(e.target.value) }/>
            <input className="joinInput" placeholder="GameID" onChange={ e => setGameId(e.target.value) }/>
            <button type="submit">Spiel beitreten</button>
        </form>
    )
}