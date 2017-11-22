import React from "react";
import NavBar from "./NavBar";
import PlayerInfo from "./PlayerInfo";

export default class PlayerPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log("PROPS IN PLAYER PAGE: ", this.props);
    return (
      <div>
        <NavBar />
        <PlayerInfo props={this.props} />
      </div>
    );
  }
}
