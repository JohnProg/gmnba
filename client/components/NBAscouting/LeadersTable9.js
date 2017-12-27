import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import PlayerLeaderEntry36 from "./PlayerLeaderEntry36";

export default class LeadersTable9 extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.props.players.sort(function(a, b) {
        return (
          parseFloat(b[stat] * 36 / b.mpg) - parseFloat(a[stat] * 36 / a.mpg)
        );
      });
      return this.props.players.map((player, i) => (
        <PlayerLeaderEntry36 player={player} key={i} rank={i + 1} stat={stat} />
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
              <th>Ast</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers("ast")}</tbody>
        </Table>
      </div>
    );
  }
}
