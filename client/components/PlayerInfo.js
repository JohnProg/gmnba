import React from "react";
import PlayerTabs from "./PlayerTabs";
import { Col, Button, Well, Row, Grid, Glyphicon } from "react-bootstrap";
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
      id: this.props.props.match.params.id,
      player: {},
      colors: {},
      contract: {},
      prHandler: {},
      prRollMan: {},
      iso: {},
      hustle: {},
      transition: {}
    };
    this.getPlayer = this.getPlayer.bind(this);
    this.getTeamColors = this.getTeamColors.bind(this);
    this.getOverallRating = this.getOverallRating.bind(this);
    this.getOffenseRating = this.getOffenseRating.bind(this);
    this.getDefenseRating = this.getDefenseRating.bind(this);
    this.calculateStars = this.calculateStars.bind(this);
    this.getPostStats = this.getPostStats.bind(this);
    this.getCatchShootStats = this.getCatchShootStats.bind(this);
    this.getSpeedDistanceStats = this.getSpeedDistanceStats.bind(this);
    this.getShootingStats = this.getShootingStats.bind(this);
    this.getPositionStats = this.getPositionStats.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    this.getContract = this.getContract.bind(this);
    this.getPRHandler = this.getPRHandler.bind(this);
    this.getPRRollMan = this.getPRRollMan.bind(this);
    this.getIso = this.getIso.bind(this);
    this.getHustleStats = this.getHustleStats.bind(this);
    this.getTransition = this.getTransition.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  componentDidMount() {
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
                          <div>
                            College: {this.state.player.college || "None"}
                          </div>
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
                      <a href={`/team/${this.state.colors.id}`}>
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
          {this.renderPlayer()}
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center", marginTop: "250px" }}>
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
      .get("/api/teams/getPositionStats", {
        params: {
          position: position
        }
      })
      .then(data => {
        this.setState({ positionStats: data.data }, () => {
          //console.log(this.state.positionStats);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getContract(name) {
    axios.get(`/api/teams/getPlayerContract/${name}`).then(data => {
      this.setState({ contract: data.data });
    });
  }

  getPRHandler(name) {
    axios.get(`/api/teams/getPRHandler/${name}`).then(data => {
      this.setState({ prHandler: data.data });
    });
  }

  getPRRollMan(name) {
    axios.get(`/api/teams/getPRRollMan/${name}`).then(data => {
      this.setState({ prRollMan: data.data });
    });
  }

  getIso(name) {
    axios.get(`/api/teams/getIso/${name}`).then(data => {
      this.setState({ iso: data.data });
    });
  }

  getTransition(name) {
    axios.get(`/api/teams/getTransition/${name}`).then(data => {
      this.setState({ transition: data.data });
    });
  }

  getPostStats(name) {
    axios.get(`/api/teams/getPostStats/${name}`).then(data => {
      this.setState({ postStats: data.data });
    });
  }

  getHustleStats(name) {
    axios.get(`/api/teams/getHustleStats/${name}`).then(data => {
      this.setState({ hustle: data.data });
    });
  }

  getCatchShootStats(name) {
    axios.get(`/api/teams/getCatchShootStats/${name}`).then(data => {
      this.setState({ catchShootStats: data.data });
    });
  }

  getSpeedDistanceStats(name) {
    axios.get(`/api/teams/getSpeedDistanceStats/${name}`).then(data => {
      this.setState({ speedDistanceStats: data.data });
    });
  }

  getShootingStats(name) {
    axios.get(`/api/teams/getShootingStats/${name}`).then(data => {
      this.setState({ shootingStats: data.data });
    });
  }

  getPlayer() {
    axios
      .get(`/api/teams/getPlayerProfile/${this.state.id}`)
      .then(data => {
        this.setState({ player: data.data }, () => {});
        this.getTeamColors(data.data.team);
        this.getPositionStats(data.data.position);
        this.getPostStats(data.data.name);
        this.getCatchShootStats(data.data.name);
        this.getSpeedDistanceStats(data.data.name);
        this.getShootingStats(data.data.name);
        this.getPRHandler(data.data.name);
        this.getPRRollMan(data.data.name);
        this.getIso(data.data.name);
        this.getHustleStats(data.data.name);
        this.getTransition(data.data.name);
        this.getContract(data.data.name);
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeamColors(team) {
    axios
      .get(`api/teams/getTeamColors/${team}`)
      .then(data => {
        this.setState({ colors: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getOffenseRating() {
    if (this.state.player) {
      var obpm = parseFloat(this.state.player.obpm);
      var ows = parseFloat(this.state.player.ows);
      var offRating = obpm + ows;
      var stars = this.calculateStars(13.0, -5.0, offRating);
      if (stars === 5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      return (
        <span className="rating overall" style={{ zIndex: -5 }}>
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
      var dbpm = parseFloat(this.state.player.dbpm);
      var dws = parseFloat(this.state.player.dws);
      var defRating = dbpm + dws;
      var stars = this.calculateStars(6.5, -3.0, defRating);
      if (stars === 5) {
        return (
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
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
          <span className="rating overall" style={{ zIndex: -5 }}>
            <i className="glyphicon glyphicon-star" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
            <i className="glyphicon glyphicon-star empty" />
          </span>
        );
      }
      return (
        <span className="rating overall" style={{ zIndex: -5 }}>
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
    if (this.state.player) {
      var per = parseFloat(this.state.player.per) * 0.4;
      var bpm = parseFloat(this.state.player.bpm) * 0.2;
      var ws48 = parseFloat(this.state.player.wsFourtyEight) * 0.1;
      var ws = parseFloat(this.state.player.ws) * 0.1;
      var vorp = parseFloat(this.state.player.vorp) * 0.25;
      var weightedOvr = per + bpm + ws48 + ws + vorp;
      var stars = this.calculateStars(14.0, 0, weightedOvr);
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

  renderPlayer() {
    if (
      this.state.player //&&
      // this.state.postStats &&
      // this.state.catchShootStats &&
      // this.state.positionStats
    ) {
      return (
        <PlayerTabs
          players={this.props.players[0]}
          teamStats={this.state.teamStats}
          player={this.state.player}
          colors={this.state.colors}
          postStats={this.state.postStats}
          catchShootStats={this.state.catchShootStats}
          speedDistanceStats={this.state.speedDistanceStats}
          shootingStats={this.state.shootingStats}
          prHandler={this.state.prHandler}
          prRollMan={this.state.prRollMan}
          iso={this.state.iso}
          hustle={this.state.hustle}
          transition={this.state.transition}
          positionStats={this.state.positionStats}
          contract={this.state.contract}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    // var picture;
    // if (this.state.player.picture) {
    //   picture = this.state.player.picture;
    // } else {
    //   picture =
    //     "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
    // }
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
                          <div>
                            College: {this.state.player.college || "None"}
                          </div>
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
                      <a href={`/team/${this.state.colors.id}`}>
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
          {this.renderPlayer()}
    </div>*/}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);
