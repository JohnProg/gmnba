import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import PlayerRankGauges from "./PlayerRankGauges";
import PlayerPositionAverages from "./PlayerPositionAverages";
import TeamRatings from "./TeamRatings";
import PlayerPolarArea from "./PlayerPolarArea";
import PlayerPolarColumn from "./PlayerPolarColumn";
import PlayerPolColOff from "./PlayerPolColOff";
import PlayerPolColDef from "./PlayerPolColDef";
import PlayerPolColAdvOff from "./PlayerPolColAdvOff";
import PlayerPolColOvr from "./PlayerPolColOvr";
import PlayerBarRatings from "./PlayerBarRatings";
import PlayerOffBarRatings from "./PlayerOffBarRatings";
import PlayerAdvOffBarRatings from "./PlayerAdvOffBarRatings";
import PlayerDefBarRatings from "./PlayerDefBarRatings";
import PlayerOvrBarRatings from "./PlayerOvrBarRatings";
import PlayerPostUpBarRatings from "./PlayerPostUpBarRatings";
import PlayerPolColPostUp from "./PlayerPolColPostUp";
import PlayerPolColCatchShoot from "./PlayerPolColCatchShoot";
import PlayerCatchShootBarRatings from "./PlayerCatchShootBarRatings";
import PlayerPolColShooting from "./PlayerPolColShooting";
import PlayerPolColSD from "./PlayerPolColSD";
import PlayerPolColPRBH from "./PlayerPolColPRBH";
import PlayerPolColPRRM from "./PlayerPolColPRRM";
import PlayerPolColIso from "./PlayerPolColIso";
import PlayerPolColTransition from "./PlayerPolColTransition";
import PlayerPolColHustle from "./PlayerPolColHustle";
import axios from "axios";

