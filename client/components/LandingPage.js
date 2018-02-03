import React from "react";
import NavBar from "./NavBar";
import Info from "./Info";
import SearchBar from "./SearchBar";

export default class LandingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Info props={this.props} />
      </div>
    );
  }
}
