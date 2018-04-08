import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import GLeagueLeaders2 from "./GLeagueLeaders2";
import GPlayerComparison from "./GPlayerComparison";
import GTeamComparison from "./GTeamComparison";
// import PlayerFinder from "../NBAscouting/PlayerFinder";
import GLeagueStats from "./GLeagueStats";

export default class GLeagueScoutingTabs extends React.Component {
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
    //console.log(this.props.teams);
    let component;
    if (this.state.key === 1)
      component = <GLeagueLeaders2 players={this.props.players} />;
    if (this.state.key === 2)
      component = <GPlayerComparison players={this.props.players} />;
    if (this.state.key === 3)
      component = <GTeamComparison teams={this.props.teams} />;
    // if (this.state.key === 4)
    //   component = <PlayerFinder players={this.props.players} />;
    if (this.state.key === 5)
      component = <GLeagueStats players={this.props.players} />;
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
                G-League Leaders
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
            <NavItem eventKey={6} title="Item" disabled>
              <span className="tab-text" style={{ color: "white" }}>
                Standings
              </span>
            </NavItem>
          </Nav>
        </div>
        <div id="tabs-container">{component}</div>
      </div>
    );
  }
}
