import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class TeamRankGuages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: {}
    };
    this.createChart = this.createChart.bind(this);
    this.getRanking = this.getRanking.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.team.Color_Main) {
      this.setState({ team: nextProps.team, league: nextProps.league }, () => {
        var ptsRank = this.getRanking("PTS");
        var trbRank = this.getRanking("TRB");
        var astRank = this.getRanking("AST");
        this.setState(
          {
            ptsRank: ptsRank,
            trbRank: trbRank,
            astRank: astRank
          },
          () => {
            console.log(this.state);
            this.createChart();
          }
        );
      });
    }
  }

  getRanking(stat) {
    var obj = {};
    var rank;
    var suffix;
    var ranked = this.state.league.sort((a, b) => {
      return parseFloat(b[stat]) - parseFloat(a[stat]);
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
            data: [31 - this.state.ptsRank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
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
            data: [31 - this.state.trbRank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
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
            data: [31 - this.state.astRank.rank],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
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
      backgroundColor: this.props.team.Color_Main,
      color: this.props.team.Color_Third || this.props.team.Color_Sec
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
                height: "150px",
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
                height: "150px",
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
