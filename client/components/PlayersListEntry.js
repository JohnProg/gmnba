import React from "react";

export default class PlayersListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.player);
    return (
      <tr>
        <td>
          <a href={`/player/${this.props.player.id}`}>
            {this.props.player.name}
          </a>
        </td>
        <td>{this.props.player.position}</td>
        <td>{this.props.player.experience}</td>
        <td>{this.props.player.height}</td>
        <td>{this.props.player.weight}</td>
        <td>{this.props.player.college}</td>
      </tr>
    );
  }
}
