import { socket } from "../../socket";

export function PlayerComponent ({gameState}) {
    let players = gameState.state.players;
        if (players) {
            return (
                <>
                <div className="playerContainer">
                    {players.map(elem => 
                    <div className="outerPlayerCard">
                        <div className="playerCard" key={elem.name}>
                            <h2 className="playerName">{elem.name}</h2>
                            <div className="playerBalance">
                                <h3>{elem.balance}</h3>
                            </div>
                            <h3 className="playerGuessHeadline">Current Guess:</h3>
                            <div title={elem.guess} className="playerGuess">
                                <h3>{elem.guess === "" ? "no guess" : elem.guess}</h3>
                            </div>
                            {/*<td>{elem.hints}</td>*/}
                            <CorrectButton player={elem.name}/>
                        </div>
                    </div>
                    )}
                </div>
                </>
            );
        }
}

function CorrectButton({player}) {
    function playerIsCorrect() {
        socket.emit("playerIsCorrect", player);
    }

    return (
        <button className="correctAnswerButton" onClick={playerIsCorrect}>Correct Answer</button>
    );
}