import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import PlayerLeaderStarEntry from "./PlayerLeaderStarEntry";

export default class LeadersDefenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getDefense = this.getDefense.bind(this);
    this.scaleStat = this.scaleStat.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.getDefense(this.props.players);
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

  scaleStat(high, stat, low) {
    var scaled = 100 / (high - low) * (stat - low);
    return scaled;
  }

  getDefense(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var scaledDbpm = this.scaleStat(5.8, parseFloat(player.dbpm), -4.0) * 0.5;
      var scaledDws = this.scaleStat(4.1, parseFloat(player.dws), 0) * 0.5;
      // var dbpm = parseFloat(player.dbpm);
      // var dws = parseFloat(player.dws);
      var defRating = scaledDbpm + scaledDws;
      player["def"] = defRating;
    }
    players.sort(function(a, b) {
      return parseFloat(b.def) - parseFloat(a.def);
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
              <th>Def</th>
            </tr>
          </thead>
          <tbody>{this.renderPlayers("def")}</tbody>
        </Table>
      </div>
    );
  }
}
