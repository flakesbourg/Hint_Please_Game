import React from "react";
import JoinGame from "./JoinGame";
import CreateRoom from "./CreateRoom";
import "./StartView.css";
import GameHeader from "../common/GameHeader";

/**
 * This Component displays different forms to either create or join a game.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
function StartView() {
  return (
    <>
      <GameHeader />
      <CreateRoom />
      <JoinGame />
    </>
  );
}

export default StartView;
