import React, {useState} from "react";
import { socket } from "../socket";

socket.on("gameCreated", (data) => {
    console.log(data)
});

socket.on("hostGameStateUpdated", (data) => {
    console.log(data);
});

export function CreateRoom() {
    const [playerName, setPlayerName] = useState("");
    const [gameId, setGameId] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function onSubmit(event) {
        event.preventDefault();

        socket.emit('createGame');
    }

    return (
        <form onSubmit={ onSubmit }>
            <button type="submit" disabled={ isLoading }>Neuen Raum erstellen</button>
        </form>
    )
}