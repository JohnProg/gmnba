import React from "react";
import GPlayerTabs from "./GPlayerTabs";
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

class GPlayerInfo extends React.Component {
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
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffenseRating = this.getOffenseRating.bind(this);
    this.getDefenseRating = this.getDefenseRating.bind(this);
    this.calculateStars = this.calculateStars.bind(this);
    this.getPositionStats = this.getPositionStats.bind(this);
    this.scaleStat = this.scaleStat.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  componentDidMount() {
    this.getLeagueStats();
    this.getPlayer();
  }

  checkLoad() {
    var picture;
    if (this.state.player.picture) {
      picture = this.state.player.picture;
    } else {
      picture =
        "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
    }
    if (JSON.stringify(this.state.colors) != "{}") {
      return (
        <div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} sm={6} md={3} xs={12} id="pic-col">
                  <div id="info-pic-team">
                    <img style={{ maxHeight: "200px" }} src={picture} />
                  </div>
                </Col>
                <Col lg={9} xs={12} md={9}>
                  <Row>
                    <Col lg={5} xs={12} md={5}>
                      <div id="name-text">
                        <div id="team-name" style={{ color: "white" }}>
                          {this.state.player.name}
                          <span
                            style={{ paddingLeft: "3px", fontSize: "14px" }}
                          >
                            {" "}
                            {this.state.player.position}
                          </span>
                        </div>
                        <div id="info-text" style={{ color: "white" }}>
                          <div style={{ color: "white" }}>
                            <span>Height: {this.state.player.height}</span>
                            <span style={{ paddingLeft: "3px" }}>
                              {" "}
                              Weight: {this.state.player.weight}
                            </span>
                          </div>
                          <div>Age: {this.state.player.age}</div>
                          <div>Team: {this.state.player.team}</div>
                          <div>College: {this.state.player.college || ""}</div>
                        </div>
                      </div>
                      <hr id="cinfo-text-break" />
                    </Col>
                    <Col lg={3} xs={7} md={4}>
                      <div
                        style={{
                          marginTop: "70px",
                          fontSize: "15.5px",
                          color: "white"
                        }}
                      >
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
                    <Col lg={3} xs={5} md={2}>
                      <a href={`/gleague-team/${this.state.colors.id}`}>
                        <div id="logo-pic">
                          <img
                            id="teamLogoPic"
                            src={this.state.colors.Logo}
                            style={{ maxHeight: "100px" }}
                          />
                          <div id="teamLogoHeader" style={{ color: "white" }}>
                            {this.state.player.team}
                          </div>
                        </div>
                      </a>
                    </Col>
                  </Row>
                  <Row
                    style={{ paddingBottom: "20px" }}
                    className="player-stat-row"
                  >
                    <Col
                      lg={2}
                      xs={2}
                      lgOffset={0}
                      mdOffset={0}
                      smOffset={0}
                      xsOffset={1}
                    >
                      <div style={{ color: "white" }}>
                        <span>PPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.pts}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div style={{ color: "white" }}>
                        <span>RPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.trb}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div style={{ color: "white" }}>
                        <span>APG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.ast}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div style={{ color: "white" }}>
                        <span>GP</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.gamesPlayed || 0}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div style={{ color: "white" }}>
                        <span>MPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.mpg}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </Grid>
          <GPlayerTabs
            players={this.props.players[0]}
            teamStats={this.state.teamStats}
            leagueStats={this.state.leagueStats}
            player={this.state.player}
            colors={this.state.colors}
            positionStats={this.state.positionStats}
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
          <div>Loading Player...</div>
        </div>
      );
    }
  }

  getPositionStats(position) {
    axios
      .get("/api/teams/getgPositionStats", {
        params: {
          position: position
        }
      })
      .then(data => {
        this.setState({ positionStats: data.data }, () => {
          console.log(this.state.positionStats);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getLeagueStats() {
    axios
      .get("/api/teams/getgLeagueStats")
      .then(data => {
        this.setState({ leagueStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getPlayer() {
    axios
      .get(`/api/teams/getgPlayerProfile/${this.state.id}`)
      .then(data => {
        this.getTeamColors(data.data.team);
        this.setState({ player: data.data }, () => {});
        this.getPositionStats(data.data.position);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeamColors(team) {
    axios
      .get(`api/teams/getgTeamColors/${team}`)
      .then(data => {
        this.setState({ colors: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getOffenseRating() {
    if (this.state.player) {
      var offRtg = parseFloat(this.state.player.obpm);
      var ows = parseFloat(this.state.player.ows);
      var offRating = offRtg;
      var stars = this.calculateStars(118.0, 91.0, offRating);
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
    if (this.state.player) {
      var defRtg = parseFloat(this.state.player.dbpm);
      var dws = parseFloat(this.state.player.dws);
      var defRating = defRtg;
      var stars = this.calculateStars(-96.0, -114.0, defRating * -1);
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

  scaleStat(high, stat, low) {
    var scaled = 100 / (high - low) * (stat - low);
    return scaled;
  }

  getOverallRating() {
    if (this.state.player) {
      // var per = parseFloat(this.state.player.per) * 0.5;
      // var bpm = parseFloat(this.state.player.bpm) * 0.2;
      // var ws48 = parseFloat(this.state.player.wsFourtyEight) * 0.15;
      // var ws = parseFloat(this.state.player.ws) * 0.15;
      var pie =
        this.scaleStat(0.182, parseFloat(this.state.player.vorp), 0) * 0.4;
      var scaledOffRtg =
        this.scaleStat(117.0, parseFloat(this.state.player.obpm), 87.0) * 0.3;
      var scaledDefRtg =
        this.scaleStat(-96.0, parseFloat(this.state.player.dbpm) * -1, -115.0) *
        0.3;
      var weightedOvr = pie + scaledOffRtg + scaledDefRtg;
      var stars = this.calculateStars(84.1, 21.0, weightedOvr);
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

  calculateStars(high, low, actual) {
    var gradeScale = (high - low) / 8;
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
    return (
      <div>
        {this.checkLoad()}
        {/*<div id="info-container-max">
          <Grid id="info-container">
            <Row className="full-height-row">
              <div id="info">
                <Col lg={3} sm={6} md={3} xs={12} id="pic-col">
                  <div id="info-pic-team">
                    <img style={{ maxHeight: "200px" }} src={picture} />
                  </div>
                </Col>
                <Col lg={9} xs={12} md={9}>
                  <Row>
                    <Col lg={5} xs={12} md={5}>
                      <div id="name-text">
                        <div id="team-name">
                          {this.state.player.name}
                          <span
                            style={{ paddingLeft: "3px", fontSize: "14px" }}
                          >
                            {" "}
                            {this.state.player.position}
                          </span>
                        </div>
                        <div id="info-text">
                          <div>
                            <span>Height: {this.state.player.height}</span>
                            <span style={{ paddingLeft: "3px" }}>
                              {" "}
                              Weight: {this.state.player.weight}
                            </span>
                          </div>
                          <div>Age: {this.state.player.age}</div>
                          <div>Team: {this.state.player.team}</div>
                          <div>College: {this.state.player.college || ""}</div>
                        </div>
                      </div>
                      <hr id="cinfo-text-break" />
                    </Col>
                    <Col lg={3} xs={7} md={4}>
                      <div style={{ marginTop: "70px", fontSize: "15.5px" }}>
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
                    <Col lg={3} xs={5} md={2}>
                      <a href={`/gleague-team/${this.state.colors.id}`}>
                        <div id="logo-pic">
                          <img
                            id="teamLogoPic"
                            src={this.state.colors.Logo}
                            style={{ maxHeight: "100px" }}
                          />
                          <div id="teamLogoHeader">
                            {this.state.player.team}
                          </div>
                        </div>
                      </a>
                    </Col>
                  </Row>
                  <Row
                    style={{ paddingBottom: "20px" }}
                    className="player-stat-row"
                  >
                    <Col
                      lg={2}
                      xs={2}
                      lgOffset={0}
                      mdOffset={0}
                      smOffset={0}
                      xsOffset={1}
                    >
                      <div>
                        <span style={{ color: "#404040" }}>PPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.pts}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>RPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.trb}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>APG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.ast}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>GP</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.gamesPlayed || 0}
                        </span>
                      </div>
                    </Col>
                    <Col lg={2} xs={2}>
                      <div>
                        <span style={{ color: "#404040" }}>MPG</span>{" "}
                        <span style={{ fontSize: "18px" }}>
                          {this.state.player.mpg}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </div>
            </Row>
          </Grid>
          <GPlayerTabs
            players={this.props.players[0]}
            teamStats={this.state.teamStats}
            leagueStats={this.state.leagueStats}
            player={this.state.player}
            colors={this.state.colors}
            positionStats={this.state.positionStats}
          />
    </div>*/}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GPlayerInfo);
