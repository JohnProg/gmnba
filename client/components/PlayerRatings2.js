import React from "react";
import PlayerPolarArea from "./PlayerPolarArea";
import PlayerPolarColumn from "./PlayerPolarColumn";
import { Col, Row, Grid, MenuItem, DropdownButton } from "react-bootstrap";
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

export default class extends React.Component {
  constructor() {
    super();
    this.state = {
      statCat: "Basic"
    };
    this.selectStatCat = this.selectStatCat.bind(this);
    this.renderPolarCol = this.renderPolarCol.bind(this);
  }

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

  render() {
    return (
      <div>
        <Col lg={5} md={5} style={{ paddingLeft: "15px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative" }}>{this.renderPolarCol()}</div>
            <div className="stat-selector">
              <DropdownButton
                pullRight
                title={this.state.statCat}
                className="css-box-shadow"
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
          </div>
        </Col>
        <Col lg={6} md={6} style={{ paddingLeft: "13px" }}>
          <PlayerPolarArea
            player={this.props.player}
            colors={this.props.colors}
          />
        </Col>
      </div>
    );
  }
}
