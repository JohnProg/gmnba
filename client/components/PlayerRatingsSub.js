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
import PlayerPositionAverages from "./PlayerPositionAverages";
import PlayerRankGauges from "./PlayerRankGauges";
import PlayerBarRatings from "./PlayerBarRatings";
import PlayerOffBarRatings from "./PlayerOffBarRatings";
import PlayerAdvOffBarRatings from "./PlayerAdvOffBarRatings";
import PlayerPostUpBarRatings from "./PlayerPostUpBarRatings";
import PlayerDefBarRatings from "./PlayerDefBarRatings";
import PlayerOvrBarRatings from "./PlayerOvrBarRatings";
import PlayerCatchShootBarRatings from "./PlayerCatchShootBarRatings";

export default class PlayerRatingsSub extends React.Component {
  constructor() {
    super();
    this.renderBarChart = this.renderBarChart.bind(this);
    this.renderRankGauges = this.renderRankGauges.bind(this);
  }

  renderBarChart() {
    if (this.props.statCat === "Basic") {
      return <PlayerBarRatings player={this.props.player} />;
    } else if (this.props.statCat === "Offense") {
      return <PlayerOffBarRatings player={this.props.player} />;
    } else if (this.props.statCat === "Advanced Offense") {
      return <PlayerAdvOffBarRatings player={this.props.player} />;
    } else if (this.props.statCat === "Post Ups") {
      return <PlayerPostUpBarRatings player={this.props.postStats} />;
    } else if (this.props.statCat === "Defense") {
      return <PlayerDefBarRatings player={this.props.player} />;
    } else if (this.props.statCat === "Overall") {
      return <PlayerOvrBarRatings player={this.props.player} />;
    } else if (this.props.statCat === "Catch/Shoot") {
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
        <Row style={{ paddingTop: "50px" }}>
          <Col lg={8} lgOffset={2} md={8} mdOffset={2}>
            {this.renderBarChart()}
          </Col>
        </Row>
        <Row style={{ paddingTop: "70px" }}>
          <Col lg={3} lgOffset={1} md={3} mdOffset={1}>
            <div className="card" style={headerStyle}>
              POSITION RANKINGS
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={10} lgOffset={1} xs={12} md={10} mdOffset={1}>
            <div
              className="card"
              style={{
                backgroundColor: "rgba(0,0,0,0.6)",
                paddingBottom: "20px",
                paddingTop: "30px"
              }}
            >
              {this.renderRankGauges()}
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "70px" }}>
          <Col lg={3} lgOffset={1} md={3} mdOffset={1}>
            <div style={headerStyle}>POSITION AVERAGES</div>
          </Col>
        </Row>
        <Row style={{ paddingBottom: "60px", paddingTop: "40px" }}>
          <Col lg={10} lgOffset={1} md={10} mdOffset={1}>
            <PlayerPositionAverages
              player={this.props.player}
              positionStats={this.props.positionStats}
              colors={this.props.colors}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
