import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Table,
  FormGroup,
  Radio,
  Checkbox
} from "react-bootstrap";

export default class CollegePlayerScatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      statOne: "pts",
      statTwo: "mpg",
      position: "All",
      teamPlayers: [],
      showFilter: false,
      g: true,
      f: true,
      c: true,
      mpg1: true,
      mpg2: true,
      mpg3: true,
      mpg4: true,
      mpg5: true,
      exp1: false,
      exp2: false,
      exp3: false,
      exp4: false,
      exp5: false,
      age1: false,
      age2: false,
      age3: false,
      age4: false,
      age5: false
    };
    this.createChart = this.createChart.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstInputChange = this.firstInputChange.bind(this);
    this.secondInputChange = this.secondInputChange.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.filterPlayers = this.filterPlayers.bind(this);
    this.handleG = this.handleG.bind(this);
    this.handleF = this.handleF.bind(this);
    this.handleC = this.handleC.bind(this);
    this.handleMPG1 = this.handleMPG1.bind(this);
    this.handleMPG2 = this.handleMPG2.bind(this);
    this.handleMPG3 = this.handleMPG3.bind(this);
    this.handleMPG4 = this.handleMPG4.bind(this);
    this.handleMPG5 = this.handleMPG5.bind(this);
  }

  componentDidMount() {
    var playerData = [];
    var scatterData = [];
    if (this.props.players) {
      var data = this.props.players;
      for (var i = 0; i < data.length; i++) {
        if (parseFloat(data[i]["mpg"]) >= 5.0) {
          playerData.push(data[i]);
        }
      }
      this.setState({ teamPlayers: playerData });
      for (var j = 0; j < playerData.length; j++) {
        scatterData.push({
          data: [
            [
              parseFloat(playerData[j][this.state.statTwo]),
              parseFloat(playerData[j][this.state.statOne])
            ]
          ],
          name: playerData[j].name,
          color: "#0055bf",
          _symbolIndex: 0,
          id: playerData[j].id
        });
      }
      this.setState({ data: scatterData }, () => {
        this.createChart();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    var playerData = [];
    var scatterData = [];
    if (nextProps.players) {
      var data = nextProps.players;
      for (var i = 0; i < data.length; i++) {
        if (parseFloat(data[i]["mpg"]) >= 5.0) {
          playerData.push(data[i]);
        }
      }
      this.setState({ teamPlayers: playerData });
      for (var j = 0; j < playerData.length; j++) {
        scatterData.push({
          data: [
            [
              parseFloat(playerData[j][this.state.statTwo]),
              parseFloat(playerData[j][this.state.statOne])
            ]
          ],
          name: playerData[j].name,
          color: "#0055bf",
          _symbolIndex: 0,
          id: playerData[j].id
        });
      }
      this.setState({ data: scatterData }, () => {
        this.createChart();
      });
    }
  }

  createChart() {
    var chart = Highcharts.chart("containerScatterCP", {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: "Player Stats College"
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
          cursor: "pointer",
          point: {
            events: {
              click: event => {
                console.log("Event: ", event.point.series.userOptions.id);
                window.location =
                  "/college-player/" + event.point.series.userOptions.id;
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
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: `{point.x} ${this.state.statTwo}, {point.y} ${this
              .state.statOne}`
          }
        }
      },
      series: this.state.data
    });
  }

  filterClick() {
    this.setState({ showFilter: !this.state.showFilter });
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

  handleG(evt) {
    this.setState({ g: evt.target.checked }, () => {
      console.log(this.state.sf);
    });
  }

  handleF(evt) {
    this.setState({ f: evt.target.checked }, () => {
      console.log(this.state.f);
    });
  }

  handleC(evt) {
    this.setState({ c: evt.target.checked }, () => {
      console.log(this.state.c);
    });
  }

  handleMPG1(evt) {
    this.setState({ mpg1: evt.target.checked });
  }
  handleMPG2(evt) {
    this.setState({ mpg2: evt.target.checked });
  }
  handleMPG3(evt) {
    this.setState({ mpg3: evt.target.checked });
  }
  handleMPG4(evt) {
    this.setState({ mpg4: evt.target.checked });
  }
  handleMPG5(evt) {
    this.setState({ mpg5: evt.target.checked });
  }

  handleSubmit(event) {
    var statArr = [];
    event.preventDefault();
    for (let i = 0; i < this.props.players.length; i++) {
      let player = this.props.players[i];
      statArr.push({
        data: [
          [
            parseFloat(player[this.state.statTwo]),
            parseFloat(player[this.state.statOne])
          ]
        ],
        name: player.name,
        color: "#0055bf",
        _symbolIndex: 0,
        id: player.id
      });
    }
    this.setState({ data: statArr }, () => {
      //console.log(this.state.data);
      this.createChart();
    });
  }

  filterPlayers() {
    var playersArr = this.state.teamPlayers;

    if (!this.state.g) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "G";
      });
    }

    if (!this.state.f) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "F";
      });
    }

    if (!this.state.c) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "C";
      });
    }

    if (!this.state.mpg1) {
      playersArr = playersArr.filter(function(player) {
        return player.mpg >= 15.0;
      });
    }
    if (!this.state.mpg2) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 15.0 || player.mpg >= 20.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg3) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 20.0 || player.mpg >= 25.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg4) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 25.0 || player.mpg >= 30.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg5) {
      playersArr = playersArr.filter(function(player) {
        return player.mpg < 30.0;
      });
    }

    // if (!this.state.exp1) {
    //   playersArr = playersArr.filter(function(player) {
    //     return player.experience !== "R";
    //   });
    // }
    // if (!this.state.exp2) {
    //   playersArr = playersArr.filter(function(player) {
    //     if (player.experience === "R" || player.experience > 3) {
    //       return player;
    //     }
    //   });
    // }
    // if (!this.state.exp3) {
    //   playersArr = playersArr.filter(function(player) {
    //     if (
    //       player.experience === "R" ||
    //       player.experience < 4 ||
    //       player.experience > 6
    //     ) {
    //       return player;
    //     }
    //   });
    // }
    // if (!this.state.exp4) {
    //   playersArr = playersArr.filter(function(player) {
    //     if (
    //       player.experience === "R" ||
    //       player.experience < 7 ||
    //       player.experience > 10
    //     ) {
    //       return player;
    //     }
    //   });
    // }
    // if (!this.state.exp5) {
    //   playersArr = playersArr.filter(function(player) {
    //     if (player.experience === "R" || player.experience < 11) {
    //       return player;
    //     }
    //   });
    // }

    // if (!this.state.age1) {
    //   playersArr = playersArr.filter(function(player) {
    //     return player.age >= 21;
    //   });
    // }
    // if (!this.state.age2) {
    //   playersArr = playersArr.filter(function(player) {
    //     if (player.age < 21 || player.age > 25.0) {
    //       return player;
    //     }
    //   });
    // }
    // if (!this.state.age3) {
    //   playersArr = playersArr.filter(function(player) {
    //     if (player.age < 26 || player.age > 30) {
    //       return player;
    //     }
    //   });
    // }
    // if (!this.state.age4) {
    //   playersArr = playersArr.filter(function(player) {
    //     if (player.age < 31 || player.age > 35) {
    //       return player;
    //     }
    //   });
    // }
    // if (!this.state.age5) {
    //   playersArr = playersArr.filter(function(player) {
    //     return player.age < 35;
    //   });
    // }
    this.setState({ players: playersArr }, () => {
      //console.log("End Arr: ", this.state.players);
      var statArr = [];
      for (let i = 0; i < this.state.players.length; i++) {
        let player = this.state.players[i];
        statArr.push({
          data: [
            [
              parseFloat(player[this.state.statTwo]),
              parseFloat(player[this.state.statOne])
            ]
          ],
          name: player.name,
          color: "#0055bf",
          _symbolIndex: 0,
          id: player.id
        });
      }
      this.setState({ data: statArr }, () => {
        //console.log(this.state.data);
        this.createChart();
      });
    });
  }

  handleFilterSubmit() {
    this.filterPlayers();
  }

  renderFilter() {
    if (this.state.showFilter === true) {
      return (
        <div style={{ height: "100px" }}>
          <Col lg={1} lgOffset={2}>
            <div style={{ color: "#0055bf", textDecoration: "underline" }}>
              Position
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.g} onChange={this.handleG}>
                G
              </Checkbox>{" "}
              <Checkbox checked={this.state.f} onChange={this.handleF}>
                F
              </Checkbox>{" "}
              <Checkbox checked={this.state.c} onChange={this.handleC}>
                C
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2}>
            <div style={{ paddingLeft: "30px" }}>
              <div style={{ color: "#0055bf", textDecoration: "underline" }}>
                MPG
              </div>
              <FormGroup style={{ paddingLeft: "10px" }}>
                <Checkbox checked={this.state.mpg1} onChange={this.handleMPG1}>
                  5-15
                </Checkbox>{" "}
                <Checkbox checked={this.state.mpg2} onChange={this.handleMPG2}>
                  15-20
                </Checkbox>{" "}
                <Checkbox checked={this.state.mpg3} onChange={this.handleMPG3}>
                  20-25
                </Checkbox>{" "}
                <Checkbox checked={this.state.mpg4} onChange={this.handleMPG4}>
                  25-30
                </Checkbox>{" "}
                <Checkbox checked={this.state.mpg5} onChange={this.handleMPG5}>
                  > 30
                </Checkbox>
              </FormGroup>
            </div>
          </Col>
          <Col lg={2}>
            <div style={{ color: "#0055bf", textDecoration: "underline" }}>
              Experience
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox disabled>Freshman</Checkbox>{" "}
              <Checkbox disabled>Sophomore</Checkbox>{" "}
              <Checkbox disabled>Junior</Checkbox>{" "}
              <Checkbox disabled>Senior</Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2}>
            <div style={{ color: "#0055bf", textDecoration: "underline" }}>
              Age
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox disabled>&#60; 19</Checkbox>{" "}
              <Checkbox disabled>19-20</Checkbox>{" "}
              <Checkbox disabled>21-22</Checkbox>{" "}
              <Checkbox disabled>> 22</Checkbox>{" "}
            </FormGroup>
          </Col>
          <Col lg={2}>
            <div>
              <Button
                onClick={this.handleFilterSubmit}
                style={{ backgroundColor: "#0055bf", color: "white" }}
              >
                Filter
              </Button>
            </div>
          </Col>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div
          className="card playerScatter"
          id="containerScatterCP"
          style={{
            height: "500px"
          }}
        />
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={12}>
            <div className="card" style={{ backgroundColor: "white" }}>
              <div>
                <form>
                  <Col lg={4} lgOffset={1}>
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
                        <option>wsFortyEight</option>
                        <option>vorp</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
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
                        <option>wsFortyEight</option>
                        <option>vorp</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={1}>
                    <div>
                      <button
                        onClick={this.handleSubmit}
                        id="submit-button"
                        style={{ backgroundColor: "#0055bf", color: "white" }}
                      >
                        Submit
                      </button>
                    </div>
                  </Col>
                  <Col lg={1}>
                    <div
                      style={{
                        color: "#0055bf",
                        textDecoration: "underline",
                        paddingTop: "2px",
                        cursor: "pointer"
                      }}
                      onClick={this.filterClick}
                    >
                      Filter
                    </div>
                  </Col>
                  <Col lg={12} style={{ paddingTop: "20px" }}>
                    {this.renderFilter()}
                  </Col>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
