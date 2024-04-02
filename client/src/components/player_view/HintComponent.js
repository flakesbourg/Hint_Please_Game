import { socket } from "../../socket";

export default function HintComponent({hints}) {
    function HintButton({hint}) {
        function playerBuysHint() {
            socket.emit("playerBuysHint", hint.hintNumber);
        }
    
        return (
            <div className="singleHint" onClick={playerBuysHint}>
                <h3>{hint.category}</h3>
                <div className="hintPrice">
                    <div className="verticalDivider"></div>
                    <h3>{hint.price}</h3>
                </div>
            </div>
        );
    }

    function renderHints() {
        return (
            <div className="allHints">
                {hints.map((elem) =>
                    <HintButton hint={elem}/>
                )}
            </div>
        );
    }

    return (
        <div className="hintContainer">
            <h3 className="hintHeadline">Buy Hints:</h3>
            {renderHints()}
        </div>
    )
}