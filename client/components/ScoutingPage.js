import React from "react";
import NavBar from "./NavBar";
import NbaScouting from "./NBAscouting/NbaScouting";

export default class ScoutingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <NbaScouting props={this.props} />
      </div>
    );
  }
}
