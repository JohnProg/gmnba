import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import CollegeLeaderStarEntry from "./CollegeLeaderStarEntry";

export default class CollegeLeadersDefenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getDefense = this.getDefense.bind(this);
  }

  renderPlayers(stat) {
    if (this.props.players) {
      this.getDefense(this.props.players);
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

  getDefense(players) {
    for (var i = 0; i < players.length; i++) {
      let player = players[i];
      var dbpm = parseFloat(player.dbpm);
      var dws = parseFloat(player.dws);
      var defRating = dbpm + dws;
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
