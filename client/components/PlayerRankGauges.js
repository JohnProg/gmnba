import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class PlayerRankGuages extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
    this.getPlayerRank = this.getPlayerRank.bind(this);
  }

  componentDidMount() {
    //this.createChart();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.colors.Color_Main) {
      this.setState({ colors: nextProps.colors });
    }
    if (nextProps.positionStats) {
      var ptsRank = this.getPlayerRank("pts");
      var trbRank = this.getPlayerRank("trb");
      var astRank = this.getPlayerRank("ast");
      this.setState(
        {
          ptsRank: ptsRank,
          trbRank: trbRank,
          astRank: astRank
        },
        () => {
          this.createChart();
        }
      );
    }
  }

  getPlayerRank(stat) {
    var obj = {};
    var rank;
    var suffix;
    this.setState({ playerCount: this.props.positionStats.length });
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

  createChart() {
    var gaugeOptions = {
      chart: {
        type: "solidgauge"
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
            data: [this.state.playerCount + 1 - this.state.ptsRank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:24px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black") +
                `">${this.state.ptsRank.rank}${this.state.ptsRank
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
            data: [this.state.playerCount + 1 - this.state.trbRank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:24px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black") +
                `">${this.state.trbRank.rank}${this.state.trbRank
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
            data: [this.state.playerCount + 1 - this.state.astRank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:24px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black") +
                `">${this.state.astRank.rank}${this.state.astRank
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
      color: this.props.colors.Color_Third || this.props.colors.Color_Sec
    };
    return (
      <div>
        <Row className="chart-row">
          <Col lg={4}>
            <div className="gauge-header-div">
              <div className="card guage-header" style={statLabels}>
                PTS
              </div>
            </div>
            <div
              id="container"
              style={{
                height: "140px",
                margin: "auto 0"
              }}
            />
          </Col>
          <Col lg={4}>
            <div className="gauge-header-div">
              <div className="card guage-header" style={statLabels}>
                TRB
              </div>
            </div>
            <div
              id="container2"
              style={{
                height: "140px",
                margin: "auto 0"
              }}
            />
          </Col>
          <Col lg={4}>
            <div className="gauge-header-div">
              <div className="card guage-header" style={statLabels}>
                AST
              </div>
            </div>
            <div
              id="container3"
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
