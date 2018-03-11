import React from "react";
//import IntTeamTabs from "./IntTeamTabs";
import { Col, Button, Well, Row, Grid } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";

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

class IntTeamInfo extends React.Component {
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
    this.getiLeagueStats = this.getiLeagueStats.bind(this);
  }

  componentDidMount() {
    this.getTeam();
    this.getiLeagueStats();
    //this.getRoster();
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
    axios
      .get("/api/teams/getIntTeamsPlayers", {
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
      .get(`/api/teams/getIntTeamProfile/${this.state.teamId}`)
      .then(data => {
        this.setState({ team: data.data }, () => {
          this.getRoster();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getiLeagueStats() {
    axios
      .get("/api/teams/getiLeagueStats")
      .then(data => {
        this.setState({ leagueStats: data.data });
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
                <Col lg={3} sm={3} md={3} xs={12} id="pic-col">
                  <div id="info-pic">
                    <img
                      src={this.state.team.Logo}
                      style={{ maxHeight: "170px" }}
                    />
                  </div>
                </Col>
                <Col lg={9} xs={12} md={9} sm={9}>
                  <div id="name-text">
                    <div id="team-name">{this.state.team.Name}</div>
                    <div id="info-text">
                      <div>
                        Record: {this.state.team.W}-{this.state.team.L}
                      </div>
                    </div>
                  </div>
                  <hr id="info-text-break" />
                  <Row style={{ paddingBottom: "20px" }}>
                    <Col
                      lg={2}
                      xs={2}
                      xsOffset={1}
                      lgOffset={0}
                      mdOffset={0}
                      smOffset={0}
                    >
                      <div>
                        <span style={{ color: "#404040" }}>PPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.PTS}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>RPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.TRB}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>APG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.AST}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>STL</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.STL}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>BLK</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.BLK}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={2}>{this.sampleGLeague()}</Col>
              </div>
            </Row>
          </Grid>
          <IntTeamTabs
            team={this.state.team}
            players={this.props.players[0]}
            leagueStats={this.state.leagueStats}
          />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntTeamInfo);
