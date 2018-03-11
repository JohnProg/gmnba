import React from "react";
import NavBar from "../NavBar";
import GPlayerInfo from "./GPlayerInfo";

export default class GPlayerPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <GPlayerInfo props={this.props} />
      </div>
    );
  }
}
