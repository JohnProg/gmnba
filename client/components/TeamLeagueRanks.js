import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import TeamRankGuages from "./TeamRankGuages";
import TeamAverageComparison from "./TeamAverageComparison";
import TeamRatings from "./TeamRatings";

export default class TeamLeagueRanks extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("Props in Rankings: \n", this.props.leagueStats);
    return (
      <div>
        <Grid>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card title-header">LEAGUE RANKINGS</div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <div
                className="card"
                style={{ height: "300px", backgroundColor: "white" }}
              >
                <TeamRankGuages />
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card title-header">TEAM RATINGS</div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <TeamRatings />
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card title-header">LEAGUE AVERAGES</div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <TeamAverageComparison />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
