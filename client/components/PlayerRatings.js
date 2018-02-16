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
import axios from "axios";

export default class PlayerRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionStats: [],
      statCat: "Basic"
    };
    this.getPositionStats = this.getPositionStats.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
    this.renderPolarCol = this.renderPolarCol.bind(this);
    this.renderBarChart = this.renderBarChart.bind(this);
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
    } else if (this.state.statCat === "Defense") {
      return <PlayerPolColDef player={this.props.player} />;
    } else if (this.state.statCat === "Overall") {
      return <PlayerPolColOvr player={this.props.player} />;
    }
  }

  renderBarChart() {
    if (this.state.statCat === "Basic") {
      return <PlayerBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Offense") {
      return <PlayerOffBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Advanced Offense") {
      return <PlayerAdvOffBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Defense") {
      return <PlayerDefBarRatings player={this.props.player} />;
    } else if (this.state.statCat === "Overall") {
      return <PlayerOvrBarRatings player={this.props.player} />;
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
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                PLAYER RATINGS
              </div>
            </Col>
            <Col lg={2} lgOffset={6}>
              <div>
                <DropdownButton
                  title={this.state.statCat}
                  className="card"
                  style={{
                    border: "none",
                    fontSize: "16px",
                    backgroundColor: "#eee",
                    marginTop: "20px"
                  }}
                  onSelect={this.selectStatCat}
                >
                  <MenuItem eventKey="1">Basic</MenuItem>
                  <MenuItem eventKey="2">Offense</MenuItem>
                  <MenuItem eventKey="3">Advanced Offense</MenuItem>
                  <MenuItem eventKey="3">Defense</MenuItem>
                  <MenuItem eventKey="3">Overall</MenuItem>
                </DropdownButton>
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={5} lgOffset={1}>
              {this.renderPolarCol()}
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
              {this.renderBarChart()}
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
