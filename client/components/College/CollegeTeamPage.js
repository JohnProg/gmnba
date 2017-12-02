import React from "react";
import NavBar from "../NavBar";
import CollegeTeamInfo from "./CollegeTeamInfo";

export default class CollegeTeamPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <CollegeTeamInfo props={this.props} />
      </div>
    );
  }
}
