import React from "react";

export default class CollegePlayersListEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.player);
    return (
      <tr>
        <td>
          <a href={`/college-player/${this.props.player.id}`}>
            {this.props.player.name}
          </a>
        </td>
        <td>{this.props.player.position}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>{this.props.player.height}</td>
        <td>{this.props.player.weight}</td>
        <td>{this.props.player.highschool}</td>
      </tr>
    );
  }
}
