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

export default class TeamScatter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      statOne: "PTS",
      statTwo: "W",
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
          color: "#d00000",
          _symbolIndex: 0,
          id: data[j].id
        });
      }
      this.setState({ data: scatterData }, () => {
        this.createChart();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    // var teamData = [];
    // var scatterData = [];
    // if (nextProps.teams) {
    //   var data = nextProps.teams;
    //   this.setState({ teamData: data });
    //   for (var j = 0; j < data.length; j++) {
    //     scatterData.push({
    //       data: [
    //         [
    //           parseFloat(data[j][this.state.statTwo]),
    //           parseFloat(data[j][this.state.statOne])
    //         ]
    //       ],
    //       name: data[j].Name,
    //       color: "#d00000",
    //       _symbolIndex: 0
    //     });
    //   }
    //   this.setState({ data: scatterData }, () => {
    //     this.createChart();
    //   });
    // }
  }

  createChart() {
    var chart = Highcharts.chart("containerScatter2", {
      chart: {
        type: "scatter",
        zoomType: "xy"
      },
      title: {
        text: "Team Stats NBA"
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
                window.location = "/team/" + event.point.series.userOptions.id;
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
        color: "#d00000",
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
                        <option>PTS</option>
                        <option>AST</option>
                        <option>TRB</option>
                        <option>BLK</option>
                        <option>DEF_FT_FGA</option>
                        <option>DEF_TOV_PCT</option>
                        <option>DEF_eFG_PCT</option>
                        <option>DRB</option>
                        <option>DRB_PCT</option>
                        <option>ORtg</option>
                        <option>DRtg</option>
                        <option>FG</option>
                        <option>FGA</option>
                        <option>FG_PCT</option>
                        <option>FTA</option>
                        <option>FTM</option>
                        <option>FT_PCT</option>
                        <option>FTr</option>
                        <option>GP</option>
                        <option>W</option>
                        <option>L</option>
                        <option>MOV</option>
                        <option>OFF_FT_FGA</option>
                        <option>OFF_TOV_PCT</option>
                        <option>OFF_eFG_PCT</option>
                        <option>ORB</option>
                        <option>ORB_PCT</option>
                        <option>PACE</option>
                        <option>PF</option>
                        <option>PW</option>
                        <option>PL</option>
                        <option>SOS</option>
                        <option>SRS</option>
                        <option>STL</option>
                        <option>TOV</option>
                        <option>Three_PAr</option>
                        <option>Three_Pointers</option>
                        <option>Three_Pointers_Att</option>
                        <option>Three_Pointers_Pct</option>
                        <option>Two_Pointers</option>
                        <option>Two_Pointers_Att</option>
                        <option>Two_Pointers_Pct</option>
                        <option>o2P</option>
                        <option>o2PA</option>
                        <option>o2PCT</option>
                        <option>o3P</option>
                        <option>o3PA</option>
                        <option>o3PCT</option>
                        <option>oAST</option>
                        <option>oBLK</option>
                        <option>oDRB</option>
                        <option>oFG</option>
                        <option>oFGPCT</option>
                        <option>oFTA</option>
                        <option>oFTM</option>
                        <option>oFTPCT</option>
                        <option>oORB</option>
                        <option>oPF</option>
                        <option>oPTS</option>
                        <option>oSTL</option>
                        <option>oTOV</option>
                        <option>oTRB</option>
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
                        <option>W</option>
                        <option>PTS</option>
                        <option>AST</option>
                        <option>TRB</option>
                        <option>BLK</option>
                        <option>DEF_FT_FGA</option>
                        <option>DEF_TOV_PCT</option>
                        <option>DEF_eFG_PCT</option>
                        <option>DRB</option>
                        <option>DRB_PCT</option>
                        <option>ORtg</option>
                        <option>DRtg</option>
                        <option>FG</option>
                        <option>FGA</option>
                        <option>FG_PCT</option>
                        <option>FTA</option>
                        <option>FTM</option>
                        <option>FT_PCT</option>
                        <option>FTr</option>
                        <option>GP</option>
                        <option>L</option>
                        <option>MOV</option>
                        <option>OFF_FT_FGA</option>
                        <option>OFF_TOV_PCT</option>
                        <option>OFF_eFG_PCT</option>
                        <option>ORB</option>
                        <option>ORB_PCT</option>
                        <option>PACE</option>
                        <option>PF</option>
                        <option>PW</option>
                        <option>PL</option>
                        <option>SOS</option>
                        <option>SRS</option>
                        <option>STL</option>
                        <option>TOV</option>
                        <option>Three_PAr</option>
                        <option>Three_Pointers</option>
                        <option>Three_Pointers_Att</option>
                        <option>Three_Pointers_Pct</option>
                        <option>Two_Pointers</option>
                        <option>Two_Pointers_Att</option>
                        <option>Two_Pointers_Pct</option>
                        <option>o2P</option>
                        <option>o2PA</option>
                        <option>o2PCT</option>
                        <option>o3P</option>
                        <option>o3PA</option>
                        <option>o3PCT</option>
                        <option>oAST</option>
                        <option>oBLK</option>
                        <option>oDRB</option>
                        <option>oFG</option>
                        <option>oFGPCT</option>
                        <option>oFTA</option>
                        <option>oFTM</option>
                        <option>oFTPCT</option>
                        <option>oORB</option>
                        <option>oPF</option>
                        <option>oPTS</option>
                        <option>oSTL</option>
                        <option>oTOV</option>
                        <option>oTRB</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={1}>
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
