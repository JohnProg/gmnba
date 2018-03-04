import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayersList from "./PlayersList";
import TeamStats from "./TeamStats";
import TeamPlayerStats from "./TeamPlayerStats";
import PlayerRatings from "./PlayerRatings";
import PlayerSeasonStats from "./PlayerSeasonStats";
import PlayerComparison from "./PlayerComparison";
import axios from "axios";

export default class PlayerTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      key: 4,
      playerStats: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getAllNbaPlayers = this.getAllNbaPlayers.bind(this);
  }

  componentDidMount() {
    this.getAllNbaPlayers();
  }

  handleSelect(key) {
    this.setState({ key });
  }

  getAllNbaPlayers() {
    axios
      .get("/api/teams/getAllNbaPlayers")
      .then(data => {
        this.setState({ playerStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props.positionStats);
    let component;
    if (this.state.key === 2)
      component = (
        <PlayerSeasonStats
          player={this.props.player}
          colors={this.props.colors}
        />
      );
    if (this.state.key === 3) component = <TeamPlayerStats />;
    if (this.state.key === 4)
      component = (
        <PlayerRatings
          player={this.props.player}
          colors={this.props.colors}
          positionStats={this.props.positionStats}
          postStats={this.props.postStats}
          catchShootStats={this.props.catchShootStats}
          shootingStats={this.props.shootingStats}
        />
      );
    if (this.state.key === 5)
      component = (
        <PlayerComparison
          player={this.props.player}
          colors={this.props.colors}
          players={this.state.playerStats}
        />
      );
    var headerStyle = {
      backgroundColor: this.props.colors.Color_Main
    };
    var tabColor = {
      color: this.props.colors.Color_Sec
    };

    return (
      <div>
        <div className="card">
          <Nav
            style={headerStyle}
            bsStyle="pills"
            justified
            activeKey={this.state.key}
            onSelect={this.handleSelect}
          >
            <NavItem eventKey={2} href="/">
              <span style={tabColor}>SEASON</span>
            </NavItem>
            <NavItem eventKey={3} href="/" disabled>
              <span style={tabColor}>CAREER</span>
            </NavItem>
            <NavItem eventKey={4} href="/">
              <span style={tabColor}>RATINGS</span>
            </NavItem>
            <NavItem eventKey={5} href="/">
              <span style={tabColor}>COMPARISON</span>
            </NavItem>
            <NavItem eventKey={6} href="/" disabled>
              <span style={tabColor}>VIDEOS</span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
