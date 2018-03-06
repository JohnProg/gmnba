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

export default class PlayerScatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      statOne: "pts",
      statTwo: "mpg",
      position: "All",
      teamPlayers: [],
      showFilter: false,
      players: [],
      pg: true,
      sg: true,
      sf: true,
      pf: true,
      c: true,
      mpg1: true,
      mpg2: true,
      mpg3: true,
      mpg4: true,
      mpg5: true,
      exp1: true,
      exp2: true,
      exp3: true,
      exp4: true,
      exp5: true,
      age1: true,
      age2: true,
      age3: true,
      age4: true,
      age5: true
    };
    this.createChart = this.createChart.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstInputChange = this.firstInputChange.bind(this);
    this.secondInputChange = this.secondInputChange.bind(this);
    this.handlePG = this.handlePG.bind(this);
    this.handleSG = this.handleSG.bind(this);
    this.handleSF = this.handleSF.bind(this);
    this.handlePF = this.handlePF.bind(this);
    this.handleC = this.handleC.bind(this);
    this.handleMPG1 = this.handleMPG1.bind(this);
    this.handleMPG2 = this.handleMPG2.bind(this);
    this.handleMPG3 = this.handleMPG3.bind(this);
    this.handleMPG4 = this.handleMPG4.bind(this);
    this.handleMPG5 = this.handleMPG5.bind(this);
    this.handleEXP1 = this.handleEXP1.bind(this);
    this.handleEXP2 = this.handleEXP2.bind(this);
    this.handleEXP3 = this.handleEXP3.bind(this);
    this.handleEXP4 = this.handleEXP4.bind(this);
    this.handleEXP5 = this.handleEXP5.bind(this);
    this.handleAGE1 = this.handleAGE1.bind(this);
    this.handleAGE2 = this.handleAGE2.bind(this);
    this.handleAGE3 = this.handleAGE3.bind(this);
    this.handleAGE4 = this.handleAGE4.bind(this);
    this.handleAGE5 = this.handleAGE5.bind(this);
    this.filterPlayers = this.filterPlayers.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
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
          color: "#d00000",
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
          color: "#d00000",
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
    var chart = Highcharts.chart("containerScatterP", {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: "Player Stats NBA"
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
        color: "#d00000",
        _symbolIndex: 0,
        id: player.id
      });
    }
    this.setState({ data: statArr }, () => {
      //console.log(this.state.data);
      this.createChart();
    });
  }

  handlePG(evt) {
    this.setState({ pg: evt.target.checked }, () => {
      console.log(this.state.pg);
    });
  }

  handleSG(evt) {
    this.setState({ sg: evt.target.checked }, () => {
      console.log(this.state.sg);
    });
  }

  handleSF(evt) {
    this.setState({ sf: evt.target.checked }, () => {
      console.log(this.state.sf);
    });
  }

  handlePF(evt) {
    this.setState({ pf: evt.target.checked }, () => {
      console.log(this.state.pf);
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

  handleEXP1(evt) {
    this.setState({ exp1: evt.target.checked });
  }
  handleEXP2(evt) {
    this.setState({ exp2: evt.target.checked });
  }
  handleEXP3(evt) {
    this.setState({ exp3: evt.target.checked });
  }
  handleEXP4(evt) {
    this.setState({ exp4: evt.target.checked });
  }
  handleEXP5(evt) {
    this.setState({ exp5: evt.target.checked });
  }

  handleAGE1(evt) {
    this.setState({ age1: evt.target.checked });
  }
  handleAGE2(evt) {
    this.setState({ age2: evt.target.checked });
  }
  handleAGE3(evt) {
    this.setState({ age3: evt.target.checked });
  }
  handleAGE4(evt) {
    this.setState({ age4: evt.target.checked });
  }
  handleAGE5(evt) {
    this.setState({ age5: evt.target.checked });
  }

  filterPlayers() {
    var playersArr = this.state.teamPlayers;

    if (!this.state.pg) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "PG";
      });
    }

    if (!this.state.sg) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "SG";
      });
    }

    if (!this.state.sf) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "SF";
      });
    }

    if (!this.state.pf) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "PF";
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

    if (!this.state.exp1) {
      playersArr = playersArr.filter(function(player) {
        return player.experience !== "R";
      });
    }
    if (!this.state.exp2) {
      playersArr = playersArr.filter(function(player) {
        if (player.experience === "R" || player.experience > 3) {
          return player;
        }
      });
    }
    if (!this.state.exp3) {
      playersArr = playersArr.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 4 ||
          player.experience > 6
        ) {
          return player;
        }
      });
    }
    if (!this.state.exp4) {
      playersArr = playersArr.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 7 ||
          player.experience > 10
        ) {
          return player;
        }
      });
    }
    if (!this.state.exp5) {
      playersArr = playersArr.filter(function(player) {
        if (player.experience === "R" || player.experience < 11) {
          return player;
        }
      });
    }

    if (!this.state.age1) {
      playersArr = playersArr.filter(function(player) {
        return player.age >= 21;
      });
    }
    if (!this.state.age2) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 21 || player.age > 25.0) {
          return player;
        }
      });
    }
    if (!this.state.age3) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 26 || player.age > 30) {
          return player;
        }
      });
    }
    if (!this.state.age4) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 31 || player.age > 35) {
          return player;
        }
      });
    }
    if (!this.state.age5) {
      playersArr = playersArr.filter(function(player) {
        return player.age < 35;
      });
    }
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
          color: "#d00000",
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
        <div>
          <Col lg={1} lgOffset={1} sm={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Position
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.pg} onChange={this.handlePG}>
                PG
              </Checkbox>{" "}
              <Checkbox checked={this.state.sg} onChange={this.handleSG}>
                SG
              </Checkbox>{" "}
              <Checkbox checked={this.state.sf} onChange={this.handleSF}>
                SF
              </Checkbox>{" "}
              <Checkbox checked={this.state.pf} onChange={this.handlePF}>
                PF
              </Checkbox>{" "}
              <Checkbox checked={this.state.c} onChange={this.handleC}>
                C
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2} sm={2}>
            <div style={{ paddingLeft: "30px" }}>
              <div style={{ color: "#d00000", textDecoration: "underline" }}>
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
          <Col lg={2} sm={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Experience
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.exp1} onChange={this.handleEXP1}>
                Rookie
              </Checkbox>{" "}
              <Checkbox checked={this.state.exp2} onChange={this.handleEXP2}>
                1-3
              </Checkbox>{" "}
              <Checkbox checked={this.state.exp3} onChange={this.handleEXP3}>
                4-6
              </Checkbox>{" "}
              <Checkbox checked={this.state.exp4} onChange={this.handleEXP4}>
                7-10
              </Checkbox>{" "}
              <Checkbox checked={this.state.exp5} onChange={this.handleEXP5}>
                > 10
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2} sm={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Age
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.age1} onChange={this.handleAGE1}>
                &#60; 21
              </Checkbox>{" "}
              <Checkbox checked={this.state.age2} onChange={this.handleAGE2}>
                21-25
              </Checkbox>{" "}
              <Checkbox checked={this.state.age3} onChange={this.handleAGE3}>
                26-30
              </Checkbox>{" "}
              <Checkbox checked={this.state.age4} onChange={this.handleAGE4}>
                31-35
              </Checkbox>{" "}
              <Checkbox checked={this.state.age5} onChange={this.handleAGE5}>
                > 35
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2} sm={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Salary
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox disabled>&#60; 5 mil.</Checkbox>{" "}
              <Checkbox disabled>5-10 mil.</Checkbox>{" "}
              <Checkbox disabled>10-15 mil.</Checkbox>{" "}
              <Checkbox disabled>15-20 mil.</Checkbox>{" "}
              <Checkbox disabled>> 20 mil.</Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2} sm={2}>
            <div>
              <Button
                onClick={this.handleFilterSubmit}
                style={{ backgroundColor: "#d00000", color: "white" }}
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
          id="containerScatterP"
          style={{
            height: "500px"
          }}
        />
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={12}>
            <div>
              <div>
                <form>
                  <Col lg={4} lgOffset={1} sm={5} mdOffset={1} md={4}>
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
                  <Col lg={4} sm={5} md={4}>
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
                  <Col lg={1} sm={2} md={2}>
                    <div>
                      <button
                        onClick={this.handleSubmit}
                        id="submit-button"
                        style={{ backgroundColor: "#d00000", color: "white" }}
                      >
                        Submit
                      </button>
                    </div>
                  </Col>
                  <Col lg={1} md={1}>
                    <div
                      style={{
                        color: "#d00000",
                        textDecoration: "underline",
                        paddingTop: "2px",
                        cursor: "pointer"
                      }}
                      onClick={this.filterClick}
                    >
                      Filter
                    </div>
                  </Col>
                  <Col lg={12} md={12} style={{ paddingTop: "20px" }}>
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
