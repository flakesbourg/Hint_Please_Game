import React, {useEffect} from "react";
import { socket } from "../../socket";

export function CreateRoom({ setGameState }) {
    useEffect(() => {
        socket.on("hostGameStateUpdated", (data) => {
            console.log(data);
            setGameState(data);
        });

        return () => {
            socket.off("hostGameStateUpdated");
        }
      }, [setGameState]);

    function onSubmit(event) {
        event.preventDefault();

        socket.emit('createGame');
    }

    return (
        <form onSubmit={ onSubmit }>
            <h2 className="createHeadline">Host a new Game</h2>
            <button className="button" type="submit">create</button>
            <div className="dividerLine"></div>
        </form>
    )
}