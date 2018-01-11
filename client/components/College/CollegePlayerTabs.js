import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayersList from "../PlayersList";
import TeamStats from "../TeamStats";
import TeamPlayerStats from "../TeamPlayerStats";
import CollegePlayerRatings from "./CollegePlayerRatings";
import PlayerSeasonStats from "../PlayerSeasonStats";

export default class CollegePlayerTabs extends React.Component {
  constructor() {
    super();
    this.state = {
      key: 4
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
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
    if (this.state.key === 3) component = <TeamPlayerStats />;
    if (this.state.key === 4)
      component = (
        <CollegePlayerRatings
          leagueStats={this.props.leagueStats}
          player={this.props.player}
          colors={this.props.colors}
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
            <NavItem eventKey={3} href="/">
              <span style={tabColor}>CAREER</span>
            </NavItem>
            <NavItem eventKey={4} href="/">
              <span style={tabColor}>RATINGS</span>
            </NavItem>
            <NavItem eventKey={5} href="/">
              <span style={tabColor}>PROJECTION</span>
            </NavItem>
            <NavItem eventKey={6} title="Item">
              <span style={tabColor}>VIDEOS</span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}