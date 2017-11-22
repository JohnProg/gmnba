import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayerRankGauges from "./PlayerRankGauges";
import PlayerPositionAverages from "./PlayerPositionAverages";
import TeamRatings from "./TeamRatings";
import PlayerPolarArea from "./PlayerPolarArea";
import PlayerPolarColumn from "./PlayerPolarColumn";

export default class PlayerRatings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var headerStyle = {
      backgroundColor: "#702f8a",
      height: "50px",
      lineHeight: "50px",
      fontSize: "20px",
      paddingLeft: "25px",
      color: "#ffc72c"
    };
    return (
      <div>
        <Grid>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                PLAYER RATINGS
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={5} lgOffset={1}>
              <PlayerPolarColumn />
            </Col>
            <Col lg={5}>
              <PlayerPolarArea />
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={8} lgOffset={2}>
              <TeamRatings />
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                POSITION RANKINGS
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <div
                className="card"
                style={{ height: "300px", backgroundColor: "white" }}
              >
                <PlayerRankGauges />
              </div>
            </Col>
          </Row>

          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                POSITION AVERAGES
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <PlayerPositionAverages />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
