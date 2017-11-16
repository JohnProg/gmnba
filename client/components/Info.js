import React from "react";
import Tabs from "./Tabs";
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

class Info extends React.Component {
  constructor() {
    super();
    this.state = {
      teamStats: []
    };
    this.getRoster = this.getRoster.bind(this);
    this.getTeamStats = this.getTeamStats.bind(this);
  }

  componentDidMount() {
    this.getRoster();
    this.getTeamStats();
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

  render() {
    console.log(this.props.players[0]);
    return (
      <div>
        <div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} id="pic-col">
                  <div id="info-pic">
                    <img src="https://t1.rbxcdn.com/d3afdddcfa46f28486f11838ae236f8b" />
                  </div>
                </Col>
                <Col lg={7}>
                  <div id="name-text">
                    <div id="team-name">SAN ANTONIO SPURS</div>
                    <div id="info-text">
                      <div>Record: 7-5</div>
                      <div>#5 in the Western Conference</div>
                      <div>#3 in the Southwest Division</div>
                    </div>
                  </div>
                  <hr id="info-text-break" />
                  <Row>
                    <Col lg={2}>
                      <div>PPG 1st</div>
                    </Col>
                    <Col lg={2}>
                      <div>RPG 6th</div>
                    </Col>
                    <Col lg={2}>
                      <div>APG 13th</div>
                    </Col>
                    <Col lg={2}>
                      <div>ORTG 9th</div>
                    </Col>
                    <Col lg={2}>
                      <div>DRTG 2nd</div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </Grid>
          <Tabs
            players={this.props.players[0]}
            teamStats={this.state.teamStats}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
