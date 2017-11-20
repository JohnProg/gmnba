import React from "react";

export default class PlayerPolarArea extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    var chart = Highcharts.chart("container-polar2", {
      chart: {
        polar: true,
        type: "area"
      },

      title: {
        text: "Player Chart",
        x: 0
      },

      pane: {
        size: "80%"
      },

      xAxis: {
        categories: [
          "Scoring",
          "Rebounding",
          "Playmaking",
          "Turnovers",
          "Blocks",
          "Steals"
        ],
        tickmarkPlacement: "on",
        lineWidth: 0
      },

      yAxis: {
        gridLineInterpolation: "polygon",
        gridLineColor: "#000",
        lineWidth: 0,
        min: 15,
        max: 80,
        labels: {
          enabled: false
        }
      },

      tooltip: {
        shared: false,
        pointFormat:
          '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
      },

      legend: {
        align: "right",
        verticalAlign: "top",
        y: 70,
        layout: "vertical",
        enabled: false
      },

      series: [
        {
          name: "Player Grade",
          data: [40, 45, 60, 65, 50, 60],
          pointPlacement: "on",
          color: "#702f8a"
        }
      ]
    });
  }

  render() {
    return (
      <div className="card">
        <div
          id="container-polar2"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
