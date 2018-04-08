import React from "react";

export default class GTeamPlayerEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white"
        }}
      >
        <td>{this.props.player.position}</td>
        <td>
          <a href={`/gleague-player/${this.props.player.id}`}>
            <span style={{ color: "white" }}>{this.props.player.name}</span>
          </a>
        </td>
        <td>{this.props.player[this.props.stat]}</td>
      </tr>
    );
  }
}
