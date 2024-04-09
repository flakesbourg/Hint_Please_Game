import React from "react";
import JoinGame from "./JoinGame";
import CreateRoom from "./CreateRoom";
import Header from "./Header";
import "./StartView.css"

/**
 * This Component displays different forms to either create or join a game.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function StartView() {
    return (
        <>
        <Header />
        <CreateRoom />
        <JoinGame />
        </>
    )
}

export default StartView;