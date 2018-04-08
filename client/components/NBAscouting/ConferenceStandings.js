import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  Checkbox,
  FormGroup,
  Table
} from "react-bootstrap";
import StandingsTeamEntry from "./StandingsTeamEntry";

export default class ConferenceStandings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      west: [],
      east: [],
      rankedWest: [],
      rankedEast: []
    };
    this.rankTeamsWest = this.rankTeamsWest.bind(this);
    this.rankTeamsEast = this.rankTeamsEast.bind(this);
    this.renderWestTeams = this.renderWestTeams.bind(this);
    this.renderEastTeams = this.renderEastTeams.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.west) {
      this.setState({ west: nextProps.west, east: nextProps.east }, () => {
        this.rankTeamsWest(this.state.west);
        this.rankTeamsEast(this.state.east);
      });
    }
  }

  rankTeamsWest(teams) {
    teams.sort(function(a, b) {
      return parseFloat(b.winPct) - parseFloat(a.winPct);
    });
    this.setState({ rankedWest: teams });
  }

  rankTeamsEast(teams) {
    teams.sort(function(a, b) {
      return parseFloat(b.winPct) - parseFloat(a.winPct);
    });
    this.setState({ rankedEast: teams });
  }

  renderWestTeams() {
    return this.state.rankedWest.map((team, i) => (
      <StandingsTeamEntry team={team} key={i} rank={i + 1} />
    ));
  }

  renderEastTeams() {
    return this.state.rankedEast.map((team, i) => (
      <StandingsTeamEntry team={team} key={i} rank={i + 1} />
    ));
  }

  render() {
    return (
      <div>
        <Col lg={6} md={6}>
          <Table striped hover>
            <thead>
              <tr
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white"
                }}
              >
                <th />
                <th />
                <th>W</th>
                <th>L</th>
                <th>Win Pct</th>
              </tr>
            </thead>
            <tbody>{this.renderWestTeams()}</tbody>
          </Table>
        </Col>
        <Col lg={6} md={6}>
          <Table striped hover>
            <thead>
              <tr
                style={{
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white"
                }}
              >
                <th />
                <th />
                <th>W</th>
                <th>L</th>
                <th>Win Pct</th>
              </tr>
            </thead>
            <tbody>{this.renderEastTeams()}</tbody>
          </Table>
        </Col>
      </div>
    );
  }
}
