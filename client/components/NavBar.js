import React from "react";
import SearchBar from "./SearchBar";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import axios from "axios";

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      showSearch: false,
      searchList: []
    };
    this.renderSearch = this.renderSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getNbaPlayers = this.getNbaPlayers.bind(this);
    this.getNbaTeams = this.getNbaTeams.bind(this);
    this.getCollegePlayers = this.getCollegePlayers.bind(this);
    this.getCollegeTeams = this.getCollegeTeams.bind(this);
  }

  componentDidMount() {
    this.getNbaPlayers();
    this.getCollegePlayers();
    this.getNbaTeams();
    this.getCollegeTeams();
  }

  getNbaPlayers() {
    axios
      .get("/api/teams/nbaPlayersList")
      .then(data => {
        for (var i = 0; i < data.data.length; i++) {
          var player = data.data[i];
          var obj = {
            name: player.name,
            id: player.id,
            picture: player.picture,
            league: "nba",
            team: player.team
          };

          this.setState({
            searchList: [...this.state.searchList, obj]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  getNbaTeams() {
    axios
      .get("/api/teams/nbaTeamsList")
      .then(data => {
        for (var i = 0; i < data.data.length; i++) {
          var team = data.data[i];
          var obj = {
            name: team.Name,
            id: team.id,
            picture: team.Logo,
            league: "nba"
          };
          this.setState({
            searchList: [...this.state.searchList, obj]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  getCollegePlayers() {
    axios
      .get("/api/teams/collegePlayersList")
      .then(data => {
        for (var i = 0; i < data.data.length; i++) {
          var player = data.data[i];
          var obj = {
            name: player.name,
            id: player.id,
            picture: player.picture,
            league: "ncaa",
            team: player.team
          };
          this.setState({
            searchList: [...this.state.searchList, obj]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  getCollegeTeams() {
    axios
      .get("/api/teams/collegeTeamsList")
      .then(data => {
        var obj = {};
        for (var i = 0; i < data.data.length; i++) {
          var team = data.data[i];
          var obj = {
            name: team.Name,
            id: team.id,
            picture: team.Logo,
            league: "ncaa"
          };
          this.setState({
            searchList: [...this.state.searchList, obj]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleClick() {
    this.setState({
      showSearch: !this.state.showSearch
    });
  }

  renderSearch() {
    if (this.state.showSearch) {
      console.log("searchList", this.state.searchList);
      return (
        <div id="search-div">
          <SearchBar list={this.state.searchList} />
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
              <a href="/scouting" className="w3-bar-item w3-button">
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
