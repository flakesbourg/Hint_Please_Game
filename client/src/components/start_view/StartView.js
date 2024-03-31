import React from "react";
import { JoinGame } from "./JoinGame";
import { CreateRoom } from "./CreateRoom";
import { Header } from "./Header";
import "../../styles/StartView.css"

export function StartView({setPlayerState, setGameState}) {
    return (
        <>
        <Header />
        <CreateRoom setGameState={ setGameState }/>
        <JoinGame setPlayerState={ setPlayerState }/>
        </>
    )
}