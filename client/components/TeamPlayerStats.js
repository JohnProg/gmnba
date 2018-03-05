import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Table,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
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
      teamPlayers: [],
      pieStat: "Mpg",
      leaderStat: "pts",
      averageStat: "pts"
    };
    this.createChart = this.createChart.bind(this);
    this.getPlayerShare = this.getPlayerShare.bind(this);
    this.getColumnData = this.getColumnData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstInputChange = this.firstInputChange.bind(this);
    this.secondInputChange = this.secondInputChange.bind(this);
    this.selectPie = this.selectPie.bind(this);
    this.selectLeaders = this.selectLeaders.bind(this);
    this.selectAverage = this.selectAverage.bind(this);
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
          console.log("J: ", playerData[j].id);
          scatterData.push({
            data: [
              [
                playerData[j][this.state.statTwo],
                playerData[j][this.state.statOne]
              ]
            ],
            name: playerData[j].name,
            color: this.props.team.Color_Main,
            _symbolIndex: 0,
            id: playerData[j].id
          });
        }
        this.setState({ data: scatterData }, () => {
          this.getColumnData("pts");
          this.getPlayerShare(this.state.pieStat.toLowerCase());
          //this.createChart();
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit(event) {
    var statArr2 = [];
    event.preventDefault();
    for (let i = 0; i < this.state.teamPlayers.length; i++) {
      console.log(i + ": " + this.state.teamPlayers[i]);
      let player = this.state.teamPlayers[i];
      console.log("PLAYER ID: ", player.id);
      statArr2.push({
        data: [
          [
            parseFloat(player[this.state.statTwo]),
            parseFloat(player[this.state.statOne])
          ]
        ],
        name: player.name,
        color: this.props.team.Color_Main,
        _symbolIndex: 0,
        id: player.id
      });
    }
    this.setState({ data: statArr2 }, () => {
      //console.log(this.state.data);
      this.createChart();
    });
  }

  firstInputChange(event) {
    this.setState({ statOne: event.target.value }, () => {
      //console.log(this.state.statOne);
    });
  }

  secondInputChange(event) {
    this.setState({ statTwo: event.target.value }, () => {
      //console.log(this.state.statTwo);
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
      console.log(total);
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
    this.setState({ columnData: columnData }, () => {
      this.createChart();
    });
  }

  selectPie(evt, eventKey) {
    if (eventKey.target.innerHTML === "freeThrowPct") {
      this.setState({ pieStat: "FT%" }, () => {
        this.getPlayerShare("freeThrowPct");
      });
    } else if (eventKey.target.innerHTML === "threePAr") {
      this.setState({ pieStat: "3PAr" }, () => {
        this.getPlayerShare("threePAr");
      });
    } else if (eventKey.target.innerHTML === "wsFourtyEight") {
      this.setState({ pieStat: "WS/48" }, () => {
        this.getPlayerShare("wsFourtyEight");
      });
    } else {
      this.setState({ pieStat: eventKey.target.innerHTML }, () => {
        this.getPlayerShare(this.state.pieStat);
      });
    }
  }

  selectLeaders(evt, eventKey) {
    this.setState({ leaderStat: eventKey.target.innerHTML });
  }

  selectAverage(evt, eventKey) {
    this.setState({ averageStat: eventKey.target.innerHTML }, () => {
      this.getColumnData(this.state.averageStat);
    });
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
      tooltip: {
        useHTML: true,
        style: {
          pointerEvents: "auto"
        }
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
          cursor: "pointer",
          point: {
            events: {
              click: event => {
                console.log("Event: ", event.point.series.userOptions.id);
                window.location =
                  "/player/" + event.point.series.userOptions.id;
                // this.setState({
                //   name: event.point.series.userOptions.name
                // });
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
            headerFormat: `<b>{series.name}</b><br>`,
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
          name: `${this.state.averageStat}`,
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
    var headerStyle2 = {
      backgroundColor: this.props.team.Color_Main,
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "25px",
      color: this.props.team.Color_Sec
    };
    var statLabels = {
      backgroundColor: this.props.team.Color_Main,
      color: this.props.team.Color_Sec,
      textAlign: "center",
      fontSize: "20px",
      borderRadius: "0px",
      marginBottom: "3px",
      border: "none"
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
          <Row style={{ paddingTop: "40px", paddingLeft: "40px" }}>
            <Col lg={12}>
              <div className="card" style={{ backgroundColor: "white" }}>
                <div>
                  <form>
                    <Col lg={4} sm={5} md={5} xs={5}>
                      <div>
                        <label htmlFor="sel1">
                          Select Stat <sub>(y)</sub> :
                        </label>
                        <select
                          id="sel1"
                          onChange={this.firstInputChange}
                          style={{ marginLeft: "10px" }}
                        >
                          <option>pts</option>
                          <option>ast</option>
                          <option>trb</option>
                          <option>mpg</option>
                          <option>stl</option>
                          <option>blk</option>
                          <option>experience</option>
                          <option>age</option>
                          <option>salary</option>
                          <option>fgm</option>
                          <option>fga</option>
                          <option>fgPct</option>
                          <option>threePt</option>
                          <option>threePtAtt</option>
                          <option>gamesPlayed</option>
                          <option>twoPt</option>
                          <option>twoPtAtt</option>
                          <option>twoPtPct</option>
                          <option>threePtPct</option>
                          <option>ft</option>
                          <option>fta</option>
                          <option>freeThrowPct</option>
                          <option>tov</option>
                          <option>orb</option>
                          <option>drb</option>
                          <option>pf</option>
                          <option>efgPct</option>
                          <option>orbPct</option>
                          <option>astPct</option>
                          <option>tovPct</option>
                          <option>drbPct</option>
                          <option>stlPct</option>
                          <option>blkPct</option>
                          <option>usgPct</option>
                          <option>trbPct</option>
                          <option>tsPct</option>
                          <option>threePAr</option>
                          <option>ftr</option>
                          <option>per</option>
                          <option>ows</option>
                          <option>dws</option>
                          <option>bpm</option>
                          <option>ws</option>
                          <option>obpm</option>
                          <option>dbpm</option>
                          <option>wsFourtyEight</option>
                          <option>vorp</option>
                        </select>
                      </div>
                    </Col>
                    <Col lg={4} sm={5} md={5} xs={5}>
                      <div>
                        <label htmlFor="sel2" className="select-stat-label">
                          Select Stat <sub>(x)</sub> :
                        </label>
                        <select
                          onChange={this.secondInputChange}
                          id="sel2"
                          style={{ marginLeft: "10px" }}
                        >
                          <option>mpg</option>
                          <option>pts</option>
                          <option>ast</option>
                          <option>trb</option>
                          <option>stl</option>
                          <option>blk</option>
                          <option>experience</option>
                          <option>age</option>
                          <option>salary</option>
                          <option>fgm</option>
                          <option>fga</option>
                          <option>fgPct</option>
                          <option>threePt</option>
                          <option>threePtAtt</option>
                          <option>gamesPlayed</option>
                          <option>twoPt</option>
                          <option>twoPtAtt</option>
                          <option>twoPtPct</option>
                          <option>threePtPct</option>
                          <option>ft</option>
                          <option>fta</option>
                          <option>freeThrowPct</option>
                          <option>efgPct</option>
                          <option>tov</option>
                          <option>orb</option>
                          <option>drb</option>
                          <option>pf</option>
                          <option>orbPct</option>
                          <option>astPct</option>
                          <option>tovPct</option>
                          <option>drbPct</option>
                          <option>stlPct</option>
                          <option>blkPct</option>
                          <option>usgPct</option>
                          <option>trbPct</option>
                          <option>tsPct</option>
                          <option>threePAr</option>
                          <option>ftr</option>
                          <option>per</option>
                          <option>ows</option>
                          <option>dws</option>
                          <option>bpm</option>
                          <option>ws</option>
                          <option>obpm</option>
                          <option>dbpm</option>
                          <option>wsFourtyEight</option>
                          <option>vorp</option>
                        </select>
                      </div>
                    </Col>
                    <Col lg={1} sm={2} md={2} xs={2}>
                      <div>
                        <button
                          onClick={this.handleSubmit}
                          id="submit-button"
                          style={{
                            backgroundColor: this.props.team.Color_Main,
                            color: this.props.team.Color_Sec
                          }}
                        >
                          Submit
                        </button>
                      </div>
                    </Col>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={5} lgOffset={1} md={5}>
              <div className="card">
                <div style={headerStyle}>
                  <div>
                    Team Shares -{" "}
                    <DropdownButton
                      title={this.state.pieStat.toUpperCase()}
                      style={statLabels}
                      className="card"
                      onSelect={this.selectPie}
                    >
                      <MenuItem header>Offense</MenuItem>
                      <MenuItem eventKey="1">pts</MenuItem>
                      <MenuItem eventKey="2">ast</MenuItem>
                      <MenuItem eventKey="20">tov</MenuItem>
                      <MenuItem eventKey="25">astPct</MenuItem>
                      <MenuItem eventKey="26">tovPct</MenuItem>
                      <MenuItem eventKey="30">usgPct</MenuItem>
                      <MenuItem eventKey="34">ftr</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Shooting</MenuItem>
                      <MenuItem eventKey="7">fgm</MenuItem>
                      <MenuItem eventKey="8">fga</MenuItem>
                      <MenuItem eventKey="9">fgPct</MenuItem>
                      <MenuItem eventKey="10">threePt</MenuItem>
                      <MenuItem eventKey="11">threePtAtt</MenuItem>
                      <MenuItem eventKey="12">twoPt</MenuItem>
                      <MenuItem eventKey="13">twoPtAtt</MenuItem>
                      <MenuItem eventKey="14">twoPtPct</MenuItem>
                      <MenuItem eventKey="15">threePtPct</MenuItem>
                      <MenuItem eventKey="16">ft</MenuItem>
                      <MenuItem eventKey="17">fta</MenuItem>
                      <MenuItem eventKey="18">freeThrowPct</MenuItem>
                      <MenuItem eventKey="19">efgPct</MenuItem>
                      <MenuItem eventKey="32">tsPct</MenuItem>
                      <MenuItem eventKey="33">threePAr</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Rebounding</MenuItem>
                      <MenuItem eventKey="3">trb</MenuItem>
                      <MenuItem eventKey="21">orb</MenuItem>
                      <MenuItem eventKey="22">drb</MenuItem>
                      <MenuItem eventKey="24">orbPct</MenuItem>
                      <MenuItem eventKey="27">drbPct</MenuItem>
                      <MenuItem eventKey="31">trbPct</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Defense</MenuItem>
                      <MenuItem eventKey="5">stl</MenuItem>
                      <MenuItem eventKey="6">blk</MenuItem>
                      <MenuItem eventKey="28">stlPct</MenuItem>
                      <MenuItem eventKey="29">blkPct</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Misc.</MenuItem>
                      <MenuItem eventKey="4">mpg</MenuItem>
                      <MenuItem eventKey="23">pf</MenuItem>
                      <MenuItem eventKey="35">per</MenuItem>
                      <MenuItem eventKey="36">ows</MenuItem>
                      <MenuItem eventKey="37">dws</MenuItem>
                      <MenuItem eventKey="38">bpm</MenuItem>
                      <MenuItem eventKey="39">ws</MenuItem>
                      <MenuItem eventKey="40">obpm</MenuItem>
                      <MenuItem eventKey="41">dbpm</MenuItem>
                      <MenuItem eventKey="42">wsFortyEight</MenuItem>
                      <MenuItem eventKey="43">vorp</MenuItem>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5} lgOffset={0} md={5} mdOffset={1}>
              <div className="card">
                <div style={headerStyle}>
                  <div>
                    Leaders -{" "}
                    <DropdownButton
                      title={this.state.leaderStat.toUpperCase()}
                      style={statLabels}
                      className="card"
                      onSelect={this.selectLeaders}
                    >
                      <MenuItem header>Offense</MenuItem>
                      <MenuItem eventKey="1">pts</MenuItem>
                      <MenuItem eventKey="2">ast</MenuItem>
                      <MenuItem eventKey="20">tov</MenuItem>
                      <MenuItem eventKey="25">astPct</MenuItem>
                      <MenuItem eventKey="26">tovPct</MenuItem>
                      <MenuItem eventKey="30">usgPct</MenuItem>
                      <MenuItem eventKey="34">ftr</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Shooting</MenuItem>
                      <MenuItem eventKey="7">fgm</MenuItem>
                      <MenuItem eventKey="8">fga</MenuItem>
                      <MenuItem eventKey="9">fgPct</MenuItem>
                      <MenuItem eventKey="10">threePt</MenuItem>
                      <MenuItem eventKey="11">threePtAtt</MenuItem>
                      <MenuItem eventKey="12">twoPt</MenuItem>
                      <MenuItem eventKey="13">twoPtAtt</MenuItem>
                      <MenuItem eventKey="14">twoPtPct</MenuItem>
                      <MenuItem eventKey="15">threePtPct</MenuItem>
                      <MenuItem eventKey="16">ft</MenuItem>
                      <MenuItem eventKey="17">fta</MenuItem>
                      <MenuItem eventKey="18">freeThrowPct</MenuItem>
                      <MenuItem eventKey="19">efgPct</MenuItem>
                      <MenuItem eventKey="32">tsPct</MenuItem>
                      <MenuItem eventKey="33">threePAr</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Rebounding</MenuItem>
                      <MenuItem eventKey="3">trb</MenuItem>
                      <MenuItem eventKey="21">orb</MenuItem>
                      <MenuItem eventKey="22">drb</MenuItem>
                      <MenuItem eventKey="24">orbPct</MenuItem>
                      <MenuItem eventKey="27">drbPct</MenuItem>
                      <MenuItem eventKey="31">trbPct</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Defense</MenuItem>
                      <MenuItem eventKey="5">stl</MenuItem>
                      <MenuItem eventKey="6">blk</MenuItem>
                      <MenuItem eventKey="28">stlPct</MenuItem>
                      <MenuItem eventKey="29">blkPct</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Misc.</MenuItem>
                      <MenuItem eventKey="4">mpg</MenuItem>
                      <MenuItem eventKey="23">pf</MenuItem>
                      <MenuItem eventKey="35">per</MenuItem>
                      <MenuItem eventKey="36">ows</MenuItem>
                      <MenuItem eventKey="37">dws</MenuItem>
                      <MenuItem eventKey="38">bpm</MenuItem>
                      <MenuItem eventKey="39">ws</MenuItem>
                      <MenuItem eventKey="40">obpm</MenuItem>
                      <MenuItem eventKey="41">dbpm</MenuItem>
                      <MenuItem eventKey="42">wsFortyEight</MenuItem>
                      <MenuItem eventKey="43">vorp</MenuItem>
                    </DropdownButton>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={5} lgOffset={1} md={6}>
              <div className="card">
                <div
                  id="container2"
                  style={{
                    height: "400px"
                  }}
                />
              </div>
            </Col>
            <Col lg={5} md={6}>
              <div className="card">
                <div
                  style={{ height: "400px", backgroundColor: "#ffffff" }}
                  id="team-player-ranks-container"
                >
                  <TeamPlayerRanks
                    players={this.state.teamPlayers}
                    stat={this.state.leaderStat}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={5} lgOffset={1} md={5}>
              <div className="card">
                <div style={headerStyle2}>
                  <div>
                    Player Averages -{" "}
                    <DropdownButton
                      title={this.state.averageStat.toUpperCase()}
                      style={statLabels}
                      className="card"
                      onSelect={this.selectAverage}
                    >
                      <MenuItem header>Offense</MenuItem>
                      <MenuItem eventKey="1">pts</MenuItem>
                      <MenuItem eventKey="2">ast</MenuItem>
                      <MenuItem eventKey="20">tov</MenuItem>
                      <MenuItem eventKey="25">astPct</MenuItem>
                      <MenuItem eventKey="26">tovPct</MenuItem>
                      <MenuItem eventKey="30">usgPct</MenuItem>
                      <MenuItem eventKey="34">ftr</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Shooting</MenuItem>
                      <MenuItem eventKey="7">fgm</MenuItem>
                      <MenuItem eventKey="8">fga</MenuItem>
                      <MenuItem eventKey="9">fgPct</MenuItem>
                      <MenuItem eventKey="10">threePt</MenuItem>
                      <MenuItem eventKey="11">threePtAtt</MenuItem>
                      <MenuItem eventKey="12">twoPt</MenuItem>
                      <MenuItem eventKey="13">twoPtAtt</MenuItem>
                      <MenuItem eventKey="14">twoPtPct</MenuItem>
                      <MenuItem eventKey="15">threePtPct</MenuItem>
                      <MenuItem eventKey="16">ft</MenuItem>
                      <MenuItem eventKey="17">fta</MenuItem>
                      <MenuItem eventKey="18">freeThrowPct</MenuItem>
                      <MenuItem eventKey="19">efgPct</MenuItem>
                      <MenuItem eventKey="32">tsPct</MenuItem>
                      <MenuItem eventKey="33">threePAr</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Rebounding</MenuItem>
                      <MenuItem eventKey="3">trb</MenuItem>
                      <MenuItem eventKey="21">orb</MenuItem>
                      <MenuItem eventKey="22">drb</MenuItem>
                      <MenuItem eventKey="24">orbPct</MenuItem>
                      <MenuItem eventKey="27">drbPct</MenuItem>
                      <MenuItem eventKey="31">trbPct</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Defense</MenuItem>
                      <MenuItem eventKey="5">stl</MenuItem>
                      <MenuItem eventKey="6">blk</MenuItem>
                      <MenuItem eventKey="28">stlPct</MenuItem>
                      <MenuItem eventKey="29">blkPct</MenuItem>
                      <MenuItem divider />
                      <MenuItem header>Misc.</MenuItem>
                      <MenuItem eventKey="4">mpg</MenuItem>
                      <MenuItem eventKey="23">pf</MenuItem>
                      <MenuItem eventKey="35">per</MenuItem>
                      <MenuItem eventKey="36">ows</MenuItem>
                      <MenuItem eventKey="37">dws</MenuItem>
                      <MenuItem eventKey="38">bpm</MenuItem>
                      <MenuItem eventKey="39">ws</MenuItem>
                      <MenuItem eventKey="40">obpm</MenuItem>
                      <MenuItem eventKey="41">dbpm</MenuItem>
                      <MenuItem eventKey="42">wsFortyEight</MenuItem>
                      <MenuItem eventKey="43">vorp</MenuItem>
                    </DropdownButton>
                  </div>
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
