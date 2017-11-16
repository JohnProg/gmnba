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
    console.log("Props in PlayersList: ", this.props.players);
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={12}>
              <div id="roster-header">
                <div id="roster-header-text">2017-18 TEAM ROSTER</div>
              </div>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Experience</th>
                    <th>Height</th>
                    <th>Weight</th>
                    <th>College</th>
                  </tr>
                </thead>
                <tbody>{this.renderPlayers()}</tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
