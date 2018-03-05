import React from "react";
import axios from "axios";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import AddPlayerSearch from "./AddPlayerSearch";
import AddPlayerSearch2 from "./AddPlayerSearch2";

export default class PlayerComparison extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var headerStyle = {
      backgroundColor: this.props.colors.Color_Main,
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "25px",
      color: this.props.colors.Color_Sec
    };
    var stat = this.props.player;
    return (
      <div>
        <Grid>
          <Row className="chart-row">
            <Col lg={3} md={4}>
              <div className="card">
                <div style={headerStyle}>
                  <div>Player Comparison</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px", paddingBottom: "40px" }}>
            <Col lg={6} xs={12} md={6}>
              <AddPlayerSearch
                list={this.props.player}
                colors={this.props.colors}
              />
            </Col>
            <Col lg={6} xs={12} md={6}>
              <AddPlayerSearch2
                list={this.props.players}
                colors={this.props.colors}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
