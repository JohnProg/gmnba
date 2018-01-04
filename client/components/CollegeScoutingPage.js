import React from "react";
import NavBar from "./NavBar";
import CollegeScouting from "./CollegeScouting/CollegeScouting";

export default class CollegeScoutingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <CollegeScouting props={this.props} />
      </div>
    );
  }
}
