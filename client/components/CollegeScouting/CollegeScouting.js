import React from "react";
import { Col, Button, Well, Row, Grid } from "react-bootstrap";
import CollegeScoutingTabs from "./CollegeScoutingTabs";
import axios from "axios";

export default class CollegeScouting extends React.Component {
  constructor() {
    super();
    this.state = {
      playerStats: [],
      teams: []
    };
    this.getCollegePlayers = this.getCollegePlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  componentDidMount() {
    this.getCollegePlayers();
    this.getTeams();
  }

  getCollegePlayers() {
    axios
      .get("/api/teams/getAllCollegePlayers")
      .then(data => {
        this.setState({ playerStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeams() {
    axios
      .get("/api/teams/getcLeagueStats")
      .then(data => {
        this.setState({ teams: data.data }, () => {
          console.log(this.state.teams);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  checkLoad() {
    if (this.state.playerStats.length > 0) {
      return (
        <Grid>
          <Row style={{ paddingBottom: "40px" }}>
            <Col lg={12}>
              <div
                style={{ marginTop: "53px", backgroundColor: "white" }}
                className="card"
              >
                <Row>
                  <Col lg={12}>
                    <div
                      style={{
                        marginTop: "20px",
                        marginLeft: "20px",
                        fontSize: "22px",
                        color: "#192e4f"
                      }}
                    >
                      COLLEGE SCOUTING
                    </div>
                    <hr
                      style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginBottom: "0px"
                      }}
                    />
                    <CollegeScoutingTabs
                      players={this.state.playerStats}
                      teams={this.state.teams}
                      style={{ marginLeft: "20px", marginRight: "20px" }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Grid>
      );
    } else {
      return (
        <div
          style={{ textAlign: "center", marginTop: "250px", color: "white" }}
        >
          <img
            style={{ height: "150px" }}
            src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
          />
          <div>Loading Players...</div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.checkLoad()}</div>;
  }
}
