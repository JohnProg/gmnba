import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayersList from "./PlayersList";
import TeamStats from "./TeamStats";
import TeamPlayerStats from "./TeamPlayerStats";
import TeamLeagueRanks from "./TeamLeagueRanks";
import TeamContracts from "./TeamContracts";

export default class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 3
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    let component;
    if (this.state.key === 1)
      component = (
        <PlayersList players={this.props.players} team={this.props.team} />
      );
    if (this.state.key === 2) component = <TeamStats team={this.props.team} />;
    if (this.state.key === 3)
      component = <TeamPlayerStats team={this.props.team} />;
    if (this.state.key === 4)
      component = (
        <TeamLeagueRanks
          leagueStats={this.props.leagueStats}
          team={this.props.team}
        />
      );
    if (this.state.key === 6)
      component = (
        <TeamContracts
          contracts={this.props.contracts}
          team={this.props.team}
        />
      );
    var headerStyle = {
      backgroundColor: this.props.team.Color_Main || "#fff"
    };
    var tabColor = {
      color: this.props.team.Color_Sec || "#000"
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
              <span style={tabColor} className="tab-text">
                ROSTER
              </span>
            </NavItem>
            <NavItem eventKey={2} href="/">
              <span style={tabColor} className="tab-text">
                SEASON
              </span>
            </NavItem>
            <NavItem eventKey={3} href="/">
              <span style={tabColor} className="tab-text">
                PLAYERS
              </span>
            </NavItem>
            <NavItem eventKey={4} href="/">
              <span style={tabColor} className="tab-text">
                RANKINGS
              </span>
            </NavItem>
            <NavItem eventKey={5} href="/" disabled>
              <span style={tabColor} className="tab-text">
                LINEUPS
              </span>
            </NavItem>
            <NavItem eventKey={6} href="/">
              <span style={tabColor} className="tab-text">
                CONTRACTS
              </span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
