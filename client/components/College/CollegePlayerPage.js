import React from "react";
import NavBar from "../NavBar";
import CollegePlayerInfo from "./CollegePlayerInfo";

export default class CollegePlayerPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <CollegePlayerInfo props={this.props} />
      </div>
    );
  }
}
