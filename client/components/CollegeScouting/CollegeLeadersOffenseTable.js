import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import CollegeLeaderStarEntry from "./CollegeLeaderStarEntry";

export default class CollegeLeadersOffenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getOffense = this.getOffense.bind(this);
    this.scaleStat = this.scaleStat.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.getOffense(this.props.players);
      // this.props.players.sort(function(a, b) {
      //   return parseFloat(b.pts) - parseFloat(a.pts);
      // });
      return this.props.players.map((player, i) => (
        <CollegeLeaderStarEntry
          player={player}
          key={i}
          rank={i + 1}
          stat={stat}
        />
      ));
    }
  }

  scaleStat(high, stat, low) {
    var scaled = 100 / (high - low) * (stat - low);
    return scaled;
  }

  getOffense(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var scaledObpm =
        this.scaleStat(12.0, parseFloat(player.obpm), -4.0) * 0.5;
      var scaledOws = this.scaleStat(4.5, parseFloat(player.ows), -0.1) * 0.5;
      // var obpm = parseFloat(player.obpm);
      // var ows = parseFloat(player.ows);
      var offRating = scaledObpm + scaledOws;
      player["off"] = offRating;
    }
    players.sort(function(a, b) {
      return parseFloat(b.off) - parseFloat(a.off);
    });
    //console.log(players);
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
