import React from "react";
import { socket } from "../../socket.js";

/**
 * Button component which leaves game and returns to start view on click.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function LeaveButton() {
    function leaveGame () {
        socket.emit("leaveGame");
    }
    
    return (
        <button className="leaveButton" onClick={leaveGame}>Leave Game</button>
    );
}

export default LeaveButton;