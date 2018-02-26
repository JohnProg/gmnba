import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import CollegeLeaderEntry36 from "./CollegeLeaderEntry36";

export default class CollegeLeadersTable8 extends React.Component {
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
        <CollegeLeaderEntry36
          player={player}
          key={i}
          rank={i + 1}
          stat={stat}
        />
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
