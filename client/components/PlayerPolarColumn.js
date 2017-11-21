import React from "react";

export default class PlayerPolarColumn extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    var chart = Highcharts.chart("container-column", {
      chart: {
        polar: true,
        type: "column"
      },

      title: {
        text: null
      },

      pane: {
        startAngle: 0,
        endAngle: 360
      },

      xAxis: {
        min: 0,
        max: 360,
        tickInterval: 45,
        labels: {
          enabled: false
        }
      },

      yAxis: {
        min: 0,
        max: 60,
        labels: {
          enabled: false
        }
      },

      plotOptions: {
        series: {
          pointStart: 0,
          pointInterval: 45,
          dataLabels: {
            useHTML: true,
            enabled: true,
            format:
              '<span class="wheel-label" style="color: grey">{point.name}</span>',
            style: {
              fontSize: "12px"
            }
          }
        },
        column: {
          pointPadding: 0,
          groupPadding: 0,
          events: {
            legendItemClick: function() {
              return false;
            }
          },
          borderWidth: 2
        }
      },

      legend: {
        enabled: false
      },

      series: [
        {
          name: "Rating",
          data: [
            { y: 40, color: "#f0780d", name: "Scoring" },
            { y: 65, color: "#56ce00", name: "Ast" },
            { y: 45, color: "#fac600", name: "Reb" },
            { y: 60, color: "#b4d800", name: "Stl" },
            { y: 55, color: "#b3d800", name: "Blk" },
            { y: 70, color: "#00c7a2", name: "Tov" },
            { y: 30, color: "#da000b", name: "3P%" },
            { y: 35, color: "#f53300", name: "2P%" }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    return (
      <div className="card">
        <div
          id="container-column"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
