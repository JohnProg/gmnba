import React from "react";

export default class CollegeTeamPlayerEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>{this.props.player.position}</td>
        <td>
          <a href={`/college-player/${this.props.player.id}`}>
            {this.props.player.name}
          </a>
        </td>
        <td>{this.props.player[this.props.stat]}</td>
      </tr>
    );
  }
}
