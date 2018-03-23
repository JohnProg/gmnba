import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import GPlayerLeaderStarEntry from "./GPlayerLeaderStarEntry";

export default class GLeagueLeadersOffenseTable extends React.Component {
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
        <GPlayerLeaderStarEntry
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
      // var scaledObpm =
      //   this.scaleStat(10.2, parseFloat(player.obpm), -6.0) * 0.5;
      // var scaledOws = this.scaleStat(8.7, parseFloat(player.ows), -2.0) * 0.5;
      var scaledOFF = this.scaleStat(117.0, parseFloat(player.obpm), 87.0);
      var offRating = scaledOFF;
      // var obpm = parseFloat(player.obpm);
      // var ows = parseFloat(player.ows);
      // var offRating = obpm + ows;
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
