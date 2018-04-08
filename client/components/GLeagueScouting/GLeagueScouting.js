import React from "react";
import { Col, Button, Well, Row, Grid } from "react-bootstrap";
import GLeagueScoutingTabs from "./GLeagueScoutingTabs";
import axios from "axios";

export default class GLeagueScouting extends React.Component {
  constructor() {
    super();
    this.state = {
      playerStats: [],
      teams: []
    };
    this.getGLeaguePlayers = this.getGLeaguePlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  componentDidMount() {
    this.getGLeaguePlayers();
    this.getTeams();
  }

  getGLeaguePlayers() {
    axios
      .get("/api/teams/getAllgPlayers")
      .then(data => {
        this.setState({ playerStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeams() {
    axios
      .get("/api/teams/getgLeagueStats")
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
                style={{ marginTop: "53px", backgroundColor: "none" }}
                className="card"
              >
                <Row>
                  <Col lg={12}>
                    <div
                      style={{
                        marginTop: "20px",
                        marginLeft: "20px",
                        fontSize: "22px",
                        color: "#3f336d"
                      }}
                    >
                      G-LEAGUE SCOUTING
                    </div>
                    <hr
                      style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginBottom: "0px"
                      }}
                    />
                    <GLeagueScoutingTabs
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
