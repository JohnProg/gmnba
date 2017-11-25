import React from "react";

export default class TeamRatings extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    var chart = Highcharts.chart("container-rating", {
      chart: {
        type: "bar"
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      xAxis: {
        categories: ["PTS", "REB", "AST", "STL", "BLK"],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 18,
        max: 80,
        title: {
          text: null,
          align: "high"
        },
        labels: {
          overflow: "justify",
          enabled: false
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0
      },
      tooltip: {
        valueSuffix: null
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          },
          grouping: false
        },
        series: {
          borderRadius: 10
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      series: [
        {
          name: "Possible",
          dataLabels: false,
          data: [
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" }
          ]
        },
        {
          name: "Grade",
          data: [
            { y: 40, color: "#f0780d" },
            { y: 45, color: "#fac600" },
            { y: 80, color: "#1abded" },
            { y: 60, color: "#56ce00" },
            { y: 50, color: "#ffdc00" }
          ]
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div
          className="card"
          id="container-rating"
          style={{
            height: "225px",
            minWidth: "600px",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
