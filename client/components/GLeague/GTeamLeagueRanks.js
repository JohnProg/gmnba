import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import GTeamRankGauges from "./GTeamRankGauges";
import TeamAverageComparison from "../TeamAverageComparison";
import GTeamRatings from "./GTeamRatings";

export default class GTeamLeagueRanks extends React.Component {
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
                style={{
                  paddingBottom: "20px",
                  backgroundColor: "rgba(0,0,0,0.6)"
                }}
              >
                <GTeamRankGauges
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
              <GTeamRatings team={this.props.team} />
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1} md={3}>
              <div className="card header" style={headerStyle}>
                League Averages
              </div>
            </Col>
          </Row>
          <Row className="chart-row" style={{ paddingBottom: "20px" }}>
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