export default class PlayerRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionStats: [],
      statCat: "Basic"
    };
    //this.getPositionStats = this.getPositionStats.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
    this.renderPolarCol = this.renderPolarCol.bind(this);
    this.renderBarChart = this.renderBarChart.bind(this);
    this.renderRankGauges = this.renderRankGauges.bind(this);
  }

  componentDidMount() {
    if (this.props.player.name) {
      this.setState({ player: this.props.player }, () => {
        //this.getPositionStats(this.state.player.position);
        //this.createChart();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.player.name) {
    //   this.setState({ player: nextProps.player }, () => {
    //     this.getPositionStats(this.state.player.position);
    //     //this.createChart();
    //   });
    // }
  }

  // getPositionStats(position) {
  //   axios
  //     .get("/api/teams/getPositionStats", {
  //       params: {
  //         position: position
  //       }
  //     })
  //     .then(data => {
  //       this.setState({ positionStats: data.data });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  selectStatCat(evt, eventKey) {
    this.setState({ statCat: eventKey.target.innerHTML });
  }

  renderPolarCol() {
    if (this.state.statCat === "Basic") {
      return <PlayerPolarColumn player={this.props.player} />;
    } else if (this.state.statCat === "Offense") {
      return <PlayerPolColOff player={this.props.player} />;
    } else if (this.state.statCat === "Advanced Offense") {
      return <PlayerPolColAdvOff player={this.props.player} />;
    } else if (this.state.statCat === "Post Ups") {
      return (
        <PlayerPolColPostUp
          player={this.props.postStats}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Defense") {
      return <PlayerPolColDef player={this.props.player} />;
    } else if (this.state.statCat === "Overall") {
      return <PlayerPolColOvr player={this.props.player} />;
    } else if (this.state.statCat === "Catch/Shoot") {
      return (
        <PlayerPolColCatchShoot
          player={this.props.catchShootStats}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Shooting Efficiency") {
      return (
        <PlayerPolColShooting
          player={this.props.shootingStats}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Speed/Distance") {
      return <PlayerPolColSD player={this.props.speedDistanceStats} />;
    } else if (this.state.statCat === "P+R Ball Handler") {
      return (
        <PlayerPolColPRBH
          player={this.props.prHandler}
          gp={this.props.player.gamesPlayed}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "P+R Roll Man") {
      return (
        <PlayerPolColPRRM
          player={this.props.prRollMan}
          gp={this.props.player.gamesPlayed}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Isolation") {
      return (
        <PlayerPolColIso
          player={this.props.iso}
          gp={this.props.player.gamesPlayed}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Transition") {
      return (
        <PlayerPolColTransition
          player={this.props.transition}
          min={this.props.player.mpg}
        />
      );
    } else if (this.state.statCat === "Hustle") {
      return (
        <PlayerPolColHustle
          player={this.props.hustle}
          min={this.props.player.mpg}
        />
      );
    }
  }

  renderBarChart() {
    if (this.state.statCat === "Basic") {
      return <PlayerBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Offense") {
      return <PlayerOffBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Advanced Offense") {
      return <PlayerAdvOffBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Post Ups") {
      return <PlayerPostUpBarRatings player={this.props.postStats} />;
    } else if (this.state.statCat === "Defense") {
      return <PlayerDefBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Overall") {
      return <PlayerOvrBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Catch/Shoot") {
      return <PlayerCatchShootBarRatings player={this.props.catchShootStats} />;
    }
  }

  renderRankGauges() {
    if (this.props.positionStats && this.props.player) {
      return (
        <PlayerRankGauges
          colors={this.props.colors}
          player={this.props.player}
          positionStats={this.props.positionStats}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  render() {
    var headerStyle = {
      backgroundColor: this.props.colors.Color_Main,
      height: "50px",
      lineHeight: "50px",
      fontSize: "20px",
      paddingLeft: "25px",
      color: this.props.colors.Color_Sec
    };
    return (
      <div>
        <Grid>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={3} lgOffset={1} md={3}>
              <div className="card" style={headerStyle}>
                PLAYER RATINGS
              </div>
            </Col>
            <Col lg={2} lgOffset={5} md={3} mdOffset={5}>
              <div className="stat-selector">
                <DropdownButton
                  pullRight
                  title={this.state.statCat}
                  className="card"
                  style={{
                    border: "none",
                    fontSize: "16px",
                    backgroundColor: this.props.colors.Color_Main,
                    marginTop: "20px",
                    color: this.props.colors.Color_Sec
                  }}
                  onSelect={this.selectStatCat}
                >
                  <MenuItem eventKey="1">Basic</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2">Offense</MenuItem>
                  <MenuItem eventKey="3">Advanced Offense</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Play Type</MenuItem>
                  <MenuItem eventKey="10">P+R Ball Handler</MenuItem>
                  <MenuItem eventKey="11">P+R Roll Man</MenuItem>
                  <MenuItem eventKey="12">Isolation</MenuItem>
                  <MenuItem eventKey="14">Transition</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Player Tracking</MenuItem>
                  <MenuItem eventKey="4">Shooting Efficiency</MenuItem>
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
            </Col>
          </Row>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={5} lgOffset={1} md={6}>
              {this.renderPolarCol()}
            </Col>
            <Col lg={5} md={6}>
              {/*<PlayerPolarArea
                player={this.props.player}
                colors={this.props.colors}
              />*/}
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={8} lgOffset={2}>
              {this.renderBarChart()}
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1} md={4}>
              <div className="card" style={headerStyle}>
                POSITION RANKINGS
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1} xs={12}>
              <div
                className="card"
                style={{
                  backgroundColor: "rgba(0,0,0,0.6)",
                  paddingBottom: "20px"
                }}
              >
                {this.renderRankGauges()}
              </div>
            </Col>
          </Row>

          <Row className="chart-row">
            <Col lg={3} lgOffset={1} md={4}>
              <div className="card" style={headerStyle}>
                POSITION AVERAGES
              </div>
            </Col>
          </Row>
          <Row className="chart-row" style={{ paddingBottom: "20px" }}>
            <Col lg={10} lgOffset={1}>
              <PlayerPositionAverages
                player={this.props.player}
                positionStats={this.props.positionStats}
                colors={this.props.colors}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
