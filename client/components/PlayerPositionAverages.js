import React from "react";

export default class PlayerPositionAverages extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
    this.getPositionAverage = this.getPositionAverage.bind(this);
  }

  componentDidMount() {
    if (this.props.player) {
      this.setState(
        {
          player: this.props.player,
          positionStats: this.props.positionStats,
          colors: this.props.colors
        },
        () => {
          if (this.state.positionStats.length > 0) {
            var ptsAvg = this.getPositionAverage("pts");
            var trbAvg = this.getPositionAverage("trb");
            var astAvg = this.getPositionAverage("ast");
            var stlAvg = this.getPositionAverage("stl");
            var blkAvg = this.getPositionAverage("blk");
            var fgAvg = this.getPositionAverage("fgPct");
            this.setState(
              {
                ptsAvg: ptsAvg,
                trbAvg: trbAvg,
                astAvg: astAvg,
                stlAvg: stlAvg,
                blkAvg: blkAvg,
                fgAvg: fgAvg
              },
              () => {
                this.createChart();
              }
            );
          }
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player && nextProps.positionStats) {
      this.setState(
        {
          player: nextProps.player,
          positionStats: nextProps.positionStats,
          colors: nextProps.colors
        },
        () => {
          if (this.state.positionStats.length > 0) {
            var ptsAvg = this.getPositionAverage("pts");
            var trbAvg = this.getPositionAverage("trb");
            var astAvg = this.getPositionAverage("ast");
            var stlAvg = this.getPositionAverage("stl");
            var blkAvg = this.getPositionAverage("blk");
            var fgAvg = this.getPositionAverage("fgPct");
            this.setState(
              {
                ptsAvg: ptsAvg,
                trbAvg: trbAvg,
                astAvg: astAvg,
                stlAvg: stlAvg,
                blkAvg: blkAvg,
                fgAvg: fgAvg
              },
              () => {
                this.createChart();
              }
            );
          }
        }
      );
    }
  }

  componentDidMount() {
    //this.createChart();
  }

  getPositionAverage(stat) {
    var count = 0.0;
    var playerCount = this.state.positionStats.length;
    for (var i = 0; i < playerCount; i++) {
      if (this.state.positionStats[i][stat] !== null) {
        count += parseFloat(this.state.positionStats[i][stat]);
      }
    }
    var average = count / playerCount;
    return average.toFixed(2);
  }

  createChart() {
    var chart = Highcharts.chart("container-average-pl", {
      chart: {
        type: "column",
        backgroundColor: null
      },
      title: {
        text: `${this.state.player.name} Vs ${
          this.state.player.position
        } Averages`,
        color: "white"
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        categories: ["Pts", "Reb", "Ast", "Stl", "Blk", "Shot %"]
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: null
          },
          labels: {
            enabled: false
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
          data: [
            parseFloat(this.state.ptsAvg),
            parseFloat(this.state.trbAvg),
            parseFloat(this.state.astAvg),
            parseFloat(this.state.stlAvg),
            parseFloat(this.state.blkAvg)
          ],
          pointPadding: 0.3,
          pointPlacement: 0
        },
        {
          name: "Player Average",
          color: `${this.state.colors.Color_Main}`,
          data: [
            parseFloat(this.state.player.pts),
            parseFloat(this.state.player.trb),
            parseFloat(this.state.player.ast),
            parseFloat(this.state.player.stl),
            parseFloat(this.state.player.blk)
          ],
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
          id="container-average-pl"
          style={{
            height: "500px",
            width: "800",
            margin: "0 auto",
            backgroundColor: "rgba(0,0,0,0.6)"
          }}
        />
      </div>
    );
  }
}
