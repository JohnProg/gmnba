import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayersList from "./PlayersList";
import TeamStats from "./TeamStats";
import TeamPlayerStats from "./TeamPlayerStats";
import TeamLeagueRanks from "./TeamLeagueRanks";

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 4
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    console.log("PROPS IN TABS\n", this.props);
    let component;
    if (this.state.key === 1)
      component = <PlayersList players={this.props.players} />;
    if (this.state.key === 2)
      component = <TeamStats teamStats={this.props.teamStats} />;
    if (this.state.key === 3) component = <TeamPlayerStats />;
    if (this.state.key === 4)
      component = (
        <TeamLeagueRanks
          leagueStats={this.props.leagueStats}
          team={this.props.team}
        />
      );
    var headerStyle = {
      backgroundColor: this.props.team.Color_Main || "#002D62"
    };
    var tabColor = {
      color: this.props.team.Color_Sec || "#F05133"
    };
    //#C4D600

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
            <NavItem eventKey={1} href="/">
              <span style={tabColor}>ROSTER</span>
            </NavItem>
            <NavItem eventKey={2} href="/">
              <span style={tabColor}>SEASON</span>
            </NavItem>
            <NavItem eventKey={3} href="/">
              <span style={tabColor}>PLAYERS</span>
            </NavItem>
            <NavItem eventKey={4} href="/">
              <span style={tabColor}>RANKINGS</span>
            </NavItem>
            <NavItem eventKey={5} title="Item">
              <span style={tabColor}>LINEUP</span>
            </NavItem>
            <NavItem eventKey={6} title="Item">
              <span style={tabColor}>SCHEDULE</span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
