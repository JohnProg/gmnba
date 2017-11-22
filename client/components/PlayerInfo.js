import React from "react";
import PlayerTabs from "./PlayerTabs";
import { Col, Button, Well, Row, Grid } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import PlayersList from "./PlayersList";

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

class PlayerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamStats: [],
      leagueStats: [],
      id: this.props.props.match.params.id,
      player: {}
    };
    this.getRoster = this.getRoster.bind(this);
    this.getTeamStats = this.getTeamStats.bind(this);
    this.getLeagueStats = this.getLeagueStats.bind(this);
    this.getPlayer = this.getPlayer.bind(this);
  }

  componentDidMount() {
    this.getRoster();
    this.getTeamStats();
    this.getLeagueStats();
    this.getPlayer();
  }

  getRoster() {
    var team = "San Antonio Spurs";
    axios
      .get("/api/teams/getTeamsPlayers", {
        params: {
          team: team
        }
      })
      .then(data => {
        var playersArray = data.data;
        this.props.addPlayers(playersArray);
      })
      .catch("error retrieving players!!!");
  }

  getTeamStats() {
    var team = "San Antonio Spurs";
    axios
      .get("/api/teams/getTeamStats", {
        params: {
          team: team
        }
      })
      .then(data => {
        this.setState({ teamStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
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
      .get(`/api/teams/getPlayerProfile/${this.state.id}`)
      .then(data => {
        console.log("PLAYER: \n", data.data);
        this.setState({ player: data.data }, () => {
          console.log(this.state);
        });
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
                    <img src="http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3134907.png&w=350&h=254" />
                  </div>
                </Col>
                <Col lg={7}>
                  <div id="name-text">
                    <div id="team-name">{this.state.player.name}</div>
                    <div id="info-text">
                      <div>Position: {this.state.player.position}</div>
                      <div>Age: {this.state.player.age}</div>
                      <div>Team: {this.state.player.team}</div>
                      <div>College: {this.state.player.college || ""}</div>
                    </div>
                  </div>
                  <hr id="info-text-break" />
                  <Row>
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
                      <div>PER 9.72</div>
                    </Col>
                    <Col lg={2}>
                      <div>MPG {this.state.player.mpg}</div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </Grid>
          <PlayerTabs
            players={this.props.players[0]}
            teamStats={this.state.teamStats}
            leagueStats={this.state.leagueStats}
            player={this.state.player}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
