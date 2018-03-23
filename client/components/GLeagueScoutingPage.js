import React from "react";
import NavBar from "./NavBar";
import GLeagueScouting from "./GLeagueScouting/GLeagueScouting";

export default class GLeagueScoutingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <GLeagueScouting props={this.props} />
      </div>
    );
  }
}
