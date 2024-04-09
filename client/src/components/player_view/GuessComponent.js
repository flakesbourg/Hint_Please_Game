import React, {useState} from "react";
import { socket } from "../../socket";

/**
 * Component where the player inputs the guess for the round.
 * 
 * @component
 * @returns {JSX.Element}
 */
function GuessComponent() {
    const [guess, setGuess] = useState("");

    /**
     * Function that gets called when the input changes.
     * 
     * @param {Event} event Event thats fired after the input changes.
     */
    function onChange(event) {
        let newGuess = event.target.value;
        if (!newGuess) {
            newGuess = "";
        }
        socket.emit("makeGuess", event.target.value);
        setGuess(event.target.value);
    }

    return (
        <div className="makeGuess">
            <h3>Make Guess:</h3>
            <input value={guess} type="text" onChange={ onChange }/>
        </div>
    );
}

export default GuessComponent;