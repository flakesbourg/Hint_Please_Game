import React, {useState} from "react";
import { socket } from "../socket";

socket.on("error", (error) => {
    console.log(error);
});

socket.on("playerJoined", (data) => {
    console.log(data);
})

socket.on("playerGameStateUpdated", (data) => {
    console.log(JSON.stringify(data));
});

export function JoinGame() {
    const [playerName, setPlayerName] = useState("");
    const [gameId, setGameId] = useState("");

    function onSubmit(event) {
        event.preventDefault();

        socket.emit('joinGame', { name: playerName, gameId: gameId });
    }

    return (
        <form onSubmit={ onSubmit }>
            <input placeholder="Spieler Name" onChange={ e => setPlayerName(e.target.value) }/>
            <input placeholder="Spiel ID" onChange={ e => setGameId(e.target.value) }/>
            <button type="submit">Spiel beitreten</button>
        </form>
    )
}