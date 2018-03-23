import React from "react";
import GTeamScatter from "./GTeamScatter";
//import AddCTeamSearch from "./AddCTeamSearch";
//import AddCTeamSearch2 from "./AddCTeamSearch2";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class GTeamComparison extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.teams);
    var headerStyle = {
      backgroundColor: "#3f336d",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    return (
      <div>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={3} lgOffset={1} md={3}>
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
            <GTeamScatter teams={this.props.teams} />
          </Col>
        </Row>
        {/*<Row style={{ paddingTop: "30px" }}>
          <Col lg={3} lgOffset={1} md={3}>
            <div className="card" style={headerStyle}>
              Team Comparison
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px", paddingBottom: "40px" }}>
          <Col lg={5} lgOffset={1} md={5} mdOffset={1}>
            <AddCTeamSearch list={this.props.teams} />
          </Col>
          <Col lg={5} md={5}>
            <AddCTeamSearch2 list={this.props.teams} />
          </Col>
        </Row>*/}
      </div>
    );
  }
}
