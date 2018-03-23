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

export default class GTeamScatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      statOne: "PTS",
      statTwo: "AST",
      position: "All",
      teamPlayers: [],
      showFilter: false,
      teams: [],
      teamData: []
    };
    this.createChart = this.createChart.bind(this);
    this.filterClick = this.filterClick.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firstInputChange = this.firstInputChange.bind(this);
    this.secondInputChange = this.secondInputChange.bind(this);
  }

  componentDidMount() {
    var teamData = [];
    var scatterData = [];
    if (this.props.teams) {
      var data = this.props.teams;
      this.setState({ teamData: data });
      for (var j = 0; j < data.length; j++) {
        scatterData.push({
          data: [
            [
              parseFloat(data[j][this.state.statTwo]),
              parseFloat(data[j][this.state.statOne])
            ]
          ],
          name: data[j].Name,
          color: "#3f336d",
          _symbolIndex: 0,
          id: data[j].id
        });
      }
      this.setState({ data: scatterData }, () => {
        this.createChart();
      });
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   var teamData = [];
  //   var scatterData = [];
  //   if (nextProps.teams) {
  //     var data = nextProps.teams;
  //     this.setState({ teamData: data });
  //     for (var j = 0; j < data.length; j++) {
  //       scatterData.push({
  //         data: [
  //           [
  //             parseFloat(data[j][this.state.statTwo]),
  //             parseFloat(data[j][this.state.statOne])
  //           ]
  //         ],
  //         name: data[j].Name,
  //         color: "#3f336d",
  //         _symbolIndex: 0
  //       });
  //     }
  //     this.setState({ data: scatterData }, () => {
  //       this.createChart();
  //     });
  //   }
  // }

  createChart() {
    var chart = Highcharts.chart("containerScatter2", {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: "Team Stats G-League"
      },
      subtitle: {
        text: ""
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
                  "/college-team/" + event.point.series.userOptions.id;
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
    for (let i = 0; i < this.props.teams.length; i++) {
      let team = this.props.teams[i];
      statArr.push({
        data: [
          [
            parseFloat(team[this.state.statTwo]),
            parseFloat(team[this.state.statOne])
          ]
        ],
        name: team.Name,
        color: "#3f336d",
        _symbolIndex: 0,
        id: team.id
      });
    }
    this.setState({ data: statArr }, () => {
      //console.log(this.state.data);
      this.createChart();
    });
  }

  renderFilter() {}

  render() {
    console.log(this.props.teams);
    return (
      <div>
        <div
          className="card playerScatter"
          id="containerScatter2"
          style={{
            height: "500px"
          }}
        />
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={12} md={12}>
            <div className="card" style={{ backgroundColor: "white" }}>
              <div>
                <form>
                  <Col lg={4} lgOffset={1} md={4}>
                    <div>
                      <label htmlFor="sel1">
                        Select Stat <sub>(y)</sub> :
                      </label>
                      <select
                        id="sel1"
                        onChange={this.firstInputChange}
                        style={{ marginLeft: "10px" }}
                      >
                        <option>PTS</option>
                        <option>AST</option>
                        <option>TRB</option>
                        <option>BLK</option>
                        <option>DRB</option>
                        <option>FG</option>
                        <option>FGA</option>
                        <option>FG_PCT</option>
                        <option>FTA</option>
                        <option>FTM</option>
                        <option>FT_PCT</option>
                        <option>ORB</option>
                        <option>PF</option>
                        <option>STL</option>
                        <option>TOV</option>
                        <option>Three_Pointers</option>
                        <option>Three_Pointers_Att</option>
                        <option>Three_Pointers_Pct</option>
                        <option>Two_Pointers</option>
                        <option>Two_Pointers_Att</option>
                        <option>Two_Pointers_Pct</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={4} md={4}>
                    <div>
                      <label htmlFor="sel2" className="select-stat-label">
                        Select Stat <sub>(x)</sub> :
                      </label>
                      <select
                        onChange={this.secondInputChange}
                        id="sel2"
                        style={{ marginLeft: "10px" }}
                      >
                        <option>AST</option>
                        <option>PTS</option>
                        <option>TRB</option>
                        <option>BLK</option>
                        <option>DRB</option>
                        <option>FG</option>
                        <option>FGA</option>
                        <option>FG_PCT</option>
                        <option>FTA</option>
                        <option>FTM</option>
                        <option>FT_PCT</option>
                        <option>ORB</option>
                        <option>PF</option>
                        <option>STL</option>
                        <option>TOV</option>
                        <option>Three_Pointers</option>
                        <option>Three_Pointers_Att</option>
                        <option>Three_Pointers_Pct</option>
                        <option>Two_Pointers</option>
                        <option>Two_Pointers_Att</option>
                        <option>Two_Pointers_Pct</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={1} md={1}>
                    <div>
                      <button
                        onClick={this.handleSubmit}
                        id="submit-button"
                        style={{ backgroundColor: "#3f336d", color: "white" }}
                      >
                        Submit
                      </button>
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
