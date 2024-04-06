import React from "react";
import { JoinGame } from "./JoinGame";
import { CreateRoom } from "./CreateRoom";
import { Header } from "./Header";
import PropTypes from "prop-types";
import "../../styles/StartView.css"

function StartView({setPlayerState, setGameState}) {
    return (
        <>
        <Header />
        <CreateRoom setGameState={ setGameState }/>
        <JoinGame setPlayerState={ setPlayerState }/>
        </>
    )
}

StartView.propTypes = {
    setPlayerState: PropTypes.func.isRequired,
    setGameState: PropTypes.func.isRequired
};

export { StartView };