import React from "react";

export default class CareerProgression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statOne: "ovr"
    };
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    var chart = Highcharts.chart("containerProg", {
      chart: {
        backgroundColor: null
      },
      title: {
        text: "Player Career Progression"
      },

      yAxis: {
        title: {
          text: `${this.state.statOne}`
        }
      },
      xAxis: {
        title: {
          text: "Experience"
        }
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        enabled: false
      },

      exporting: { enabled: false },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },

      series: [
        {
          name: "Installation",
          data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
          color: "white"
        }
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    });
  }

  render() {
    return (
      <div>
        <div
          className="card"
          id="containerProg"
          style={{
            height: "500px",
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
      </div>
    );
  }
}
