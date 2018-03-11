import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import TeamPlayerStats from "../TeamPlayerStats";
import GPlayerRatings from "./GPlayerRatings";
import PlayerSeasonStats from "../PlayerSeasonStats";
//import CollegePlayerComparison from "./CollegePlayerComparison";
import axios from "axios";

export default class GPlayerTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      key: 4,
      playerStats: []
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getAllgPlayers = this.getAllgPlayers.bind(this);
  }

  componentDidMount() {
    this.getAllgPlayers();
  }

  handleSelect(key) {
    this.setState({ key });
  }

  getAllgPlayers() {
    axios
      .get("/api/teams/getAllgPlayers")
      .then(data => {
        this.setState({ playerStats: data.data });
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let component;
    if (this.state.key === 2)
      component = (
        <PlayerSeasonStats
          player={this.props.player}
          colors={this.props.colors}
        />
      );
    // if (this.state.key === 3) component = <TeamPlayerStats />;
    if (this.state.key === 4)
      component = (
        <GPlayerRatings
          leagueStats={this.props.leagueStats}
          player={this.props.player}
          colors={this.props.colors}
          positionStats={this.props.positionStats}
        />
      );
    // if (this.state.key === 5)
    //   component = (
    //     <CollegePlayerComparison
    //       player={this.props.player}
    //       colors={this.props.colors}
    //       players={this.state.playerStats}
    //     />
    //   );
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
            <NavItem eventKey={5} href="/" disabled>
              <span style={tabColor}>COMPARISON</span>
            </NavItem>
            <NavItem eventKey={6} title="Item" disabled>
              <span style={tabColor}>VIDEOS</span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
