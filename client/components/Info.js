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
  constructor(props) {
    super(props);
    this.state = {
      teamStats: [],
      leagueStats: [],
      teamId: this.props.props.match.params.id,
      team: {}
    };
    this.getRoster = this.getRoster.bind(this);
    this.getTeam = this.getTeam.bind(this);
    this.getLeagueStats = this.getLeagueStats.bind(this);
  }

  componentDidMount() {
    this.getTeam();
    this.getLeagueStats();
    //this.getRoster();
    console.log("PROPS ON MOUNT: ", this.props);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps) {
  //     console.log("NEXTPROPS: ", nextProps.props.match.params.id);
  //     this.setState({ id: nextProps.props.match.params.id }, () => {
  //       this.getTeam();
  //       //this.createChart();
  //     });
  //   }
  // }

  getRoster() {
    var team = this.state.team.Name;
    console.log("get roster fired! TEAM: ", team);
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

  getTeam() {
    axios
      .get(`/api/teams/getTeamProfile/${this.state.teamId}`)
      .then(data => {
        console.log("TEAM: \n", data.data);
        this.setState({ team: data.data }, () => {
          this.getRoster();
          console.log("TEAM STATE: ", this.state);
        });
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
    console.log("props in info", this.props);
    return (
      <div>
        <div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} id="pic-col">
                  <div id="info-pic">
                    <img src={this.state.team.Logo} />
                  </div>
                </Col>
                <Col lg={7}>
                  <div id="name-text">
                    <div id="team-name">{this.state.team.Name}</div>
                    <div id="info-text">
                      <div>
                        Record: {this.state.team.W}-{this.state.team.L}
                      </div>
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
            team={this.state.team}
            players={this.props.players[0]}
            teamStats={this.state.teamStats}
            leagueStats={this.state.leagueStats}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
