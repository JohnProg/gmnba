import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import PlayerLeaderEntry from "./PlayerLeaderEntry";

export default class LeadersTable5 extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.props.players.sort(function(a, b) {
        return parseFloat(b[stat]) - parseFloat(a[stat]);
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
              <th>{this.props.stat}</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers(this.props.stat.toLowerCase())}</tbody>
        </Table>
      </div>
    );
  }
}
