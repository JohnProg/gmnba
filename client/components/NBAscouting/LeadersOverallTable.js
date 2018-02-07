import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import PlayerLeaderStarEntry from "./PlayerLeaderStarEntry";

export default class LeadersOverallTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getOverall = this.getOverall.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.getOverall(this.props.players);
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

  getOverall(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var per = parseFloat(player.per) * 0.4;
      var bpm = parseFloat(player.bpm) * 0.2;
      var ws48 = parseFloat(player.wsFourtyEight) * 0.1;
      var ws = parseFloat(player.ws) * 0.1;
      var vorp = parseFloat(player.vorp) * 0.25;
      var weightedOvr = per + bpm + ws48 + ws + vorp;
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
