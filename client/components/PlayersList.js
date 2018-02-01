import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import PlayerListEntry from "./PlayersListEntry.js";

export default class PlayersList extends React.Component {
  constructor() {
    super();
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers() {
    if (this.props.players) {
      return this.props.players.map((player, i) => (
        <PlayerListEntry player={player} key={i} />
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
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Overall</th>
                      <th>Offense</th>
                      <th>Defense</th>
                      <th>Experience</th>
                      <th>Height</th>
                      <th>Weight</th>
                      <th>College</th>
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
