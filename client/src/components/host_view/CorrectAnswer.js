import { socket } from "../../socket";

export function CorrectAnswer ({gameState}) {
    let answer = gameState.state.gameData[gameState.state.currentRound]["answer"];

    return (
        <div className="correctAnswerContainer">
            <div className="correctAnswer">
                <h3>Correct Answer: </h3>
                <h3 className="answer">{answer}</h3>
            </div>
            <NextRoundButton />
        </div>
    );
}

function NextRoundButton () {
    function nextRound() {
        socket.emit("nextRound");
    }

    return (
        <button className="nextRoundButton" onClick={nextRound}>Next Round</button>
    );
}