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
      showFilter: false
    };
    this.createChart = this.createChart.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstInputChange = this.firstInputChange.bind(this);
    this.secondInputChange = this.secondInputChange.bind(this);
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
          _symbolIndex: 0
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
          _symbolIndex: 0
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
        _symbolIndex: 0
      });
    }
    this.setState({ data: statArr }, () => {
      //console.log(this.state.data);
      this.createChart();
    });
  }

  renderFilter() {
    if (this.state.showFilter === true) {
      return (
        <div style={{ height: "100px" }}>
          <Col lg={1}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Position
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox>PG</Checkbox> <Checkbox>SG</Checkbox>{" "}
              <Checkbox>SF</Checkbox> <Checkbox>PF</Checkbox>{" "}
              <Checkbox>C</Checkbox>
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
          <Col lg={3}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Teams
            </div>
            <FormGroup
              style={{
                paddingLeft: "10px",
                overflow: "scroll",
                height: "150px"
              }}
            >
              <Checkbox>Atlanta Hawks</Checkbox>{" "}
              <Checkbox>Brooklyn Nets</Checkbox>{" "}
              <Checkbox>Boston Celtics</Checkbox>{" "}
              <Checkbox>Charlotte Hornets</Checkbox>{" "}
              <Checkbox>Chicago Bulls</Checkbox>
              <Checkbox>Cleveland Cavaliers</Checkbox>
              <Checkbox>Dallas Mavericks</Checkbox>
              <Checkbox>Denver Nuggets</Checkbox>
              <Checkbox>Detroit Pistons</Checkbox>
              <Checkbox>Golden State Warriors</Checkbox>
              <Checkbox>Houston Rockets</Checkbox>
              <Checkbox>Indiana Pacers</Checkbox>
              <Checkbox>Los Angeles Clippers</Checkbox>
              <Checkbox>Los Angeles Lakers</Checkbox>
              <Checkbox>Memphis Grizzlies</Checkbox>
              <Checkbox>Miami Heat</Checkbox>
              <Checkbox>Milwaukee Bucks</Checkbox>
              <Checkbox>Minnesota Timberwolves</Checkbox>
              <Checkbox>New York Knicks</Checkbox>
              <Checkbox>Oklahoma City Thunder</Checkbox>
              <Checkbox>Orlando Magic</Checkbox>
              <Checkbox>Philadelphia 76ers</Checkbox>
              <Checkbox>Phoenix Suns</Checkbox>
              <Checkbox>Portland Trail Blazers</Checkbox>
              <Checkbox>Sacramento Kings</Checkbox>
              <Checkbox>San Antonio Spurs</Checkbox>
              <Checkbox>Toronto Raptors</Checkbox>
              <Checkbox>Utah Jazz</Checkbox>
              <Checkbox>Washington Wizardss</Checkbox>
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
          <Col lg={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Salary
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
    console.log(this.props.players);
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
