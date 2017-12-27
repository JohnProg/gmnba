import React from "react";

export default class PlayerLeaderEntry36 extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.rank}</td>
        <td>
          <a href={`/player/${this.props.player.id}`}>
            {this.props.player.name}
          </a>{" "}
          <span style={{ fontSize: "10px" }}>{this.props.player.position}</span>
        </td>
        <td>
          {(this.props.player[this.props.stat] *
            36 /
            this.props.player.mpg
          ).toFixed(1)}
        </td>
      </tr>
    );
  }
}
