import React from "react";
import SearchBar from "./SearchBar";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import axios from "axios";

export default class NavBar extends React.Component {
  constructor() {
    super();
    this.state = {
      showSearch: false,
      showScoutMenu: false,
      searchList: []
    };
    this.renderSearch = this.renderSearch.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleScoutClick = this.handleScoutClick.bind(this);
    this.getNbaPlayers = this.getNbaPlayers.bind(this);
    this.getNbaTeams = this.getNbaTeams.bind(this);
    this.getCollegePlayers = this.getCollegePlayers.bind(this);
    this.getCollegeTeams = this.getCollegeTeams.bind(this);
    this.getGPlayers = this.getGPlayers.bind(this);
    this.getGTeams = this.getGTeams.bind(this);
    this.renderScouting = this.renderScouting.bind(this);
  }

  componentDidMount() {
    this.getNbaTeams();
    this.getCollegeTeams();
    this.getGTeams();
    this.getNbaPlayers();
    this.getCollegePlayers();
    this.getGPlayers();
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

  getGPlayers() {
    axios
      .get("/api/teams/gPlayersList")
      .then(data => {
        for (var i = 0; i < data.data.length; i++) {
          var player = data.data[i];
          var obj = {
            name: player.name,
            id: player.id,
            picture: player.picture,
            league: "gleague",
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
  getGTeams() {
    axios
      .get("/api/teams/gTeamsList")
      .then(data => {
        var obj = {};
        for (var i = 0; i < data.data.length; i++) {
          var team = data.data[i];
          var obj = {
            name: team.Name,
            id: team.id,
            picture: team.Logo,
            league: "gleague"
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
      showSearch: !this.state.showSearch,
      showScoutMenu: false
    });
  }

  handleScoutClick() {
    this.setState({
      showScoutMenu: !this.state.showScoutMenu,
      showSearch: false
    });
  }

  renderSearch() {
    if (this.state.showSearch) {
      return (
        <div id="search-div">
          <SearchBar list={this.state.searchList} />
        </div>
      );
    }
  }

  renderScouting() {
    if (this.state.showScoutMenu) {
      return (
        <div className="card" id="scoutMenu-div">
          <div id="dropdown-content">
            <div
              style={{
                paddingTop: "15px",
                paddingLeft: "15px",
                paddingBottom: "15px"
              }}
            >
              <a href="/college-scouting">COLLEGE</a>
            </div>
            <div
              style={{
                paddingTop: "15px",
                paddingBottom: "15px",
                paddingLeft: "15px",
                borderTop: "1px solid #eee"
              }}
            >
              <a href="/gleague-scouting">G-LEAGUE</a>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="nav-class">
        <div className="w3-top">
          <div
            className="w3-bar w3-white"
            id="myNavbar"
            style={{
              fontSize: "15px",
              paddingTop: "5px",
              textShadow: "-4px 4px 4px #000000"
            }}
          >
            <a href="#home" className="w3-bar-item w3-button w3-wide">
              BB SCOUT
            </a>
            <div className="w3-right w3-hide-small">
              <a
                className="w3-bar-item w3-button"
                onClick={this.handleScoutClick}
              >
                SCOUTING &#9660;
              </a>
              <a href="/team/26" className="w3-bar-item w3-button">
                <i className="fa fa-user" /> TEAM
              </a>
              <a href="/scouting" className="w3-bar-item w3-button">
                <i className="fa fa-th" /> NBA
              </a>
              <a className="w3-bar-item w3-button" onClick={this.handleClick}>
                <i className="fa " /> SEARCH
              </a>
              <a className="w3-bar-item w3-button">
                <i className="fa fa-envelope" /> GLOSSARY
              </a>
            </div>
            <a
              href="javascript:void(0)"
              className="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium"
              onClick={this.handleClick}
            >
              <i className="fa fa-bars" />
            </a>
          </div>
        </div>
        {this.renderScouting()}
        {this.renderSearch()}
      </div>
    );
  }
}
