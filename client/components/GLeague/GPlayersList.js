import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import GPlayerListEntry from "./GPlayerListEntry.js";

export default class GPlayersList extends React.Component {
  constructor() {
    super();
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers() {
    if (this.props.players) {
      return this.props.players.map((player, i) => (
        <GPlayerListEntry player={player} key={i} />
      ));
    }
  }

  render() {
    var headerStyle = {
      lineHeight: "50px",
      backgroundColor: this.props.team.Color_Main,
      fontSize: "20px",
      paddingLeft: "15px",
      color: this.props.team.Color_Sec
    };
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={12}>
              <div className="card">
                <div id="roster-header">
                  <div style={headerStyle}>2017-18 TEAM ROSTER</div>
                </div>
                <Table striped hover responsive>
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white"
                      }}
                    >
                      <th>Name</th>
                      <th>Position</th>
                      <th>Overall</th>
                      <th>Offense</th>
                      <th>Defense</th>
                      <th>Height</th>
                      <th>Weight</th>
                      <th>High School</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderPlayers()}</tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
