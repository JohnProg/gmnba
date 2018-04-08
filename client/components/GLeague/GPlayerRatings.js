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
import GPlayerRankGauges from "./GPlayerRankGauges";
import PlayerPositionAverages from "../PlayerPositionAverages";
import GPlayerPolarArea from "./GPlayerPolarArea";
import GPlayerPolarColumn from "./GPlayerPolarColumn";
import GPlayerBarRatings from "./GPlayerBarRatings";
import GPlayerPolColOff from "./GPlayerPolColOff";
import GPlayerPolColDef from "./GPlayerPolColDef";
// import CollegePlayerPolColOvr from "./CollegePlayerPolColOvr";
import GPlayerPolColAdvOff from "./GPlayerPolColAdvOff";
// import CollegePlayerOffBarRatings from "./CollegePlayerOffBarRatings";
// import CollegePlayerAdvOffBarRatings from "./CollegePlayerAdvOffBarRatings";
// import CollegePlayerDefBarRatings from "./CollegePlayerDefBarRatings";
// import CollegePlayerOvrBarRatings from "./CollegePlayerOvrBarRatings";
import axios from "axios";

export default class GPlayerRatings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionStats: [],
      statCat: "Basic"
    };
    //this.getPositionStats = this.getPositionStats.bind(this);
    this.renderPolarCol = this.renderPolarCol.bind(this);
    this.renderBarChart = this.renderBarChart.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
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
  //     .get("/api/teams/getcPositionStats", {
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

  renderRankGauges() {
    if (this.props.positionStats && this.props.player) {
      return (
        <GPlayerRankGauges
          colors={this.props.colors}
          player={this.props.player}
          positionStats={this.props.positionStats}
        />
      );
    } else {
      return <div>Loading...</div>;
    }
  }

  renderPolarCol() {
    if (this.state.statCat === "Basic") {
      return <GPlayerPolarColumn player={this.props.player} />;
    } else if (this.state.statCat === "Offense") {
      return <GPlayerPolColOff player={this.props.player} />;
    } else if (this.state.statCat === "Advanced Offense") {
      return <GPlayerPolColAdvOff player={this.props.player} />;
    } else if (this.state.statCat === "Defense") {
      return <GPlayerPolColDef player={this.props.player} />;
    } else if (this.state.statCat === "Overall") {
      //return <CollegePlayerPolColOvr player={this.props.player} />;
      return <GPlayerPolarColumn player={this.props.player} />;
    }
  }

  renderBarChart() {
    if (this.state.statCat === "Basic") {
      return <GPlayerBarRatings player={this.props.player} />;
    }
    // else if (this.state.statCat === "Offense") {
    //   return <CollegePlayerOffBarRatings player={this.props.player} />;
    // } else if (this.state.statCat === "Advanced Offense") {
    //   return <CollegePlayerAdvOffBarRatings player={this.props.player} />;
    // } else if (this.state.statCat === "Defense") {
    //   return <CollegePlayerDefBarRatings player={this.props.player} />;
    // } else if (this.state.statCat === "Overall") {
    //   return <CollegePlayerOvrBarRatings player={this.props.player} />;
    // }
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
    var headerStyle2 = {
      backgroundColor: this.props.colors.Color_Main,
      height: "50px",
      lineHeight: "50px",
      fontSize: "20px",
      color: this.props.colors.Color_Sec
    };
    return (
      <div>
        <Grid>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={3} lgOffset={1} md={4}>
              <div className="card" style={headerStyle}>
                PLAYER RATINGS
              </div>
            </Col>
            <Col lg={2} lgOffset={5}>
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
                  <MenuItem eventKey="2">Offense</MenuItem>
                  <MenuItem eventKey="3">Advanced Offense</MenuItem>
                  <MenuItem eventKey="3">Defense</MenuItem>
                  {/*<MenuItem eventKey="3">Overall</MenuItem>*/}
                </DropdownButton>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={5} lgOffset={1} md={6}>
              {this.renderPolarCol()}
            </Col>
            <Col lg={5} md={6}>
              <GPlayerPolarArea
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
            <Col lg={3} lgOffset={1} md={4}>
              <div className="card" style={headerStyle}>
                POSITION RANKINGS
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <div
                className="card"
                style={{
                  paddingBottom: "20px",
                  backgroundColor: "rgba(0,0,0,0.6)"
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
