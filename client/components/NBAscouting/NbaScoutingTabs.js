import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import LeagueLeaders2 from "./LeagueLeaders2";
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
      component = <LeagueLeaders2 players={this.props.players} />;
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
            style={{
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            <NavItem eventKey={1} href="/">
              <span className="tab-text" style={{ color: "white" }}>
                League Leaders
              </span>
            </NavItem>
            <NavItem eventKey={2} href="/">
              <span className="tab-text" style={{ color: "white" }}>
                Player Comparison
              </span>
            </NavItem>
            <NavItem eventKey={3} href="/">
              <span className="tab-text" style={{ color: "white" }}>
                Team Comparison
              </span>
            </NavItem>
            <NavItem eventKey={4} href="/" disabled>
              <span className="tab-text" style={{ color: "white" }}>
                Player Finder
              </span>
            </NavItem>
            <NavItem eventKey={5} title="Item">
              <span className="tab-text" style={{ color: "white" }}>
                Stats
              </span>
            </NavItem>
            <NavItem eventKey={6} title="Item">
              <span className="tab-text" style={{ color: "white" }}>
                Standings
              </span>
            </NavItem>
            <NavItem eventKey={7} title="Item">
              <span className="tab-text" style={{ color: "white" }}>
                Upcoming FAs
              </span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
