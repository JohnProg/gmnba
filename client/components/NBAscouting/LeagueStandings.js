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

export default class LeagueStandings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      rankedTeams: []
    };
    this.rankTeams = this.rankTeams.bind(this);
    this.renderTeams = this.renderTeams.bind(this);
  }

  componentDidMount() {
    console.log(this.props.teams);
    if (this.props.teams) {
      this.setState({ teams: this.props.teams }, () => {
        this.rankTeams(this.state.teams);
      });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.teams) {
  //     this.setState({ teams: nextProps.teams }, () => {
  //       this.rankTeams(this.state.teams);
  //     });
  //   }
  // }

  rankTeams(teams) {
    teams.sort(function(a, b) {
      return parseFloat(b.winPct) - parseFloat(a.winPct);
    });
    this.setState({ rankedTeams: teams });
  }

  renderTeams() {
    return this.state.rankedTeams.map((team, i) => (
      <StandingsTeamEntry team={team} key={i} rank={i + 1} />
    ));
  }

  render() {
    console.log("state: ", this.state);
    return (
      <div>
        <Col lg={8}>
          <Table striped hover>
            <thead>
              <tr>
                <th />
                <th />
                <th>W</th>
                <th>L</th>
                <th>Win Pct</th>
              </tr>
            </thead>
            <tbody>{this.renderTeams()}</tbody>
          </Table>
        </Col>
      </div>
    );
  }
}
