import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import PlayerLeaderEntry from "./PlayerLeaderEntry";

export default class LeadersTable4 extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.props.players.sort(function(a, b) {
        return parseFloat(b.pts) - parseFloat(a.pts);
      });
      return this.props.players.map((player, i) => (
        <PlayerLeaderEntry player={player} key={i} rank={i + 1} stat={stat} />
      ));
    }
  }

  render() {
    return (
      <div>
        <Table striped hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Pts</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers("pts")}</tbody>
        </Table>
      </div>
    );
  }
}
