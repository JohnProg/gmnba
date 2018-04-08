import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  DropdownButton,
  MenuItem
} from "react-bootstrap";

export default class TeamRankGuages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {},
      league: {},
      gauge1: "PTS",
      gauge2: "ORtg",
      gauge3: "DRtg"
    };
    this.createChart = this.createChart.bind(this);
    this.getRanking = this.getRanking.bind(this);
    this.selectG1 = this.selectG1.bind(this);
    this.selectG2 = this.selectG2.bind(this);
    this.selectG3 = this.selectG3.bind(this);
  }

  componentDidMount() {
    if (this.props.team && this.props.league) {
      this.setState(
        { team: this.props.team, league: this.props.league },
        () => {
          var gauge1Rank = this.getRanking(this.state.gauge1);
          var gauge2Rank = this.getRanking(this.state.gauge2);
          var gauge3Rank = this.getRanking(this.state.gauge3);
          this.setState(
            {
              gauge1Rank: gauge1Rank,
              gauge2Rank: gauge2Rank,
              gauge3Rank: gauge3Rank
            },
            () => {
              this.createChart();
            }
          );
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.team.Color_Main) {
      this.setState({ team: nextProps.team, league: nextProps.league }, () => {
        var gauge1Rank = this.getRanking(this.state.gauge1);
        var gauge2Rank = this.getRanking(this.state.gauge2);
        var gauge3Rank = this.getRanking(this.state.gauge3);
        this.setState(
          {
            gauge1Rank: gauge1Rank,
            gauge2Rank: gauge2Rank,
            gauge3Rank: gauge3Rank
          },
          () => {
            this.createChart();
          }
        );
      });
    }
  }

  selectG1(evt, eventKey) {
    this.setState({ gauge1: eventKey.target.innerHTML }, () => {
      var gauge1Rank = this.getRanking(this.state.gauge1);
      this.setState({ gauge1Rank: gauge1Rank }, () => {
        this.createChart();
      });
    });
  }
  selectG2(evt, eventKey) {
    this.setState({ gauge2: eventKey.target.innerHTML }, () => {
      var gauge2Rank = this.getRanking(this.state.gauge2);
      this.setState({ gauge2Rank: gauge2Rank }, () => {
        this.createChart();
      });
    });
  }
  selectG3(evt, eventKey) {
    this.setState({ gauge3: eventKey.target.innerHTML }, () => {
      var gauge3Rank = this.getRanking(this.state.gauge3);
      this.setState({ gauge3Rank: gauge3Rank }, () => {
        this.createChart();
      });
    });
  }

  getRanking(stat) {
    var obj = {};
    var rank;
    var suffix;
    if (stat === "DRtg") {
      var ranked = this.state.league.sort((a, b) => {
        return parseFloat(a[stat]) - parseFloat(b[stat]);
      });
      for (var i = 0; i < ranked.length; i++) {
        if (ranked[i].Name === this.state.team.Name) {
          rank = i + 1;
          if (rank === 1 || rank === 21) {
            suffix = "st";
          } else if (rank === 2 || rank === 22) {
            suffix = "nd";
          } else {
            suffix = "th";
          }
        }
      }
      obj["rank"] = rank;
      obj["suffix"] = suffix;
      return obj;
    } else {
      var ranked = this.state.league.sort((a, b) => {
        return parseFloat(b[stat]) - parseFloat(a[stat]);
      });
      for (var i = 0; i < ranked.length; i++) {
        if (ranked[i].Name === this.state.team.Name) {
          rank = i + 1;
          if (
            rank === 1 ||
            rank === 21 ||
            rank === 31 ||
            rank === 41 ||
            rank === 51 ||
            rank === 61
          ) {
            suffix = "st";
          } else if (
            rank === 2 ||
            rank === 22 ||
            rank === 32 ||
            rank === 42 ||
            rank === 52 ||
            rank === 62
          ) {
            suffix = "nd";
          } else if (
            rank === 3 ||
            rank === 23 ||
            rank === 33 ||
            rank === 43 ||
            rank === 53 ||
            rank === 63
          ) {
            suffix = "rd";
          } else {
            suffix = "th";
          }
        }
      }
      obj["rank"] = rank;
      obj["suffix"] = suffix;
      return obj;
    }
  }

  createChart() {
    var gaugeOptions = {
      chart: {
        type: "solidgauge",
        backgroundColor: null
      },

      title: null,

      pane: {
        center: ["50%", "50%"],
        size: "100%",
        startAngle: 0,
        endAngle: 360,
        background: {
          backgroundColor:
            (Highcharts.theme && Highcharts.theme.background2) || "#c2ced5",
          innerRadius: "60%",
          outerRadius: "100%",
          shape: "circle"
        }
      },

      tooltip: {
        enabled: false
      },
      exporting: {
        enabled: false
      },

      // the value axis
      yAxis: {
        stops: [
          [0.1, `${this.props.team.Color_Main}`],
          [0.5, `${this.props.team.Color_Main}`],
          [0.9, `${this.props.team.Color_Main}`]
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickAmount: 0,
        title: {
          y: -20
        },
        labels: {
          enabled: false
        }
      },

      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: -23,
            borderWidth: 0,
            useHTML: true
          }
        }
      }
    };

    // The speed gauge
    var chartSpeed = Highcharts.chart(
      "container",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: 30,
          title: {
            text: null
          }
        },

        credits: {
          enabled: false
        },

        series: [
          {
            name: "PTS",
            data: [31 - this.state.gauge1Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "white") +
                `">${this.state.gauge1Rank.rank}${this.state.gauge1Rank
                  .suffix}</span><br/>` +
                "</div>"
            },
            tooltip: {
              valueSuffix: " km/h"
            }
          }
        ]
      })
    );

    var chartTwo = Highcharts.chart(
      "container2",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: 30,
          title: {
            text: null
          }
        },

        credits: {
          enabled: false
        },

        series: [
          {
            name: "PTS",
            data: [31 - this.state.gauge2Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "white") +
                `">${this.state.gauge2Rank.rank}${this.state.gauge2Rank
                  .suffix}</span><br/>` +
                "</div>"
            },
            tooltip: {
              valueSuffix: " km/h"
            }
          }
        ]
      })
    );

    var chartThree = Highcharts.chart(
      "container3",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: 30,
          title: {
            text: null
          }
        },

        credits: {
          enabled: false
        },

        series: [
          {
            name: "PTS",
            data: [31 - this.state.gauge3Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "white") +
                `">${this.state.gauge3Rank.rank}${this.state.gauge3Rank
                  .suffix}</span><br/>` +
                "</div>"
            },
            tooltip: {
              valueSuffix: " km/h"
            }
          }
        ]
      })
    );
  }

  render() {
    var statLabels = {
      backgroundColor: this.props.team.Color_Main,
      color: this.props.team.Color_Third || this.props.team.Color_Sec,
      textAlign: "center",
      fontSize: "16px",
      borderRadius: "0px",
      width: "150px"
    };
    return (
      <div>
        <Row style={{ paddingTop: "30px" }}>
          <Col lg={4} xs={12} md={4} sm={4}>
            <div
              className="gauge-header-div"
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              <DropdownButton
                title={this.state.gauge1.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectG1}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">PTS</MenuItem>
                <MenuItem eventKey="2">AST</MenuItem>
                <MenuItem eventKey="7">ORtg</MenuItem>
                <MenuItem eventKey="14">FTr</MenuItem>
                <MenuItem eventKey="17">ORB</MenuItem>
                <MenuItem eventKey="29">Three_PAr</MenuItem>
                <MenuItem eventKey="30">TOV</MenuItem>
                <MenuItem eventKey="35">PACE</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">DRB</MenuItem>
                <MenuItem eventKey="6">DRtg</MenuItem>
                <MenuItem eventKey="31">STL</MenuItem>
                <MenuItem eventKey="50">BLK</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="23">Two_Pointers_Pct</MenuItem>
                <MenuItem eventKey="24">Two_Pointers_Att</MenuItem>
                <MenuItem eventKey="25">Two_Pointers</MenuItem>
                <MenuItem eventKey="26">Three_Pointers_Pct</MenuItem>
                <MenuItem eventKey="27">Three_Pointers_Att</MenuItem>
                <MenuItem eventKey="28">Three_Pointers</MenuItem>
                <MenuItem eventKey="8">FG</MenuItem>
                <MenuItem eventKey="9">FGA</MenuItem>
                <MenuItem eventKey="10">FG_PCT</MenuItem>
                <MenuItem eventKey="11">FTA</MenuItem>
                <MenuItem eventKey="12">FTM</MenuItem>
                <MenuItem eventKey="13">FT_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Offense Four Factors</MenuItem>
                <MenuItem eventKey="37">OFF_eFG_PCT</MenuItem>
                <MenuItem eventKey="38">OFF_TOV_PCT</MenuItem>
                <MenuItem eventKey="39">OFF_FT_FGA</MenuItem>
                <MenuItem eventKey="36">ORB_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense Four Factors</MenuItem>
                <MenuItem eventKey="41">DEF_eFG_PCT</MenuItem>
                <MenuItem eventKey="42">DEF_TOV_PCT</MenuItem>
                <MenuItem eventKey="43">DEF_FT_FGA</MenuItem>
                <MenuItem eventKey="40">DRB_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>
                <MenuItem eventKey="15">W</MenuItem>
                <MenuItem eventKey="16">L</MenuItem>
                <MenuItem eventKey="32">SRS</MenuItem>
                <MenuItem eventKey="33">SOS</MenuItem>
                <MenuItem eventKey="34">PF</MenuItem>
                <MenuItem eventKey="3">TRB</MenuItem>
                <MenuItem eventKey="4">MOV</MenuItem>
                <MenuItem divider />
                <MenuItem header>Opponent</MenuItem>
                <MenuItem eventKey="18">oPTS</MenuItem>
                <MenuItem eventKey="19">oFGPCT</MenuItem>
                <MenuItem eventKey="20">oTOV</MenuItem>
                <MenuItem eventKey="21">o2PCT</MenuItem>
                <MenuItem eventKey="22">o3PCT</MenuItem>
                <MenuItem eventKey="44">o2P</MenuItem>
                <MenuItem eventKey="45">o2PA</MenuItem>
                <MenuItem eventKey="46">o3P</MenuItem>
                <MenuItem eventKey="47">o3PA</MenuItem>
                <MenuItem eventKey="48">oBLK</MenuItem>
                <MenuItem eventKey="49">oDRB</MenuItem>
                <MenuItem eventKey="50">oFG</MenuItem>
                <MenuItem eventKey="51">oFTA</MenuItem>
                <MenuItem eventKey="52">oFTM</MenuItem>
                <MenuItem eventKey="53">oPF</MenuItem>
                <MenuItem eventKey="54">oTRB</MenuItem>
                <MenuItem eventKey="55">oSTL</MenuItem>
              </DropdownButton>
            </div>
            <div
              id="container"
              style={{
                height: "150px",
                margin: "auto 0"
              }}
            />
          </Col>
          <Col lg={4} xs={12} md={4} sm={4}>
            <div
              className="gauge-header-div"
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              <DropdownButton
                title={this.state.gauge2.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectG2}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">PTS</MenuItem>
                <MenuItem eventKey="2">AST</MenuItem>
                <MenuItem eventKey="7">ORtg</MenuItem>
                <MenuItem eventKey="14">FTr</MenuItem>
                <MenuItem eventKey="17">ORB</MenuItem>
                <MenuItem eventKey="29">Three_PAr</MenuItem>
                <MenuItem eventKey="30">TOV</MenuItem>
                <MenuItem eventKey="35">PACE</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">DRB</MenuItem>
                <MenuItem eventKey="6">DRtg</MenuItem>
                <MenuItem eventKey="31">STL</MenuItem>
                <MenuItem eventKey="50">BLK</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="23">Two_Pointers_Pct</MenuItem>
                <MenuItem eventKey="24">Two_Pointers_Att</MenuItem>
                <MenuItem eventKey="25">Two_Pointers</MenuItem>
                <MenuItem eventKey="26">Three_Pointers_Pct</MenuItem>
                <MenuItem eventKey="27">Three_Pointers_Att</MenuItem>
                <MenuItem eventKey="28">Three_Pointers</MenuItem>
                <MenuItem eventKey="8">FG</MenuItem>
                <MenuItem eventKey="9">FGA</MenuItem>
                <MenuItem eventKey="10">FG_PCT</MenuItem>
                <MenuItem eventKey="11">FTA</MenuItem>
                <MenuItem eventKey="12">FTM</MenuItem>
                <MenuItem eventKey="13">FT_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Offense Four Factors</MenuItem>
                <MenuItem eventKey="37">OFF_eFG_PCT</MenuItem>
                <MenuItem eventKey="38">OFF_TOV_PCT</MenuItem>
                <MenuItem eventKey="39">OFF_FT_FGA</MenuItem>
                <MenuItem eventKey="36">ORB_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense Four Factors</MenuItem>
                <MenuItem eventKey="41">DEF_eFG_PCT</MenuItem>
                <MenuItem eventKey="42">DEF_TOV_PCT</MenuItem>
                <MenuItem eventKey="43">DEF_FT_FGA</MenuItem>
                <MenuItem eventKey="40">DRB_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>
                <MenuItem eventKey="15">W</MenuItem>
                <MenuItem eventKey="16">L</MenuItem>
                <MenuItem eventKey="32">SRS</MenuItem>
                <MenuItem eventKey="33">SOS</MenuItem>
                <MenuItem eventKey="34">PF</MenuItem>
                <MenuItem eventKey="3">TRB</MenuItem>
                <MenuItem eventKey="4">MOV</MenuItem>
                <MenuItem divider />
                <MenuItem header>Opponent</MenuItem>
                <MenuItem eventKey="18">oPTS</MenuItem>
                <MenuItem eventKey="19">oFGPCT</MenuItem>
                <MenuItem eventKey="20">oTOV</MenuItem>
                <MenuItem eventKey="21">o2PCT</MenuItem>
                <MenuItem eventKey="22">o3PCT</MenuItem>
                <MenuItem eventKey="44">o2P</MenuItem>
                <MenuItem eventKey="45">o2PA</MenuItem>
                <MenuItem eventKey="46">o3P</MenuItem>
                <MenuItem eventKey="47">o3PA</MenuItem>
                <MenuItem eventKey="48">oBLK</MenuItem>
                <MenuItem eventKey="49">oDRB</MenuItem>
                <MenuItem eventKey="50">oFG</MenuItem>
                <MenuItem eventKey="51">oFTA</MenuItem>
                <MenuItem eventKey="52">oFTM</MenuItem>
                <MenuItem eventKey="53">oPF</MenuItem>
                <MenuItem eventKey="54">oTRB</MenuItem>
                <MenuItem eventKey="55">oSTL</MenuItem>
              </DropdownButton>
            </div>
            <div
              id="container2"
              style={{
                height: "150px",
                margin: "auto 0"
              }}
            />
          </Col>
          <Col lg={4} xs={12} md={4} sm={4}>
            <div
              className="gauge-header-div"
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              <DropdownButton
                title={this.state.gauge3.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectG3}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">PTS</MenuItem>
                <MenuItem eventKey="2">AST</MenuItem>
                <MenuItem eventKey="7">ORtg</MenuItem>
                <MenuItem eventKey="14">FTr</MenuItem>
                <MenuItem eventKey="17">ORB</MenuItem>
                <MenuItem eventKey="29">Three_PAr</MenuItem>
                <MenuItem eventKey="30">TOV</MenuItem>
                <MenuItem eventKey="35">PACE</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">DRB</MenuItem>
                <MenuItem eventKey="6">DRtg</MenuItem>
                <MenuItem eventKey="31">STL</MenuItem>
                <MenuItem eventKey="50">BLK</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="23">Two_Pointers_Pct</MenuItem>
                <MenuItem eventKey="24">Two_Pointers_Att</MenuItem>
                <MenuItem eventKey="25">Two_Pointers</MenuItem>
                <MenuItem eventKey="26">Three_Pointers_Pct</MenuItem>
                <MenuItem eventKey="27">Three_Pointers_Att</MenuItem>
                <MenuItem eventKey="28">Three_Pointers</MenuItem>
                <MenuItem eventKey="8">FG</MenuItem>
                <MenuItem eventKey="9">FGA</MenuItem>
                <MenuItem eventKey="10">FG_PCT</MenuItem>
                <MenuItem eventKey="11">FTA</MenuItem>
                <MenuItem eventKey="12">FTM</MenuItem>
                <MenuItem eventKey="13">FT_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Offense Four Factors</MenuItem>
                <MenuItem eventKey="37">OFF_eFG_PCT</MenuItem>
                <MenuItem eventKey="38">OFF_TOV_PCT</MenuItem>
                <MenuItem eventKey="39">OFF_FT_FGA</MenuItem>
                <MenuItem eventKey="36">ORB_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense Four Factors</MenuItem>
                <MenuItem eventKey="41">DEF_eFG_PCT</MenuItem>
                <MenuItem eventKey="42">DEF_TOV_PCT</MenuItem>
                <MenuItem eventKey="43">DEF_FT_FGA</MenuItem>
                <MenuItem eventKey="40">DRB_PCT</MenuItem>
                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>
                <MenuItem eventKey="15">W</MenuItem>
                <MenuItem eventKey="16">L</MenuItem>
                <MenuItem eventKey="32">SRS</MenuItem>
                <MenuItem eventKey="33">SOS</MenuItem>
                <MenuItem eventKey="34">PF</MenuItem>
                <MenuItem eventKey="3">TRB</MenuItem>
                <MenuItem eventKey="4">MOV</MenuItem>
                <MenuItem divider />
                <MenuItem header>Opponent</MenuItem>
                <MenuItem eventKey="18">oPTS</MenuItem>
                <MenuItem eventKey="19">oFGPCT</MenuItem>
                <MenuItem eventKey="20">oTOV</MenuItem>
                <MenuItem eventKey="21">o2PCT</MenuItem>
                <MenuItem eventKey="22">o3PCT</MenuItem>
                <MenuItem eventKey="44">o2P</MenuItem>
                <MenuItem eventKey="45">o2PA</MenuItem>
                <MenuItem eventKey="46">o3P</MenuItem>
                <MenuItem eventKey="47">o3PA</MenuItem>
                <MenuItem eventKey="48">oBLK</MenuItem>
                <MenuItem eventKey="49">oDRB</MenuItem>
                <MenuItem eventKey="50">oFG</MenuItem>
                <MenuItem eventKey="51">oFTA</MenuItem>
                <MenuItem eventKey="52">oFTM</MenuItem>
                <MenuItem eventKey="53">oPF</MenuItem>
                <MenuItem eventKey="54">oTRB</MenuItem>
                <MenuItem eventKey="55">oSTL</MenuItem>
              </DropdownButton>
            </div>
            <div
              id="container3"
              style={{
                height: "150px",
                margin: "auto 0"
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
