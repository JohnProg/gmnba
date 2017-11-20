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
  constructor() {
    super();
    this.state = {
      teamStats: [],
      leagueStats: []
    };
    this.getRoster = this.getRoster.bind(this);
    this.getTeamStats = this.getTeamStats.bind(this);
    this.getLeagueStats = this.getLeagueStats.bind(this);
  }

  componentDidMount() {
    this.getRoster();
    this.getTeamStats();
    this.getLeagueStats();
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
        console.log("TEAM STATS\n", data.data);
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
        console.log("ALL LEAGUE TEAM STATS\n", data);
        this.setState({ leagueStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.props.players[0]);
    return (
      <div>
        <div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} id="pic-col">
                  <div id="info-pic-team">
                    <img src="http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/4066421.png&w=350&h=254" />
                  </div>
                </Col>
                <Col lg={7}>
                  <div id="name-text">
                    <div id="team-name">Lonzo Ball</div>
                    <div id="info-text">
                      <div>Position: PG</div>
                      <div>Age: 20</div>
                      <div>Team: Los Angeles Lakers</div>
                      <div>College: UCLA</div>
                    </div>
                  </div>
                  <hr id="info-text-break" />
                  <Row>
                    <Col lg={2}>
                      <div>PPG 8.8</div>
                    </Col>
                    <Col lg={2}>
                      <div>RPG 6.6</div>
                    </Col>
                    <Col lg={2}>
                      <div>APG 6.8</div>
                    </Col>
                    <Col lg={2}>
                      <div>PER 9.72</div>
                    </Col>
                    <Col lg={2}>
                      <div>MPG 32.7</div>
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
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
