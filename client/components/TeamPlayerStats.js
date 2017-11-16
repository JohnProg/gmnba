import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";

export default class TeamPlayerStats extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={12}>
              <div>TEAM PLAYER STATS</div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
