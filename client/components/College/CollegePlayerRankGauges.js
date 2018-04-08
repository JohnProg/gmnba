import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  Glyphicon,
  DropdownButton,
  MenuItem
} from "react-bootstrap";

export default class CollegePlayerRankGuages extends React.Component {
  constructor() {
    super();
    this.state = {
      gauge1: "pts",
      gauge2: "trb",
      gauge3: "ast"
    };
    this.createChart = this.createChart.bind(this);
    this.getPlayerRank = this.getPlayerRank.bind(this);
    this.selectG1 = this.selectG1.bind(this);
    this.selectG2 = this.selectG2.bind(this);
    this.selectG3 = this.selectG3.bind(this);
  }

  componentDidMount() {
    if (this.props.positionStats) {
      this.setState({ playerCount: this.props.positionStats.length });
      var gauge1Rank = this.getPlayerRank(this.state.gauge1);
      var gauge2Rank = this.getPlayerRank(this.state.gauge2);
      var gauge3Rank = this.getPlayerRank(this.state.gauge3);
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
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.positionStats) {
    //   this.setState({ playerCount: nextProps.positionStats.length });
    //   var gauge1Rank = this.getPlayerRank(this.state.gauge1);
    //   var gauge2Rank = this.getPlayerRank(this.state.gauge2);
    //   var gauge3Rank = this.getPlayerRank(this.state.gauge3);
    //   this.setState(
    //     {
    //       gauge1Rank: gauge1Rank,
    //       gauge2Rank: gauge2Rank,
    //       gauge3Rank: gauge3Rank
    //     },
    //     () => {
    //       this.createChart();
    //     }
    //   );
    // }
  }

  getPlayerRank(stat) {
    var obj = {};
    var rank;
    var suffix;
    var sorted = this.props.positionStats.sort((a, b) => {
      return parseFloat(b[stat]) - parseFloat(a[stat]);
    });
    for (var i = 0; i < sorted.length; i++) {
      if (sorted[i].name === this.props.player.name) {
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

  selectG1(evt, eventKey) {
    this.setState({ gauge1: eventKey.target.innerHTML }, () => {
      var gauge1Rank = this.getPlayerRank(this.state.gauge1);
      this.setState({ gauge1Rank: gauge1Rank }, () => {
        this.createChart();
      });
    });
  }

  selectG2(evt, eventKey) {
    this.setState({ gauge2: eventKey.target.innerHTML }, () => {
      var gauge2Rank = this.getPlayerRank(this.state.gauge2);
      this.setState({ gauge2Rank: gauge2Rank }, () => {
        this.createChart();
      });
    });
  }

  selectG3(evt, eventKey) {
    this.setState({ gauge3: eventKey.target.innerHTML }, () => {
      var gauge3Rank = this.getPlayerRank(this.state.gauge3);
      this.setState({ gauge3Rank: gauge3Rank }, () => {
        this.createChart();
      });
    });
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
          [0.1, `${this.props.colors.Color_Main}`], // green
          [0.5, `${this.props.colors.Color_Main}`], // yellow
          [0.9, `${this.props.colors.Color_Main}`] // red
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
          max: this.state.playerCount,
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
            data: [this.state.playerCount + 1 - this.state.gauge1Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:24px;color:' +
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
          max: this.state.playerCount,
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
            data: [this.state.playerCount + 1 - this.state.gauge2Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:24px;color:' +
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
      "container-rgauge",
      Highcharts.merge(gaugeOptions, {
        yAxis: {
          min: 0,
          max: this.state.playerCount,
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
            data: [this.state.playerCount + 1 - this.state.gauge3Rank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:24px;color:' +
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
      backgroundColor: this.props.colors.Color_Main,
      color: this.props.colors.Color_Third || this.props.colors.Color_Sec,
      textAlign: "center",
      fontSize: "16px",
      borderRadius: "0px",
      width: "150px"
    };
    return (
      <div>
        <Row className="chart-row">
          <Col lg={4} md={4} xs={12}>
            <div
              className="gauge-header-div "
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              <DropdownButton
                title={this.state.gauge1.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectG1}
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
            <div
              id="container"
              style={{
                height: "140px",
                margin: "auto 0"
              }}
            />
          </Col>
          <Col lg={4} md={4} xs={12}>
            <div
              className="gauge-header-div"
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              <DropdownButton
                className="card"
                style={statLabels}
                title={this.state.gauge2.toUpperCase()}
                onSelect={this.selectG2}
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
            <div
              id="container2"
              style={{
                height: "140px",
                margin: "auto 0"
              }}
            />
          </Col>
          <Col lg={4} md={4} xs={12}>
            <div
              className="gauge-header-div"
              style={{ textAlign: "center", fontSize: "16px" }}
            >
              <DropdownButton
                className="card"
                style={statLabels}
                title={this.state.gauge3.toUpperCase()}
                onSelect={this.selectG3}
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
            <div
              id="container-rgauge"
              style={{
                height: "140px",
                margin: "auto 0"
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}
