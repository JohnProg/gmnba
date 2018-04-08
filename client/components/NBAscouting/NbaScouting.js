import React from "react";
import { Col, Button, Well, Row, Grid } from "react-bootstrap";
import NbaScoutingTabs from "./NbaScoutingTabs";
import axios from "axios";

export default class NbaScouting extends React.Component {
  constructor() {
    super();
    this.state = {
      playerStats: [],
      playerContracts: [],
      teams: []
    };
    this.getAllNbaPlayers = this.getAllNbaPlayers.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getAllContracts = this.getAllContracts.bind(this);
    this.checkLoad = this.checkLoad.bind(this);
  }

  componentDidMount() {
    this.getAllNbaPlayers();
    this.getTeams();
    this.getAllContracts();
  }

  getAllContracts() {
    axios
      .get("/api/teams/getPlayerContracts")
      .then(data => {
        this.setState({ playerContracts: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getAllNbaPlayers() {
    axios
      .get("/api/teams/getAllNbaPlayers")
      .then(data => {
        this.setState({ playerStats: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getTeams() {
    axios
      .get("/api/teams/getLeagueStats")
      .then(data => {
        this.setState({ teams: data.data }, () => {
          //console.log(this.state.teams);
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
                style={{
                  marginTop: "53px",
                  backgroundColor: "rgba(0,0,0,0.3)"
                }}
                className="card"
              >
                <Row>
                  <Col lg={12}>
                    <div
                      style={{
                        marginTop: "20px",
                        marginLeft: "20px",
                        fontSize: "22px",
                        color: "#d00000"
                      }}
                    >
                      NBA SCOUTING
                    </div>
                    <hr
                      style={{
                        marginLeft: "20px",
                        marginRight: "20px",
                        marginBottom: "0px"
                      }}
                    />
                    <NbaScoutingTabs
                      players={this.state.playerStats}
                      teams={this.state.teams}
                      contracts={this.state.playerContracts}
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
