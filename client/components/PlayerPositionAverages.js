import React from "react";

export default class PlayerPositionAverages extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    var chart = Highcharts.chart("container-average", {
      chart: {
        type: "column"
      },
      title: {
        text: "Player Vs Position Averages"
      },
      xAxis: {
        categories: ["Pts", "ORtg", "DRtg", "Trb", "Ast", "3P"]
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: "Position Averages"
          }
        },
        {
          title: {
            text: null
          },
          opposite: true
        }
      ],
      legend: {
        shadow: false
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          borderWidth: 0
        }
      },
      series: [
        {
          name: "Position Average",
          color: "#c2ced5",
          data: [103, 73, 20, 82, 43, 48],
          pointPadding: 0.3,
          pointPlacement: 0
        },
        {
          name: "Player Average",
          color: "#702f8a",
          data: [108, 90, 40, 54, 87, 53],
          pointPadding: 0.4,
          pointPlacement: 0
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div
          className="card"
          id="container-average"
          style={{
            height: "500px",
            width: "800",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
