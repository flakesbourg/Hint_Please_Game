import { socket } from "../../socket";

export default function GuessComponent({guess, setGuess}) {
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
    )
}