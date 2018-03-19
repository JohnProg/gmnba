import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import LeagueLeaders from "./LeagueLeaders";
import PlayerComparison from "./PlayerComparison";
import TeamComparison from "./TeamComparison";
import PlayerFinder from "./PlayerFinder";
import Stats from "./Stats";
import Standings from "./Standings";
import UpcomingFAs from "./UpcomingFAs";

export default class NbaScoutingTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 2
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
  }

  render() {
    let component;
    if (this.state.key === 1)
      component = <LeagueLeaders players={this.props.players} />;
    if (this.state.key === 2)
      component = <PlayerComparison players={this.props.players} />;
    if (this.state.key === 3)
      component = <TeamComparison teams={this.props.teams} />;
    if (this.state.key === 4)
      component = <PlayerFinder players={this.props.players} />;
    if (this.state.key === 5)
      component = (
        <Stats players={this.props.players} teams={this.props.teams} />
      );
    if (this.state.key === 6)
      component = <Standings teams={this.props.teams} />;
    if (this.state.key === 7)
      component = <UpcomingFAs contracts={this.props.contracts} />;
    return (
      <div>
        <div className="card">
          <Nav
            bsStyle="pills"
            activeKey={this.state.key}
            onSelect={this.handleSelect}
            justified
          >
            <NavItem eventKey={1} href="/">
              <span className="tab-text">League Leaders</span>
            </NavItem>
            <NavItem eventKey={2} href="/">
              <span className="tab-text">Player Comparison</span>
            </NavItem>
            <NavItem eventKey={3} href="/">
              <span className="tab-text">Team Comparison</span>
            </NavItem>
            <NavItem eventKey={4} href="/" disabled>
              <span className="tab-text">Player Finder</span>
            </NavItem>
            <NavItem eventKey={5} title="Item">
              <span className="tab-text">Stats</span>
            </NavItem>
            <NavItem eventKey={6} title="Item">
              <span className="tab-text">Standings</span>
            </NavItem>
            <NavItem eventKey={7} title="Item">
              <span className="tab-text">Upcoming FAs</span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
