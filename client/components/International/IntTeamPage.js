import React from "react";
import NavBar from "../NavBar";
import IntTeamInfo from "./IntTeamInfo";

export default class IntTeamPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <IntTeamInfo props={this.props} />
      </div>
    );
  }
}
