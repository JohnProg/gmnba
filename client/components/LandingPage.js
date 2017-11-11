import React from "react";
import NavBar from "./NavBar";
import Info from "./Info";

export default class LandingPage extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <NavBar />
        <Info />
        <h4>GM NBA</h4>
      </div>
    );
  }
}
