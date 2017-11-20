import React from "react";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";
import axios from "axios";
import PieChart from "./PieChart.js";
import TeamPlayerRanks from "./TeamPlayerRanks";

export default class TeamPlayerStats extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      statOne: "pts",
      statTwo: "mpg",
      team: "San Antonio Spurs",
      position: "All",
      teamPlayers: []
    };
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    var playerData = [];
    var scatterData = [];
    axios
      .get("/api/teams/getPlayerStats", {
        params: {
          team: this.state.team,
          position: this.state.position,
          statOne: this.state.statOne,
          statTwo: this.state.statTwo
        }
      })
      .then(data => {
        console.log("GETPLAYER STATS\n", data.data);
        var data = data.data;
        for (var i = 0; i < data.length; i++) {
          if (parseInt(data[i]["mpg"]) >= 5) {
            playerData.push(data[i]);
          }
        }
        this.setState({ teamPlayers: playerData });
        for (var j = 0; j < playerData.length; j++) {
          scatterData.push({
            data: [[playerData[j].mpg, playerData[j].pts]],
            name: playerData[j].name,
            color: "rgb(0, 0, 0, .75)",
            _symbolIndex: 0
          });
        }
        this.setState({ data: scatterData }, () => {
          this.createChart();
          console.log("PLAYERS: ", this.state.teamPlayers);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  createChart() {
    var chart = Highcharts.chart("container", {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: `Player Stats ${this.state.team}`
      },
      subtitle: {
        text: "Players Averaging Over 5 MPG"
      },
      xAxis: {
        title: {
          enabled: true,
          text: `${this.state.statTwo}`
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
      },
      yAxis: {
        title: {
          text: `${this.state.statOne}`
        }
      },
      legend: {
        enabled: false,
        layout: "vertical",
        align: "left",
        verticalAlign: "top",
        x: 100,
        y: 70,
        floating: true,
        backgroundColor:
          (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
          "#FFFFFF",
        borderWidth: 1
      },
      plotOptions: {
        scatter: {
          marker: {
            radius: 5,
            states: {
              hover: {
                enabled: true,
                lineColor: "rgb(100,100,100)"
              }
            }
          },
          states: {
            hover: {
              marker: {
                enabled: false
              }
            }
          },
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: `{point.x} ${this.state.statTwo}, {point.y} ${this
              .state.statOne}`
          }
        }
      },
      series: this.state.data
    });

    var pieChart = Highcharts.chart("container2", {
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: "Team Stats Pct by Player"
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 35,
          dataLabels: {
            enabled: true,
            format: "{point.name}"
          }
        }
      },
      series: [
        {
          type: "pie",
          name: "Browser share",
          data: [
            ["Firefox", 45.0],
            ["IE", 26.8],
            {
              name: "Chrome",
              y: 12.8,
              sliced: true,
              selected: true
            },
            ["Safari", 8.5],
            ["Opera", 6.2],
            ["Others", 0.7]
          ]
        }
      ]
    });

    var barChart = new Highcharts.Chart({
      chart: {
        renderTo: "container3",
        type: "column",
        options3d: {
          enabled: true,
          alpha: 0,
          beta: 10,
          depth: 37,
          viewDistance: 25
        }
      },
      title: {
        text: "Player Stat Averages"
      },
      subtitle: {
        text: ""
      },
      plotOptions: {
        column: {
          depth: 25
        }
      },
      series: [
        {
          data: [
            {
              name: "LeMarcus Aldridge",
              y: 84.3,
              color: "rgb(0, 0, 0, .75)"
            },
            71.5,
            106.4,
            129.2,
            144.0,
            176.0,
            135.6,
            148.5,
            216.4,
            194.1,
            95.6,
            54.4
          ]
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <div
                className="card"
                id="container"
                style={{
                  height: "500px",
                  width: "800",
                  margin: "0 auto"
                }}
              />
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={5} lgOffset={1}>
              <div className="card">
                <div id="team-rankings-header">
                  <div id="roster-header-text">Team Shares</div>
                </div>

                <div
                  id="container2"
                  style={{
                    height: "400px"
                  }}
                />
              </div>
            </Col>
            <Col lg={5}>
              <div className="card" id="team-player-ranks-container">
                <div id="team-rankings-header">
                  <div id="roster-header-text">Player Rankings</div>
                </div>
                <div style={{ height: "400px", backgroundColor: "#ffffff" }}>
                  <TeamPlayerRanks players={this.state.teamPlayers} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={10} lgOffset={1}>
              <div
                className="card"
                id="container3"
                style={{
                  height: "500px",
                  width: "800",
                  margin: "0 auto"
                }}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
