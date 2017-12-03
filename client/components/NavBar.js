import React from "react";
import SearchBar from "./SearchBar";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      showSearch: false
    };
    this.renderSearch = this.renderSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("search was clicked");
    this.setState(
      {
        showSearch: !this.state.showSearch
      },
      () => {
        console.log(this.state.showSearch);
      }
    );
  }

  renderSearch() {
    if (this.state.showSearch) {
      console.log("render search!!");
      return (
        <div id="search-div">
          <SearchBar />
        </div>
      );
    }
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
                SCOUTING
              </a>
              <a href="#team" className="w3-bar-item w3-button">
                <i className="fa fa-user" /> TEAM
              </a>
              <a href="#work" className="w3-bar-item w3-button">
                <i className="fa fa-th" /> LEAGUE
              </a>
              <a className="w3-bar-item w3-button" onClick={this.handleClick}>
                <i className="fa " /> SEARCH
              </a>
              <a href="#contact" className="w3-bar-item w3-button">
                <i className="fa fa-envelope" /> MESSAGES
              </a>
            </div>
          </div>
        </div>
        {this.renderSearch()}
      </div>
    );
  }
}
