import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import CollegeTeamRankGauges from "./CollegeTeamRankGauges";
import TeamAverageComparison from "../TeamAverageComparison";
import CollegeTeamRatings from "./CollegeTeamRatings";

export default class CollegeTeamLeagueRanks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var headerStyle = {
      backgroundColor: this.props.team.Color_Main || "#eee",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: this.props.team.Color_Sec || "#000"
    };
    return (
      <div>
        <Grid>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1} md={3}>
              <div className="card header" style={headerStyle}>
                League Rankings
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <div
                className="card"
                style={{ paddingBottom: "20px", backgroundColor: "white" }}
              >
                <CollegeTeamRankGauges
                  team={this.props.team}
                  league={this.props.leagueStats}
                />
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1} md={3} sm={4}>
              <div className="card header" style={headerStyle}>
                Team Ratings
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <CollegeTeamRatings team={this.props.team} />
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1} md={3}>
              <div className="card header" style={headerStyle}>
                League Averages
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <TeamAverageComparison
                team={this.props.team}
                league={this.props.leagueStats}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
