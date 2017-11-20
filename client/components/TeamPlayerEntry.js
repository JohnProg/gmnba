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
        <td>{this.props.player.name}</td>
        <td>{this.props.player.pts}</td>
      </tr>
    );
  }
}
