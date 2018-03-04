import React from "react";

export default class CStatsPlayersEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <td>
          <a href={`/college-player/${this.props.player.id}`}>
            {this.props.player.name}
          </a>
        </td>
        <td>{this.props.player.position}</td>
        <td>{this.props.player.gamesPlayed}</td>
        <td>{this.props.player.fgm}</td>
        <td>{this.props.player.fga}</td>
        <td>{this.props.player.fgPct}</td>
        <td>{this.props.player.threePt}</td>
        <td>{this.props.player.threePtAtt}</td>
        <td>{this.props.player.threePtPct}</td>
        <td>{this.props.player.twoPt}</td>
        <td>{this.props.player.twoPtAtt}</td>
        <td>{this.props.player.twoPtPct}</td>
        <td>{this.props.player.ft}</td>
        <td>{this.props.player.fta}</td>
        <td>{this.props.player.freeThrowPct}</td>
        <td>{this.props.player.orb}</td>
        <td>{this.props.player.drb}</td>
        <td>{this.props.player.trb}</td>
        <td>{this.props.player.ast}</td>
        <td>{this.props.player.stl}</td>
        <td>{this.props.player.blk}</td>
        <td>{this.props.player.tov}</td>
        <td>{this.props.player.pf}</td>
        <td>{this.props.player.pts}</td>
      </tr>
    );
  }
}
