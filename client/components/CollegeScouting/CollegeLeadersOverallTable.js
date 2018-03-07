import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import CollegeLeaderStarEntry from "./CollegeLeaderStarEntry";

export default class CollegeLeadersOverallTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getOverall = this.getOverall.bind(this);
    this.scaleStat = this.scaleStat.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.getOverall(this.props.players);
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

  getOverall(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var scaledPer = this.scaleStat(34.2, parseFloat(player.per), 5.0) * 0.45;
      var scaledBpm = this.scaleStat(16.8, parseFloat(player.bpm), -3.5) * 0.35;
      var scaledWs48 =
        this.scaleStat(0.309, parseFloat(player.wsFourtyEight), 0) * 0.1;
      var scaledWs = this.scaleStat(5.8, parseFloat(player.ws), 0) * 0.1;
      var weightedOvr = scaledPer + scaledBpm + scaledWs48 + scaledWs;
      // var per = parseFloat(player.per) * 0.5;
      // var bpm = parseFloat(player.bpm) * 0.2;
      // var ws48 = parseFloat(player.wsFourtyEight) * 0.15;
      // var ws = parseFloat(player.ws) * 0.15;
      // var weightedOvr = per + bpm + ws48 + ws;
      player["ovr"] = weightedOvr;
    }
    players.sort(function(a, b) {
      return parseFloat(b.ovr) - parseFloat(a.ovr);
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
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers("ovr")}</tbody>
        </Table>
      </div>
    );
  }
}
