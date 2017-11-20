import React from "react";
import NavBar from "./NavBar";
import PlayerInfo from "./PlayerInfo";

export default class PlayerPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <PlayerInfo />
      </div>
    );
  }
}
