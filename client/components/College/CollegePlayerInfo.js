import React from "react";
import CollegePlayerTabs from "./CollegePlayerTabs";
import { Col, Button, Well, Row, Grid } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import PlayersList from "../PlayersList";

const mapStateToProps = state => {
  return {
    players: state.playersReducer.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPlayers(players) {
      dispatch({
        type: "ADD_PLAYERS",
        payload: players
      });
    }
  };
};

class CollegePlayerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStats: [],
      leagueStats: [],
      id: this.props.props.match.params.id,
      player: {},
      colors: {}
    };
    this.getLeagueStats = this.getLeagueStats.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
    this.getTeamColors = this.getTeamColors.bind(this);
  }

  componentDidMount() {
    this.getLeagueStats();
    this.getPlayer();
  }

  getLeagueStats() {
    axios
      .get("/api/teams/getLeagueStats")
      .then(data => {
        this.setState({ leagueStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getPlayer() {
    axios
      .get(`/api/teams/getCollegePlayerProfile/${this.state.id}`)
      .then(data => {
        console.log(data.data);
        this.getTeamColors(data.data.team);
        this.setState({ player: data.data }, () => {});
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeamColors(team) {
    axios
      .get(`api/teams/getCollegeTeamColors/${team}`)
      .then(data => {
        this.setState({ colors: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} id="pic-col">
                  <div id="info-pic-team">
                    <img src="https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443" />
                  </div>
                </Col>
                <Col lg={6}>
                  <div id="name-text">
                    <div id="team-name">{this.state.player.name}</div>
                    <div id="info-text">
                      <div>Position: {this.state.player.position}</div>
                      <div>Age: {this.state.player.age}</div>
                      <div>Team: {this.state.player.team}</div>
                      <div>College: {this.state.player.college || "None"}</div>
                    </div>
                  </div>
                  <hr id="info-text-break" />
                  <Row id="info-box-stats">
                    <Col lg={2}>
                      <div>PPG {this.state.player.pts}</div>
                    </Col>
                    <Col lg={2}>
                      <div>RPG {this.state.player.trb}</div>
                    </Col>
                    <Col lg={2}>
                      <div>APG {this.state.player.ast}</div>
                    </Col>
                    <Col lg={2}>
                      <div>PER {this.state.player.per || "N/A"}</div>
                    </Col>
                    <Col lg={2}>
                      <div>MPG {this.state.player.mpg}</div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={2}>
                  <div id="logo-pic">
                    <img id="teamLogoPic" src={this.state.colors.Logo} />
                    <div id="teamLogoHeader">{this.state.player.team}</div>
                  </div>
                </Col>
              </div>
            </Row>
          </Grid>
          <CollegePlayerTabs
            players={this.props.players[0]}
            teamStats={this.state.teamStats}
            leagueStats={this.state.leagueStats}
            player={this.state.player}
            colors={this.state.colors}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollegePlayerInfo);
