import React from "react";
import { socket } from "../../socket";

/**
 * Form component that creates a new game on click.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 */
export default function CreateRoom() {
  function onSubmit(event) {
    event.preventDefault();

    socket.volatile.emit("createGame");
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className="createHeadline">Host a new Game</h2>
      <button className="button" type="submit">
        create
      </button>
      <div className="dividerLine"></div>
    </form>
  );
}
