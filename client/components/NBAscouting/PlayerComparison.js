import React from "react";
import PlayerScatter from "./PlayerScatter";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class PlayerComparison extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            <PlayerScatter players={this.props.players} />
          </Col>
        </Row>
      </div>
    );
  }
}
