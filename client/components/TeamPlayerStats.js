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
      position: "All",
      teamPlayers: []
    };
    this.createChart = this.createChart.bind(this);
    this.getPlayerShare = this.getPlayerShare.bind(this);
    this.getColumnData = this.getColumnData.bind(this);
  }

  componentDidMount() {
    var playerData = [];
    var scatterData = [];
    axios
      .get("/api/teams/getPlayerStats", {
        params: {
          team: this.props.team.Name,
          position: this.state.position,
          statOne: this.state.statOne,
          statTwo: this.state.statTwo
        }
      })
      .then(data => {
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
            color: this.props.team.Color_Main,
            _symbolIndex: 0
          });
        }
        this.setState({ data: scatterData }, () => {
          this.getColumnData("pts");
          this.getPlayerShare("mpg");
          //this.createChart();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getPlayerShare(stat) {
    var numPlayers = this.state.teamPlayers.length;
    var total = 0;
    var pieData = [];
    if (this.state.teamPlayers) {
      for (var i = 0; i < this.state.teamPlayers.length; i++) {
        total += parseFloat(this.state.teamPlayers[i][stat]);
      }
      for (var j = 0; j < this.state.teamPlayers.length; j++) {
        //var player = [];
        var pct = this.state.teamPlayers[j][stat] / total * 100;
        var player = [
          this.state.teamPlayers[j].name,
          parseFloat(pct.toFixed(1))
        ];
        pieData.push(player);
      }
    }
    this.setState({ pieData: pieData }, () => {
      this.createChart();
    });
  }

  getColumnData(stat) {
    var columnData = [];
    if (this.state.teamPlayers) {
      for (var i = 0; i < this.state.teamPlayers.length; i++) {
        var player = [
          this.state.teamPlayers[i].name,
          parseFloat(this.state.teamPlayers[i][stat])
        ];
        columnData.push(player);
      }
    }
    this.setState({ columnData: columnData });
  }

  createChart() {
    var chart = Highcharts.chart("container", {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: `Player Stats ${this.props.team.Name}`
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
          name: "Team Share",
          data: this.state.pieData
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
        text: `${this.props.team.Name} Stat Averages`
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
          name: "Pts",
          color: `${this.props.team.Color_Main}`,
          data: this.state.columnData
        }
      ]
    });
  }

  render() {
    var headerStyle = {
      backgroundColor: this.props.team.Color_Main,
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "25px",
      color: this.props.team.Color_Sec
    };
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
            <Col lg={3} lgOffset={1}>
              <div className="card">
                <div style={headerStyle}>
                  <div>Team Shares - MPG</div>
                </div>
              </div>
            </Col>
            <Col lg={3} lgOffset={2}>
              <div className="card">
                <div style={headerStyle}>
                  <div>Team Leaders - PTS</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={5} lgOffset={1}>
              <div className="card">
                <div
                  id="container2"
                  style={{
                    height: "400px"
                  }}
                />
              </div>
            </Col>
            <Col lg={5}>
              <div className="card">
                <div
                  style={{ height: "400px", backgroundColor: "#ffffff" }}
                  id="team-player-ranks-container"
                >
                  <TeamPlayerRanks players={this.state.teamPlayers} />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1}>
              <div className="card">
                <div style={headerStyle}>
                  <div>Player Averages - PTS</div>
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
