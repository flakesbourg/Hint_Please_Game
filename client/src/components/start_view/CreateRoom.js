import React from "react";
import { socket } from "../../socket";

export function CreateRoom() {

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