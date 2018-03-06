import React from "react";
import TeamScatter from "./TeamScatter";
import AddTeamSearch from "./AddTeamSearch";
import AddTeamSearch2 from "./AddTeamSearch2";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class TeamComparison extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.teams);
    var headerStyle = {
      backgroundColor: "#d00000",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    return (
      <div>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={3} lgOffset={1} md={4}>
            <div className="card" style={headerStyle}>
              League Comparison
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "40px"
          }}
        >
          <Col lg={10} lgOffset={1}>
            <TeamScatter teams={this.props.teams} />
          </Col>
        </Row>
        <Row style={{ paddingTop: "30px" }}>
          <Col lg={3} lgOffset={1} md={4}>
            <div className="card" style={headerStyle}>
              Team Comparison
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <Col lg={5} lgOffset={1} md={6}>
            <AddTeamSearch list={this.props.teams} />
          </Col>
          <Col lg={5} md={6}>
            <AddTeamSearch2 list={this.props.teams} />
          </Col>
        </Row>
      </div>
    );
  }
}
