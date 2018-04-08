import React from "react";

export default class StandingsTeamEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var headerStyle = {
      backgroundColor: this.props.team.Color_Main,
      height: "50px",
      lineHeight: "50px",
      fontSize: "18px",
      paddingLeft: "20px",
      color: this.props.team.Color_Sec
    };
    return (
      <tr
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white"
        }}
      >
        <td>{this.props.rank}</td>
        <td>
          <a href={`/team/${this.props.team.id}`}>
            <span style={{ color: "white" }}>{this.props.team.Name}</span>
          </a>
        </td>
        <td>{this.props.team.W}</td>
        <td>{this.props.team.L}</td>
        <td>{this.props.team.winPct.toFixed(3)}</td>
      </tr>
    );
  }
}
