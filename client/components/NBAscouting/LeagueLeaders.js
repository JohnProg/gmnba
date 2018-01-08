import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  FormGroup,
  Checkbox
} from "react-bootstrap";
import axios from "axios";
import LeadersTable4 from "./LeadersTable4";
import LeadersTable5 from "./LeadersTable5";
import LeadersTable6 from "./LeadersTable6";
import LeadersTable7 from "./LeadersTable7";
import LeadersTable8 from "./LeadersTable8";
import LeadersTable9 from "./LeadersTable9";
import LeadersOverallTable from "./LeadersOverallTable";
import LeadersOffenseTable from "./LeadersOffenseTable";
import LeadersDefenseTable from "./LeadersDefenseTable";

export default class LeagueLeaders extends React.Component {
  constructor() {
    super();
    this.state = {
      table4: [],
      showFilter: false
    };
    this.rankOverall = this.rankOverall.bind(this);
    this.rankOffense = this.rankOffense.bind(this);
    this.rankDefense = this.rankDefense.bind(this);
    this.rankPoints = this.rankPoints.bind(this);
    this.rankRebounds = this.rankRebounds.bind(this);
    this.rankAssists = this.rankAssists.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
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

  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  renderFilter() {
    if (this.state.showFilter) {
      return (
        <div style={{ height: "100px" }}>
          <Col lg={2} lgOffset={1}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Position
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox>Point Guard</Checkbox>{" "}
              <Checkbox>Shooting Guard</Checkbox>{" "}
              <Checkbox>Shooting Forward</Checkbox>{" "}
              <Checkbox>Power Forward</Checkbox> <Checkbox>Center</Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2}>
            <div style={{ paddingLeft: "30px" }}>
              <div style={{ color: "#d00000", textDecoration: "underline" }}>
                MPG
              </div>
              <FormGroup style={{ paddingLeft: "10px" }}>
                <Checkbox>&#60; 15</Checkbox> <Checkbox>15-20</Checkbox>{" "}
                <Checkbox>20-25</Checkbox> <Checkbox>25-30</Checkbox>{" "}
                <Checkbox>> 30</Checkbox>
              </FormGroup>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Experience
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox>Rookie</Checkbox> <Checkbox>1-3</Checkbox>{" "}
              <Checkbox>4-6</Checkbox> <Checkbox>7-10</Checkbox>{" "}
              <Checkbox>> 10</Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Age
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox>&#60; 21</Checkbox> <Checkbox>21-25</Checkbox>{" "}
              <Checkbox>26-30</Checkbox> <Checkbox>31-35</Checkbox>{" "}
              <Checkbox>> 35</Checkbox>
            </FormGroup>
          </Col>
          <Col lg={3}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Salary Per Year
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox>&#60; 5 mil.</Checkbox> <Checkbox>5-10 mil.</Checkbox>{" "}
              <Checkbox>10-15 mil.</Checkbox> <Checkbox>15-20 mil.</Checkbox>{" "}
              <Checkbox>> 20 mil.</Checkbox>
            </FormGroup>
          </Col>
        </div>
      );
    }
  }

  render() {
    var headerStyle = {
      backgroundColor: "#d00000",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    return (
      <div>
        <Row style={{ paddingLeft: "20px", paddingTop: "30px" }}>
          <Col lg={12}>
            <div
              onClick={this.toggleFilter}
              style={{
                color: "#d00000",
                textDecoration: "underline",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Filter
            </div>
          </Col>
          <Col lg={12} style={{ paddingTop: "20px" }}>
            {this.renderFilter()}
          </Col>
        </Row>
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
                color: "#d00000",
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
