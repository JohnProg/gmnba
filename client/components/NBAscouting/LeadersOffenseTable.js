import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import PlayerLeaderStarEntry from "./PlayerLeaderStarEntry";

export default class LeadersOffenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getOffense = this.getOffense.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.getOffense(this.props.players);
      // this.props.players.sort(function(a, b) {
      //   return parseFloat(b.pts) - parseFloat(a.pts);
      // });
      return this.props.players.map((player, i) => (
        <PlayerLeaderStarEntry
          player={player}
          key={i}
          rank={i + 1}
          stat={stat}
        />
      ));
    }
  }

  getOffense(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var obpm = parseFloat(player.obpm);
      var ows = parseFloat(player.ows);
      var offRating = obpm + ows;
      player["off"] = offRating;
    }
    players.sort(function(a, b) {
      return parseFloat(b.off) - parseFloat(a.off);
    });
    console.log(players);
  }

  render() {
    return (
      <div>
        <Table striped hover>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Off</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers("off")}</tbody>
        </Table>
      </div>
    );
  }
}
