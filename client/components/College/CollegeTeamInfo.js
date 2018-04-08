import React from "react";
import CollegeTeamTabs from "./CollegeTeamTabs";
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

class CollegeTeamInfo extends React.Component {
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
    this.getcLeagueStats = this.getcLeagueStats.bind(this);
    this.sampleGLeague = this.sampleGLeague.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  componentDidMount() {
    this.getTeam();
    this.getcLeagueStats();
    //this.getRoster();
  }

  checkLoad() {
    if (JSON.stringify(this.state.team) != "{}") {
      return (
        <div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} sm={3} md={3} xs={12} id="pic-col">
                  <div id="info-pic">
                    <img
                      src={this.state.team.Logo}
                      style={{ maxHeight: "150px" }}
                    />
                  </div>
                </Col>
                <Col lg={9} xs={12} md={9} sm={9}>
                  <div id="name-text" style={{ color: "white" }}>
                    <div id="team-name">{this.state.team.Name}</div>
                    <div id="info-text">
                      <div>
                        Record: {this.state.team.W}-{this.state.team.L}
                      </div>
                    </div>
                  </div>
                  <hr id="info-text-break" />
                  <Row style={{ paddingBottom: "10px" }}>
                    <Col
                      lg={2}
                      xs={2}
                      xsOffset={1}
                      lgOffset={0}
                      mdOffset={0}
                      smOffset={0}
                    >
                      <div style={{ color: "white" }}>
                        <span>PPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.PTS}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div style={{ color: "white" }}>
                        <span>RPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.TRB}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div style={{ color: "white" }}>
                        <span>APG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.AST}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div style={{ color: "white" }}>
                        <span>STL</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.STL}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div style={{ color: "white" }}>
                        <span>BLK</span>{" "}
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
          <CollegeTeamTabs
            team={this.state.team}
            players={this.props.players[0]}
            leagueStats={this.state.leagueStats}
          />
        </div>
      );
    } else {
      return (
        <div
          style={{ textAlign: "center", marginTop: "250px", color: "white" }}
        >
          <img
            style={{ height: "150px" }}
            src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
          />
          <div>Loading Team...</div>
        </div>
      );
    }
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
      .get("/api/teams/getCollegeTeamsPlayers", {
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
      .get(`/api/teams/getCollegeTeamProfile/${this.state.teamId}`)
      .then(data => {
        this.setState({ team: data.data }, () => {
          this.getRoster();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getcLeagueStats() {
    axios
      .get("/api/teams/getcLeagueStats")
      .then(data => {
        this.setState({ leagueStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  sampleGLeague() {
    if (this.state.team.Name === "Minnesota Timberwolves") {
      return (
        <div id="affiliate-pic">
          <img
            id="gLeaguePic"
            src="https://upload.wikimedia.org/wikipedia/en/thumb/b/b5/Iowa_Wolves_logo.svg/1200px-Iowa_Wolves_logo.svg.png"
          />
          <div id="gleagueheader">G-League Affiliate</div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.checkLoad()}</div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollegeTeamInfo);
