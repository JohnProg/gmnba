import React from "react";
import PlayerTabs from "./PlayerTabs";
import { Col, Row, Grid, MenuItem, DropdownButton } from "react-bootstrap";
import { connect } from "react-redux";
import axios from "axios";
import PlayersList from "./PlayersList";
import PlayerPolarArea from "./PlayerPolarArea";
import PlayerPolarColumn from "./PlayerPolarColumn";
import PlayerMenu from "./PlayerMenu";
import PlayerRatings2 from "./PlayerRatings2";
import PlayerContract from "./PlayerContract";
import PlayerSeasonStats from "./PlayerSeasonStats";
import PlayerRatingsSub from "./PlayerRatingsSub";

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
      transition: {},
      selection: "Player Ratings",
      showMenu: false,
      statCat: "Basic"
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
    this.selectMenu = this.selectMenu.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
    this.renderSelection = this.renderSelection.bind(this);
  }

  componentDidMount() {
    this.getPlayer();
  }

  checkLoad() {
    var headerStyle = {
      backgroundColor: this.state.colors.Color_Main || "red",
      height: "50px",
      lineHeight: "50px",
      fontSize: "20px",
      paddingLeft: "15px",
      color: this.state.colors.Color_Sec || "white"
    };
    var menuLabel = {
      backgroundColor: this.state.colors.Color_Main || "red",
      textAlign: "left",
      color: this.state.colors.Color_Sec,
      fontSize: "20px",
      marginBottom: "3px",
      border: "none"
    };
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
            <Row
              style={{
                paddingTop: "80px",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                overflowY: "visible"
              }}
            >
              <Col
                lg={3}
                lgOffset={9}
                mdOffset={9}
                md={3}
                style={{ paddingRight: "0px" }}
              >
                <div
                  className="css-box-shadow"
                  style={headerStyle}
                  onClick={this.selectMenu}
                >
                  <div>
                    {this.state.selection}
                    {"  "}
                    <span style={{ fontSize: "14px" }}>&#9660;</span>
                  </div>
                </div>
                <div style={{ height: "0px", overflowY: "visible" }}>
                  {this.renderMenu()}
                </div>
              </Col>
            </Row>
            <Row
              style={{
                paddingTop: "15px",
                paddingBottom: "30px",
                backgroundColor: "rgba(0, 0, 0, 0.5)"
              }}
            >
              <Col
                lg={4}
                sm={6}
                md={4}
                xs={12}
                id="pic-col"
                style={{ paddingTop: "100px" }}
              >
                <div id="info-pic-team">
                  <img
                    className="css-box-shadow"
                    style={{ maxHeight: "400px" }}
                    src={picture}
                  />
                </div>
                <div id="name-text">
                  <div
                    id="team-name"
                    style={{
                      color: "white",
                      textShadow: "-4px 4px 4px #000000"
                    }}
                  >
                    {this.state.player.name}
                    <span style={{ paddingLeft: "3px", fontSize: "18px" }}>
                      {" "}
                      {this.state.player.position}
                    </span>
                  </div>
                  <div
                    id="info-text"
                    style={{
                      color: "white",
                      textShadow: "-4px 4px 4px #000000"
                    }}
                  >
                    <div>
                      <span>Height: {this.state.player.height}</span>
                      <span style={{ paddingLeft: "3px" }}>
                        {" "}
                        Weight: {this.state.player.weight}
                      </span>
                    </div>
                    <div>
                      <span>Age: {this.state.player.age}</span>
                      <span style={{ paddingLeft: "4px" }}>
                        {" "}
                        Experience: {this.state.player.experience}
                      </span>
                    </div>
                    <div>Team: {this.state.player.team}</div>
                    <div>College: {this.state.player.college || "None"}</div>
                    <div>Draft: {this.state.player.draft || "Unavailable"}</div>
                  </div>
                </div>
              </Col>
              <Col lg={8} md={8} style={{ height: "340px" }}>
                <Row>{this.renderSelection()}</Row>
              </Col>
              <Row>
                <Col lg={2} md={2} style={{ marginLeft: "15px" }}>
                  <div
                    style={{
                      marginTop: "90px",
                      fontSize: "22px",
                      color: "white",
                      textShadow: "-4px 4px 4px #000000"
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      OVR: {this.getOverallRating()}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      OFF: {this.getOffenseRating()}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      DEF: {this.getDefenseRating()}
                    </div>
                  </div>
                </Col>
                <Col lg={3} md={3} style={{ marginLeft: "10px" }}>
                  <Row
                    style={{
                      marginTop: "80px",
                      textShadow: "-4px 4px 4px #000000"
                    }}
                  >
                    <Col lg={6} md={6}>
                      <div style={{ paddingLeft: "40px" }}>
                        <div style={{ color: "white" }}>
                          <span>PPG</span>{" "}
                          <span
                            style={{ fontSize: "24px", paddingLeft: "3px" }}
                          >
                            {this.state.player.pts || 0}
                          </span>
                        </div>
                        <div style={{ color: "white" }}>
                          <span>RPG</span>{" "}
                          <span
                            style={{ fontSize: "24px", paddingLeft: "2px" }}
                          >
                            {this.state.player.trb || 0}
                          </span>
                        </div>
                        <div style={{ color: "white" }}>
                          <span>APG</span>{" "}
                          <span
                            style={{ fontSize: "24px", paddingLeft: "3px" }}
                          >
                            {this.state.player.ast || 0}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col lg={6} md={6}>
                      <div style={{ color: "white" }}>
                        <span>GP</span>{" "}
                        <span style={{ fontSize: "24px", paddingLeft: "16px" }}>
                          {this.state.player.gamesPlayed || 0}
                        </span>
                      </div>
                      <div style={{ color: "white" }}>
                        <span>MPG</span>{" "}
                        <span style={{ fontSize: "24px", paddingLeft: "4px" }}>
                          {this.state.player.mpg || 0}
                        </span>
                      </div>
                      <div style={{ color: "white" }}>
                        <span>PER</span>{" "}
                        <span style={{ fontSize: "24px", paddingLeft: "9px" }}>
                          {this.state.player.per || 0}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col lg={1} xs={5} md={1}>
                  <a href={`/team/${this.state.colors.id}`}>
                    <div
                      style={{
                        width: "140px",
                        height: "auto",
                        marginTop: "70px",
                        paddingLeft: "5px"
                      }}
                    >
                      <img
                        className="css-box-shadow"
                        src={this.state.colors.Logo}
                        style={{ maxHeight: "400px" }}
                      />
                    </div>
                  </a>
                </Col>
              </Row>
            </Row>
            <Row style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
              <Col lgOffset={1} lg={10} mdOffset={1} md={10}>
                <hr />
              </Col>
            </Row>
            <Row style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
              {this.renderPlayer()}
            </Row>
          </Grid>
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

  selectMenu() {
    this.setState({ showMenu: !this.state.showMenu }, () => {
      console.log(this.state.showMenu);
    });
  }

  selectStatCat(evt, eventKey) {
    this.setState({ statCat: eventKey.target.innerHTML });
  }

  renderMenu() {
    if (this.state.showMenu) {
      return (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            fontSize: "16px",
            position: "relative",
            zIndex: 100,
            lineHeight: "50px",
            color: this.state.colors.Color_Sec || "white"
          }}
        >
          <div
            onClick={this.handleClick}
            style={{ height: "50px", paddingLeft: "15px" }}
          >
            Season Stats
          </div>
          <div
            onClick={this.handleClick}
            style={{ height: "50px", paddingLeft: "15px" }}
          >
            Career Stats
          </div>
          <div
            onClick={this.handleClick}
            style={{ height: "50px", paddingLeft: "15px" }}
          >
            Player Ratings
          </div>
          <div
            onClick={this.handleClick}
            style={{ height: "50px", paddingLeft: "15px" }}
          >
            Player Projection
          </div>
          <div
            onClick={this.handleClick}
            style={{ height: "50px", paddingLeft: "15px" }}
          >
            Player Comparison
          </div>
          <div
            onClick={this.handleClick}
            style={{ height: "50px", paddingLeft: "15px" }}
          >
            Shot Chart
          </div>
          <div
            onClick={this.handleClick}
            style={{ height: "50px", paddingLeft: "15px" }}
          >
            Contract
          </div>
        </div>
      );
    }
  }

  handleClick(event) {
    //console.log(event.currentTarget.textContent);
    this.setState({
      selection: event.currentTarget.textContent,
      showMenu: false
    });
  }

  renderSelection() {
    if (this.state.selection === "Player Ratings") {
      return (
        <PlayerRatings2
          player={this.state.player}
          colors={this.state.colors}
          postStats={this.state.postStats}
          catchShootStats={this.state.catchShootStats}
          shootingStats={this.state.shootingStats}
          speedDistanceStats={this.state.speedDistanceStats}
          prHandler={this.state.prHandler}
          prRollMan={this.state.prRollMan}
          iso={this.state.iso}
          transition={this.state.transition}
          hustle={this.state.hustle}
        />
      );
    } else if (this.state.selection === "Contract") {
      return (
        <PlayerContract
          player={this.state.player}
          contract={this.state.contract}
          colors={this.state.colors}
        />
      );
    } else if (this.state.selection === "Season Stats") {
      return (
        <PlayerSeasonStats
          player={this.state.player}
          colors={this.state.colors}
        />
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
    if (this.state.player) {
      if (this.state.selection === "Player Ratings") {
        return (
          <PlayerRatingsSub
            player={this.state.player}
            colors={this.state.colors}
            positionStats={this.state.positionStats}
            statCat={this.state.statCat}
          />
        );
      }
    } else {
      return null;
    }
  }

  render() {
    return <div>{this.checkLoad()}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerInfo);
