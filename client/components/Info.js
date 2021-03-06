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
      contracts: [],
      teamId: this.props.props.match.params.id,
      team: {}
    };
    this.getRoster = this.getRoster.bind(this);
    this.getTeam = this.getTeam.bind(this);
    this.getLeagueStats = this.getLeagueStats.bind(this);
    this.sampleGLeague = this.sampleGLeague.bind(this);
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffenseRating = this.getOffenseRating.bind(this);
    this.getDefenseRating = this.getDefenseRating.bind(this);
    this.calculateStars = this.calculateStars.bind(this);
    this.calculateDStars = this.calculateDStars.bind(this);
    this.getTeamContracts = this.getTeamContracts.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  componentDidMount() {
    this.getTeam();
    this.getLeagueStats();
    //this.getRoster();
  }

  checkLoad() {
    if (
      JSON.stringify(this.state.team) != "{}" &&
      this.props.players.length > 0
    ) {
      return (
        <div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} sm={12} md={3} xs={12} id="pic-col">
                  <div id="info-pic">
                    <img
                      src={this.state.team.Logo}
                      style={{ maxHeight: "170px" }}
                    />
                  </div>
                </Col>
                <Col lg={9} xs={12} md={9} sm={12}>
                  <Row>
                    <Col lg={5} smOffset={1} mdOffset={0} sm={4} xs={12} md={6}>
                      <div>
                        <div id="team-name" style={{ color: "white" }}>
                          {this.state.team.Name}
                        </div>
                        <div id="info-text" style={{ color: "white" }}>
                          <div>
                            Record: {this.state.team.W}-{this.state.team.L}
                          </div>
                          <div>
                            Expected Record <sub>(PW-PL)</sub>:{" "}
                            {this.state.team.PW}-{this.state.team.PL}
                          </div>
                          <div>Schedule Strength: {this.state.team.SOS}</div>
                          <div>Margin of Victory: {this.state.team.MOV} </div>
                        </div>
                      </div>
                      <hr
                        id="info-text-break"
                        style={{ marginTop: "10px", marginBottom: "10px" }}
                      />
                    </Col>

                    <Col lg={3} xs={12} md={4} sm={6}>
                      <div className="team-overall" style={{ color: "white" }}>
                        <div style={{ textAlign: "right" }}>
                          Overall: {this.getOverallRating()}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          Offense: {this.getOffenseRating()}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          Defense: {this.getDefenseRating()}
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={1} sm={0}>
                      {this.sampleGLeague()}
                    </Col>
                  </Row>
                  <Row
                    style={{ paddingBottom: "15px" }}
                    className="player-stat-row"
                  >
                    <Col
                      lg={2}
                      xs={2}
                      xsOffset={1}
                      lgOffset={0}
                      mdOffset={0}
                      smOffset={1}
                    >
                      <div>
                        <span style={{ color: "#f8f8f8" }}>PPG</span>{" "}
                        <span style={{ fontSize: "18px", color: "white" }}>
                          {this.state.team.PTS}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#f8f8f8" }}>RPG</span>{" "}
                        <span style={{ fontSize: "18px", color: "white" }}>
                          {this.state.team.TRB}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#f8f8f8" }}>APG</span>{" "}
                        <span style={{ fontSize: "18px", color: "white" }}>
                          {this.state.team.AST}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#f8f8f8" }}>ORTG</span>{" "}
                        <span style={{ fontSize: "18px", color: "white" }}>
                          {this.state.team.ORtg}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#f8f8f8" }}>DRTG</span>{" "}
                        <span style={{ fontSize: "18px", color: "white" }}>
                          {this.state.team.DRtg}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </Grid>
          <Tabs
            team={this.state.team}
            players={this.props.players[0]}
            leagueStats={this.state.leagueStats}
            contracts={this.state.contracts}
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

  getTeamContracts() {
    var team = this.state.team.Name;
    axios
      .get("/api/teams/getTeamContracts", {
        params: {
          team: team
        }
      })
      .then(data => {
        this.setState({ contracts: data.data });
      })
      .catch("error retrieving contracts!!!");
  }

  getRoster() {
    var team = this.state.team.Name;
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
        this.setState({ team: data.data }, () => {
          this.getRoster();
          this.getTeamContracts();
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
            style={{ maxHeight: "100px" }}
          />
          <div id="gleagueheader">G-League Affiliate</div>
        </div>
      );
    }
  }

  getOffenseRating() {
    if (this.state.team) {
      var offRating = parseFloat(this.state.team.ORtg);
      var stars = this.calculateStars(114.0, 103.0, offRating);
      if (stars === 5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
          </span>
        );
      }
      if (stars === 4.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
          </span>
        );
      }
      if (stars === 4) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      return (
        <span className="rating overall">
          <i className="glyphicon glyphicon-star half" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
        </span>
      );
    }
  }

  getDefenseRating() {
    if (this.state.team) {
      var defRating = parseFloat(this.state.team.DRtg);
      var stars = this.calculateDStars(104.0, 113.0, defRating);
      console.log(defRating);
      if (stars === 5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
          </span>
        );
      }
      if (stars === 4.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
          </span>
        );
      }
      if (stars === 4) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      return (
        <span className="rating overall">
          <i className="glyphicon glyphicon-star half" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
        </span>
      );
    }
  }

  getOverallRating() {
    if (this.state.team) {
      var wins = parseFloat(this.state.team.W) * 0.3;
      var mov = parseFloat(this.state.team.MOV) * 0.3;
      var sos = parseFloat(this.state.team.SOS) * 0.1;
      var srs = parseFloat(this.state.team.SRS) * 0.3;
      var weightedOvr = wins + mov + sos + srs;
      console.log("OVR: ", weightedOvr);
      var stars = this.calculateStars(16.0, 0, weightedOvr);
      if (stars === 5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
          </span>
        );
      }
      if (stars === 4.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
          </span>
        );
      }
      if (stars === 4) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 3) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 2) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1.5) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star half" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      if (stars === 1) {
        return (
          <span className="rating overall">
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      return (
        <span className="rating overall">
          <i className="glyphicon glyphicon-star half" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
          <i className="glyphicon glyphicon-star empty" />
        </span>
      );
    }
  }

  calculateDStars(high, low, actual) {
    var gradeScale = (low - high) / 9;
    var fiveStars = high + gradeScale;
    var fourHalfStars = fiveStars + gradeScale;
    var fourStars = fourHalfStars + gradeScale;
    var threeHalfStars = fourStars + gradeScale;
    var threeStars = threeHalfStars + gradeScale;
    var twoHalfStars = threeStars + gradeScale;
    var twoStars = twoHalfStars + gradeScale;
    var oneHalfStars = twoStars + gradeScale;
    var oneStars = oneHalfStars + gradeScale;
    var starRating;
    if (actual <= fiveStars) {
      starRating = 5;
    } else if (actual <= fourHalfStars) {
      starRating = 4.5;
    } else if (actual <= fourStars) {
      starRating = 4;
    } else if (actual <= threeHalfStars) {
      starRating = 3.5;
    } else if (actual <= threeStars) {
      starRating = 3;
    } else if (actual <= twoHalfStars) {
      starRating = 2.5;
    } else if (actual <= twoStars) {
      starRating = 2;
    } else if (actual <= oneHalfStars) {
      starRating = 1.5;
    } else if (actual <= oneStars) {
      starRating = 1;
    } else {
      starRating = 0.5;
    }
    return starRating;
  }

  calculateStars(high, low, actual) {
    var gradeScale = (high - low) / 9;
    var fiveStars = high - gradeScale;
    var fourHalfStars = fiveStars - gradeScale;
    var fourStars = fourHalfStars - gradeScale;
    var threeHalfStars = fourStars - gradeScale;
    var threeStars = threeHalfStars - gradeScale;
    var twoHalfStars = threeStars - gradeScale;
    var twoStars = twoHalfStars - gradeScale;
    var oneHalfStars = twoStars - gradeScale;
    var oneStars = oneHalfStars - gradeScale;
    var starRating;
    if (actual >= fiveStars) {
      starRating = 5;
    } else if (actual >= fourHalfStars) {
      starRating = 4.5;
    } else if (actual >= fourStars) {
      starRating = 4;
    } else if (actual >= threeHalfStars) {
      starRating = 3.5;
    } else if (actual >= threeStars) {
      starRating = 3;
    } else if (actual >= twoHalfStars) {
      starRating = 2.5;
    } else if (actual >= twoStars) {
      starRating = 2;
    } else if (actual >= oneHalfStars) {
      starRating = 1.5;
    } else if (actual >= oneStars) {
      starRating = 1;
    } else {
      starRating = 0.5;
    }
    return starRating;
  }

  render() {
    //console.log(this.state.team);
    return (
      <div>
        {this.checkLoad()}
        {/*<div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} sm={12} md={3} xs={12} id="pic-col">
                  <div id="info-pic">
                    <img
                      src={this.state.team.Logo}
                      style={{ maxHeight: "170px" }}
                    />
                  </div>
                </Col>
                <Col lg={9} xs={12} md={9} sm={12}>
                  <Row>
                    <Col lg={5} smOffset={1} mdOffset={0} sm={4} xs={12} md={6}>
                      <div id="name-text">
                        <div id="team-name">{this.state.team.Name}</div>
                        <div id="info-text">
                          <div>
                            Record: {this.state.team.W}-{this.state.team.L}
                          </div>
                          <br />
                          <div>
                            Expected Record <sub>(PW-PL)</sub>:{" "}
                            {this.state.team.PW}-{this.state.team.PL}
                          </div>
                          <div>Schedule Strength: {this.state.team.SOS}</div>
                          <div>Margin of Victory: {this.state.team.MOV} </div>
                        </div>
                      </div>
                      <hr id="info-text-break" />
                    </Col>

                    <Col lg={3} xs={12} md={4} sm={6}>
                      <div className="team-overall">
                        <div style={{ textAlign: "right" }}>
                          Overall: {this.getOverallRating()}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          Offense: {this.getOffenseRating()}
                        </div>
                        <div style={{ textAlign: "right" }}>
                          Defense: {this.getDefenseRating()}
                        </div>
                      </div>
                    </Col>
                    <Col lg={3} md={1} sm={0}>
                      {this.sampleGLeague()}
                    </Col>
                  </Row>
                  <Row
                    style={{ paddingBottom: "20px" }}
                    className="player-stat-row"
                  >
                    <Col
                      lg={2}
                      xs={2}
                      xsOffset={1}
                      lgOffset={0}
                      mdOffset={0}
                      smOffset={1}
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
                        <span style={{ color: "#404040" }}>ORTG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.ORtg}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>DRTG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.team.DRtg}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </Grid>
          <Tabs
            team={this.state.team}
            players={this.props.players[0]}
            leagueStats={this.state.leagueStats}
            contracts={this.state.contracts}
          />
    </div>*/}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Info);
