import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import PlayerTimeline from "./PlayerTimeline";
import CareerProgression from "./CareerProgression";
import axios from "axios";

export default class PlayerCareer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: []
    };
    this.getCareerStats = this.getCareerStats.bind(this);
    this.renderProgression = this.renderProgression.bind(this);
  }

  componentDidMount() {
    this.props.player.year = 2018;
    this.setState({ stats: [...this.state.stats, this.props.player] });
    this.getCareerStats(this.props.player.name);
  }

  getCareerStats(name) {
    axios.get(`/api/teams/getCareerStats/${name}`).then(data => {
      this.setState({ stats: [...this.state.stats, ...data.data] });
    });
  }

  renderProgression() {
    if (this.state.stats.length > 1) {
      return (
        <Row className="chart-row" style={{ paddingBottom: "40px" }}>
          <Col lg={12}>
            <div>
              <CareerProgression
                seasons={this.state.stats}
                statCat="Overall"
                colors={this.props.colors}
              />
            </div>
          </Col>
        </Row>
      );
    }
  }

  render() {
    console.log(this.state.stats);
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
          <Row style={{ paddingTop: "40px" }}>
            <Col lg={3} md={4}>
              <div className="card" style={headerStyle}>
                CAREER RATINGS
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={12}>
              <div>
                <PlayerTimeline stats={this.state.stats} />
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "40px" }}>
            <Col lg={3} md={4}>
              <div className="card" style={headerStyle}>
                PROGRESSION
              </div>
            </Col>
          </Row>
          {this.renderProgression()}
        </Grid>
      </div>
    );
  }
}
