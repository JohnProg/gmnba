import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import TeamPlayerEntry from "./TeamPlayerEntry";

export default class TeamPlayerRanks extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers() {
    if (this.props.players) {
      var stat = this.props.stat;
      this.props.players.sort(function(a, b) {
        return parseFloat(b[stat]) - parseFloat(a[stat]);
      });
      return this.props.players.map((player, i) => (
        <TeamPlayerEntry player={player} key={i} stat={stat} />
      ));
    }
  }

  render() {
    return (
      <div>
        <Table striped hover>
          <thead>
            <tr>
              <th>Pos</th>
              <th>Name</th>
              <th>{this.props.stat}</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers()}</tbody>
        </Table>
      </div>
    );
  }
}
