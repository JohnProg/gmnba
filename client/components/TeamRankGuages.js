import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";

export default class TeamRankGuages extends React.Component {
  constructor() {
    super();
    this.creatChart = this.creatChart.bind(this);
  }

  componentDidMount() {
    this.creatChart();
  }

  creatChart() {
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
          [0.1, "#000000"], // green
          [0.5, "#000000"], // yellow
          [0.9, "#000000"] // red
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
            data: [26],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black") +
                '">{y}th</span><br/>' +
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
            data: [14],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black") +
                '">{y}th</span><br/>' +
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
            data: [19],
            dataLabels: {
              format:
                '<div style="text-align:center"><span style="font-size:26px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) ||
                  "black") +
                '">{y}th</span><br/>' +
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
    return (
      <div>
        <Row className="chart-row">
          <Col lg={4}>
            <div className="gauge-header-div">
              <div className="card guage-header">PTS</div>
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
              <div className="card guage-header">TRB</div>
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
              <div className="card guage-header">DRTG</div>
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
