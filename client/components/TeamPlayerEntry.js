import React from "react";

export default class TeamPlayerEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.player);
    return (
      <tr>
        <td>{this.props.player.position}</td>
        <td>
          <a href={`/player/${this.props.player.id}`}>
            {this.props.player.name}
          </a>
        </td>
        <td>{this.props.player.pts}</td>
      </tr>
    );
  }
}
