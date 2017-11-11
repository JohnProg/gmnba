import React from "react";

export default class NavBar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <div className="w3-top">
          <div className="w3-bar w3-white w3-card" id="myNavbar">
            <a href="#home" className="w3-bar-item w3-button w3-wide">
              GM NBA
            </a>
            <div className="w3-right w3-hide-small">
              <a href="#about" className="w3-bar-item w3-button">
                PROSPECTS
              </a>
              <a href="#team" className="w3-bar-item w3-button">
                <i className="fa fa-user" /> TEAM
              </a>
              <a href="#work" className="w3-bar-item w3-button">
                <i className="fa fa-th" /> LEAGUE
              </a>
              <a href="#pricing" className="w3-bar-item w3-button">
                <i className="fa fa-usd" /> FUTURE
              </a>
              <a href="#contact" className="w3-bar-item w3-button">
                <i className="fa fa-envelope" /> MESSAGES
              </a>
            </div>

            <a
              href="javascript:void(0)"
              className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium"
              onClick="w3_open()"
            >
              <i className="fa fa-bars" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}
