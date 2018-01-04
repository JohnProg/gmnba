import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import axios from "axios";
import LeadersTable4 from "../NBAscouting/LeadersTable4";
import LeadersTable5 from "../NBAscouting/LeadersTable5";
import LeadersTable6 from "../NBAscouting/LeadersTable6";
import LeadersTable7 from "../NBAscouting/LeadersTable7";
import LeadersTable8 from "../NBAscouting/LeadersTable8";
import LeadersTable9 from "../NBAscouting/LeadersTable9";
import LeadersOverallTable from "../NBAscouting/LeadersOverallTable";
import LeadersOffenseTable from "../NBAscouting/LeadersOffenseTable";
import LeadersDefenseTable from "../NBAscouting/LeadersDefenseTable";

export default class CollegeLeaders extends React.Component {
  constructor() {
    super();
    this.state = {
      table4: []
    };
    this.rankOverall = this.rankOverall.bind(this);
    this.rankOffense = this.rankOffense.bind(this);
    this.rankDefense = this.rankDefense.bind(this);
    this.rankPoints = this.rankPoints.bind(this);
    this.rankRebounds = this.rankRebounds.bind(this);
    this.rankAssists = this.rankAssists.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.players) {
      this.setState(
        {
          players: nextProps.players
        },
        () => {
          this.rankOverall();
          this.rankOffense();
          this.rankDefense();
          this.rankPoints();
          this.rankRebounds();
          this.rankAssists();
        }
      );
    }
  }

  rankOverall() {
    let players = this.state.players;
  }

  rankOffense() {}

  rankDefense() {}

  rankPoints() {
    let players = this.state.players;
    players.sort(
      function(a, b) {
        return parseFloat(b.pts) - parseFloat(a.pts);
      },
      () => {
        this.setState({ table4: players });
      }
    );
  }

  rankRebounds() {}

  rankAssists() {}

  render() {
    var headerStyle = {
      backgroundColor: "#0055bf",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    return (
      <div>
        <Row style={{ paddingTop: "40px", paddingLeft: "10px" }}>
          <Col lg={3}>
            <div className="card" style={headerStyle}>
              Overall
            </div>
          </Col>
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              Offense
            </div>
          </Col>
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              Defense
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "40px",
            paddingLeft: "10px",
            paddingRight: "10px"
          }}
        >
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersOverallTable players={this.props.players} />
            </div>
          </Col>
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersOffenseTable players={this.props.players} />
            </div>
          </Col>
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersDefenseTable players={this.props.players} />
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "60px", paddingLeft: "10px" }}>
          <Col lg={3}>
            <div className="card" style={headerStyle}>
              Points
            </div>
          </Col>
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              Rebounds
            </div>
          </Col>
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              Assists
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "40px",
            paddingLeft: "10px",
            paddingRight: "10px"
          }}
        >
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersTable4 players={this.props.players} />
            </div>
          </Col>
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersTable5 players={this.props.players} />
            </div>
          </Col>
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersTable6 players={this.props.players} />
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "60px" }}>
          <Col lg={12}>
            <div
              style={{
                paddingLeft: "20px",
                color: "#0055bf",
                fontSize: "18px",
                textDecoration: "underline"
              }}
            >
              Per 36 Minutes
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px", paddingLeft: "10px" }}>
          <Col lg={3}>
            <div className="card" style={headerStyle}>
              Points
            </div>
          </Col>
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              Rebounds
            </div>
          </Col>
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              Assists
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "40px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "20px"
          }}
        >
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersTable7 players={this.props.players} />
            </div>
          </Col>
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersTable8 players={this.props.players} />
            </div>
          </Col>
          <Col lg={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <LeadersTable9 players={this.props.players} />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
