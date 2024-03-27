import React, {useEffect, useState} from "react";
import { socket } from "../socket";

export function CreateRoom({ setGameState }) {
    useEffect(() => {
        socket.on("gameCreated", (data) => {
            console.log(data)
        });
        
        socket.on("hostGameStateUpdated", (data) => {
            console.log(data);
            setGameState(data);
        });

        return () => {
            socket.off("gameCreated");
            socket.off("hostGameStateUpdated");
        }
      }, [setGameState]);

    function onSubmit(event) {
        event.preventDefault();

        socket.emit('createGame');
    }

    return (
        <form onSubmit={ onSubmit }>
            <button type="submit">Neuen Raum erstellen</button>
        </form>
    )
}