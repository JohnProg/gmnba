import React from "react";
import Tabs from "./Tabs";

import { Col, Button, Well, Row, Grid } from "react-bootstrap";

export default class Info extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Grid id="info-container">
          <Row className="full-height-row">
            <div id="info">
              <Col lg={3} id="pic-col">
                <div id="info-pic">
                  <img src="https://t1.rbxcdn.com/d3afdddcfa46f28486f11838ae236f8b" />
                </div>
              </Col>
              <Col lg={9}>
                <div id="info-text">
                  <div>TEAM NAME</div>
                </div>
                <hr />
              </Col>
            </div>
          </Row>
        </Grid>
        <Tabs />
      </div>
    );
  }
}
