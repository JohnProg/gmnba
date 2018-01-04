import React from "react";
import TeamScatter from "./TeamScatter";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class PlayerFinder extends React.Component {
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
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              Find Player
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={10} lgOffset={1}>
            <div
              className="card"
              style={{ height: "100px", backgroundColor: "white" }}
            >
              Find Player
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
