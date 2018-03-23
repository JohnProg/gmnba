import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import GPlayerLeaderStarEntry from "./GPlayerLeaderStarEntry";

export default class GLeagueLeadersOverallTable extends React.Component {
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

  getOverall(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var scaledPIE = this.scaleStat(0.182, parseFloat(player.vorp), 0) * 0.4;
      var scaledOffRtg =
        this.scaleStat(117.0, parseFloat(player.obpm), 87.0) * 0.3;
      var scaledDefRtg =
        this.scaleStat(-96.0, parseFloat(player.dbpm) * -1, -115.0) * 0.3;
      // var scaledBpm = this.scaleStat(10.9, parseFloat(player.bpm), -6.0) * 0.3;
      // var scaledWs48 =
      //   this.scaleStat(0.299, parseFloat(player.wsFourtyEight), -0.03) * 0.1;
      // var scaledWs = this.scaleStat(11.2, parseFloat(player.ws), -1.0) * 0.1;
      // var scaledVorp = this.scaleStat(5.9, parseFloat(player.vorp), -1.2) * 0.1;
      var weightedOvr = scaledPIE + scaledOffRtg + scaledDefRtg;
      // var per = parseFloat(player.per) * 0.4;
      // var bpm = parseFloat(player.bpm) * 0.2;
      // var ws48 = parseFloat(player.wsFourtyEight) * 0.1;
      // var ws = parseFloat(player.ws) * 0.1;
      // var vorp = parseFloat(player.vorp) * 0.25;
      // var weightedOvr = per + bpm + ws48 + ws + vorp;
      // console.log(player.name + ": " + scaledVorp);

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
