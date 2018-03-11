import React from "react";
import NavBar from "../NavBar";
import GTeamInfo from "./GTeamInfo";

export default class GTeamPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <GTeamInfo props={this.props} />
      </div>
    );
  }
}
