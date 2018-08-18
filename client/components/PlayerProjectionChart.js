import React from "react";
import axios from "axios";

export default class PlayerProjectionChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pastStats: [],
      projectedStats: [],
      statData: [],
      futureStats: [],
      future: []
    };
    this.createChart = this.createChart.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  componentDidMount() {
    this.getStats();
  }

  componentWillReceiveProps(nextProps) {
    this.getStats();
  }

  getStats() {
    var statData = [];
    var pastStats = this.props.past.sort(function(a, b) {
      return parseInt(a.year) - parseInt(b.year);
    });
    pastStats.push(this.props.current);
    this.setState({ pastStats: pastStats }, () => {
      for (var i = 0; i < pastStats.length; i++) {
        var player = {};
        var point = parseFloat(pastStats[i].pts);
        player.y = parseFloat(point.toFixed(2));
        player.gp = pastStats[i].gamesPlayed;
        player.mpg = pastStats[i].mpg;
        player.team = pastStats[i].team;
        player.year = pastStats[i].year;
        statData.push(player);
      }
      for (var j = 0; j < this.props.future.length; j++) {
        statData.push(this.props.future[j]);
      }
      this.setState({ statData: statData, future: this.props.future }, () => {
        console.log(this.state.statData);
        this.createChart();
      });
    });
  }

  createChart() {
    var color = this.props.colors.Color_Main;
    if (this.props.colors.Color_Main === "#000") {
      color = "#fff";
    }
    var xMax = this.state.pastStats.length + 3;
    var axisStyle = {
      title: {
        text: `Pts`
      }
    };
    if (
      this.props.statCat === "Overall" ||
      this.props.statCat === "Offense" ||
      this.props.statCat === "Defense" ||
      this.props.statCat === "Ovr/Off/Def"
    ) {
      axisStyle = {
        title: {
          text: `Pts`
        },
        min: 0,
        max: 115,
        tickInterval: 10
      };
    }
    var chart = Highcharts.chart("containerProj", {
      chart: {
        backgroundColor: null
      },
      title: {
        text: "Player Career Projection"
      },

      yAxis: axisStyle,
      xAxis: {
        title: {
          text: "Experience"
        },
        tickInterval: 1,
        max: xMax
      },
      legend: {
        layout: "horizontal",
        align: "middle",
        verticalAlign: "top",
        enabled: true
      },

      tooltip: {
        formatter: function() {
          return (
            "<b>" +
            this.point.year +
            " " +
            this.point.team +
            "</b><br/>" +
            "<b>" +
            this.series.name +
            "</b>" +
            ": " +
            this.point.y +
            "<br/>" +
            "<b>GP: </b>" +
            this.point.gp +
            "    " +
            "<b>MPG: </b>" +
            this.point.mpg
          );
        }
      },

      exporting: { enabled: false },

      plotOptions: {
        series: {
          lineWidth: 5,
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },

      series: [
        {
          data: this.state.statData,
          name: `${this.props.statCat}`,
          color: color,
          zoneAxis: "x",
          zones: [
            {
              value: this.state.statData.length - 3
            },
            {
              dashStyle: "dot",
              color: "gold"
            }
          ]
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
    console.log("Future props: ", this.props.future);
    return (
      <div>
        <div
          className="card"
          id="containerProj"
          style={{
            height: "500px",
            backgroundColor: "rgba(0,0,0,0.6)"
          }}
        />
      </div>
    );
  }
}
