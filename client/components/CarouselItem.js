import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Table,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import PlayerPolarColumn from "./PlayerPolarColumn";
import PlPolTest from "./CarouselCharts/PlPolTest";
import CarPolAdvOff from "./CarouselCharts/CarPolAdvOff";
import CarPolOff from "./CarouselCharts/CarPolOff";
import CarPolPRHandler from "./CarouselCharts/CarPolPRHandler";
import CarPolPRRollMan from "./CarouselCharts/CarPolPRRollMan";
import CarPolDef from "./CarouselCharts/CarPolDef";
import CarPolOvr from "./CarouselCharts/CarPolOvr";
import CarPolIso from "./CarouselCharts/CarPolIso";
import CarPolTransition from "./CarouselCharts/CarPolTransition";
import CarPolShooting from "./CarouselCharts/CarPolShooting";
import CarPolCatchShoot from "./CarouselCharts/CarPolCatchShoot";
import CarPolPostUp from "./CarouselCharts/CarPolPostUp";
import CarPolSD from "./CarouselCharts/CarPolSD";
import CarPolHustle from "./CarouselCharts/CarPolHustle";
import axios from "axios";

export default class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      statCat: "Basic",
      team: {},
      prHandler: {},
      prRollMan: {},
      iso: {},
      transition: {},
      hustle: {},
      postStats: {},
      catchShootStats: {},
      speedDistanceStats: {},
      shootingStats: {}
    };
    this.checkLoad = this.checkLoad.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
    this.getTeamColors = this.getTeamColors.bind(this);
    this.getPRHandler = this.getPRHandler.bind(this);
    this.getPRRollMan = this.getPRRollMan.bind(this);
    this.getIso = this.getIso.bind(this);
    this.getTransition = this.getTransition.bind(this);
    this.getHustleStats = this.getHustleStats.bind(this);
    this.getPostStats = this.getPostStats.bind(this);
    this.getCatchShootStats = this.getCatchShootStats.bind(this);
    this.getSpeedDistanceStats = this.getSpeedDistanceStats.bind(this);
    this.getShootingStats = this.getShootingStats.bind(this);
  }

  componentDidMount() {
    this.getTeamColors(this.props.player.team);
    this.getPRHandler(this.props.player.name);
    this.getPRRollMan(this.props.player.name);
    this.getIso(this.props.player.name);
    this.getTransition(this.props.player.name);
    this.getHustleStats(this.props.player.name);
    this.getPostStats(this.props.player.name);
    this.getCatchShootStats(this.props.player.name);
    this.getSpeedDistanceStats(this.props.player.name);
    this.getShootingStats(this.props.player.name);
  }

  getTeamColors(team) {
    axios
      .get(`api/teams/getTeamColors/${team}`)
      .then(data => {
        this.setState({ team: data.data });
      })
      .catch(err => {
        console.log(err);
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

  checkLoad() {
    if (this.props.player) {
      if (this.state.statCat === "Basic") {
        return (
          <div>
            <PlPolTest player={this.props.player} name={this.props.name} />
          </div>
        );
      } else if (this.state.statCat === "Advanced Off") {
        return (
          <div>
            <CarPolAdvOff player={this.props.player} name={this.props.name} />
          </div>
        );
      } else if (this.state.statCat === "Offense") {
        return (
          <div>
            <CarPolOff player={this.props.player} name={this.props.name} />
          </div>
        );
      } else if (this.state.statCat === "P+R Ball Hand.") {
        return (
          <div>
            <CarPolPRHandler
              player={this.state.prHandler}
              name={this.props.name}
              gp={this.props.player.gamesPlayed}
              min={this.props.player.mpg}
            />
          </div>
        );
      } else if (this.state.statCat === "P+R Roll Man") {
        return (
          <div>
            <CarPolPRRollMan
              player={this.state.prRollMan}
              name={this.props.name}
              gp={this.props.player.gamesPlayed}
              min={this.props.player.mpg}
            />
          </div>
        );
      } else if (this.state.statCat === "Isolation") {
        return (
          <div>
            <CarPolIso
              player={this.state.iso}
              name={this.props.name}
              gp={this.props.player.gamesPlayed}
              min={this.props.player.mpg}
            />
          </div>
        );
      } else if (this.state.statCat === "Transition") {
        return (
          <div>
            <CarPolTransition
              player={this.state.transition}
              name={this.props.name}
              gp={this.props.player.gamesPlayed}
              min={this.props.player.mpg}
            />
          </div>
        );
      } else if (this.state.statCat === "Shooting Eff") {
        return (
          <div>
            <CarPolShooting
              player={this.state.shootingStats}
              name={this.props.name}
              min={this.props.player.mpg}
            />
          </div>
        );
      } else if (this.state.statCat === "Catch/Shoot") {
        return (
          <div>
            <CarPolCatchShoot
              player={this.state.catchShootStats}
              name={this.props.name}
              min={this.props.player.mpg}
            />
          </div>
        );
      } else if (this.state.statCat === "Post Ups") {
        return (
          <div>
            <CarPolPostUp
              player={this.state.postStats}
              name={this.props.name}
              min={this.props.player.mpg}
            />
          </div>
        );
      } else if (this.state.statCat === "Speed/Distance") {
        return (
          <div>
            <CarPolSD
              player={this.state.speedDistanceStats}
              name={this.props.name}
            />
          </div>
        );
      } else if (this.state.statCat === "Hustle") {
        return (
          <div>
            <CarPolHustle
              player={this.state.hustle}
              name={this.props.name}
              min={this.props.player.mpg}
            />
          </div>
        );
      } else if (this.state.statCat === "Defense") {
        return (
          <div>
            <CarPolDef player={this.props.player} name={this.props.name} />
          </div>
        );
      } else if (this.state.statCat === "Overall") {
        return (
          <div>
            <CarPolOvr player={this.props.player} name={this.props.name} />
          </div>
        );
      }
    } else {
      return (
        <div style={{ paddingTop: "15%", paddingLeft: "30%" }}>
          <div style={{ margin: "0 auto" }}>
            <img
              style={{ height: "100px" }}
              src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
            />
            <div>Loading Player...</div>
          </div>
        </div>
      );
    }
  }

  selectStatCat(evt, eventKey) {
    this.setState({ statCat: eventKey.target.innerHTML });
  }

  render() {
    //console.log(this.props.name);
    var picture =
      "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
    if (this.props.player.picture) {
      picture = this.props.player.picture;
    }
    return (
      <div className="card murdered-out">
        <Grid>
          <Row>
            <Col
              lg={3}
              md={3}
              style={{
                backgroundColor: "rgba(105,105,105,0.1)",
                marginRight: "20px"
              }}
            >
              <div
                style={{
                  color: "grey",
                  paddingTop: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "20px"
                }}
              >
                <div style={{ textAlign: "center", height: "200px" }}>
                  <img src={picture} />
                </div>
                <div style={{ paddingLeft: "5px" }}>
                  <div style={{ fontSize: "19px" }}>
                    <a href={`/player/${this.props.player.id}`}>
                      <span style={{ color: "grey" }}>
                        {this.props.player.name}
                      </span>
                    </a>
                    <span style={{ paddingLeft: "3px", fontSize: "11px" }}>
                      {" "}
                      {this.props.player.position}
                    </span>
                  </div>
                  <div>
                    <span>Height: {this.props.player.height}</span>
                    <span style={{ paddingLeft: "3px" }}>
                      {" "}
                      Weight: {this.props.player.weight}
                    </span>
                  </div>
                  <div>Age: {this.props.player.age}</div>
                  <div>Team: {this.props.player.team}</div>
                  <div>College: {this.props.player.college || "None"}</div>
                </div>
              </div>
            </Col>
            <Col lg={5} md={8}>
              <div>{this.checkLoad()}</div>
            </Col>
            <Col lg={2}>
              <div>
                <DropdownButton
                  title={this.state.statCat}
                  pullRight
                  className="card carButton"
                  style={{
                    border: "none",
                    fontSize: "16px",
                    backgroundColor: "rgba(105,105,105,0.1)",
                    marginTop: "30px",
                    color: this.state.team.Color_Sec
                  }}
                  onSelect={this.selectStatCat}
                >
                  <MenuItem eventKey="1">Basic</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2">Offense</MenuItem>
                  <MenuItem eventKey="3">Advanced Off</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Play Type</MenuItem>
                  <MenuItem eventKey="10">P+R Ball Hand.</MenuItem>
                  <MenuItem eventKey="11">P+R Roll Man</MenuItem>
                  <MenuItem eventKey="12">Isolation</MenuItem>
                  <MenuItem eventKey="14">Transition</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Player Tracking</MenuItem>
                  <MenuItem eventKey="4">Shooting Eff</MenuItem>
                  <MenuItem eventKey="5">Catch/Shoot</MenuItem>
                  <MenuItem eventKey="6">Post Ups</MenuItem>
                  <MenuItem eventKey="9">Speed/Distance</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="7">Defense</MenuItem>
                  <MenuItem eventKey="13">Hustle</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="8">Overall</MenuItem>
                </DropdownButton>
              </div>
              <div style={{ height: "80px", marginTop: "110%" }}>
                <img src={this.state.team.Logo} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
