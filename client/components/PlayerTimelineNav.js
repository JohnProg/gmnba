import React from "react";
import axios from "axios";

export default class PlayerTimelineNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: { Logo: "" }
    };
    this.getTeamColors = this.getTeamColors.bind(this);
  }

  componentDidMount() {
    this.getTeamColors(this.props.player.team);
  }

  getTeamColors(team) {
    axios
      .get(`api/teams/getTeamColors/${team}`)
      .then(data => {
        this.setState({ team: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)"
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "grey",
            fontSize: "22px",
            paddingBottom: "5px",
            paddingTop: "10px"
          }}
        >
          <img
            style={{ height: "80px", margin: "0 auto" }}
            src={this.state.team.Logo}
          />
          <div style={{ paddingTop: "3px" }}>{this.props.player.year}</div>
        </div>
      </div>
    );
  }
}
