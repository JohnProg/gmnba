import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayerRankGauges from "./PlayerRankGauges";
import PlayerPositionAverages from "./PlayerPositionAverages";
import TeamRatings from "./TeamRatings";
import PlayerPolarArea from "./PlayerPolarArea";
import PlayerPolarColumn from "./PlayerPolarColumn";
import PlayerBarRatings from "./PlayerBarRatings";
import axios from "axios";

export default class PlayerRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionStats: []
    };
    this.getPositionStats = this.getPositionStats.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.name) {
      this.setState({ player: nextProps.player }, () => {
        this.getPositionStats(this.state.player.position);
        //this.createChart();
      });
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
        this.setState({ positionStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
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
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                PLAYER RATINGS
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={5} lgOffset={1}>
              <PlayerPolarColumn player={this.props.player} />
            </Col>
            <Col lg={5}>
              <PlayerPolarArea
                player={this.props.player}
                colors={this.props.colors}
              />
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={8} lgOffset={2}>
              <PlayerBarRatings player={this.props.player} />
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                POSITION RANKINGS
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <div
                className="card"
                style={{ height: "300px", backgroundColor: "white" }}
              >
                <PlayerRankGauges
                  colors={this.props.colors}
                  player={this.props.player}
                  positionStats={this.state.positionStats}
                />
              </div>
            </Col>
          </Row>

          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                POSITION AVERAGES
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <PlayerPositionAverages
                player={this.props.player}
                positionStats={this.state.positionStats}
                colors={this.props.colors}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
