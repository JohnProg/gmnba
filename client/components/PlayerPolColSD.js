import React from "react";

export default class PlayerPolColSD extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    if (this.props.player.name) {
      this.setState({ player: this.props.player }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    } else {
      this.setState({ player: {} }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.name) {
      this.setState({ player: nextProps.player }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    }
  }

  calculateGrades() {
    var highDistMiles = 2.6;
    var highDistMilesO = 1.45;
    var highDistMilesD = 1.21;
    var highSpeed = 4.9;
    var highSpeedO = 5.6;
    var highSpeedD = 4.7;

    var distMiles = this.getGrade(
      highDistMiles,
      this.state.player.distMiles,
      0.2
    );
    var distMilesO = this.getGrade(
      highDistMilesO,
      this.state.player.distMilesOff,
      0.1
    );
    var distMilesD = this.getGrade(
      highDistMilesD,
      this.state.player.distMilesDef,
      0.1
    );
    var speed = this.getGrade(highSpeed, this.state.player.avgSpeed, 3.6);
    var speedO = this.getGrade(highSpeedO, this.state.player.avgSpeedOff, 3.7);
    var speedD = this.getGrade(highSpeedD, this.state.player.avgSpeedDef, 3.2);
    this.setState(
      {
        distMiles: distMiles,
        distMilesO: distMilesO,
        distMilesD: distMilesD,
        speed: speed,
        speedO: speedO,
        speedD: speedD
      },
      () => {
        this.createChart();
      }
    );
  }

  getGrade(high, actual, min) {
    var playerGrade = {};
    var gradeSlots = 13;
    var adjusted = high - min;
    var gradeScale = adjusted / gradeSlots;

    var eighty = high - gradeScale;
    var sevenFive = eighty - gradeScale;
    var seventy = sevenFive - gradeScale;
    var sixFive = seventy - gradeScale;
    var sixty = sixFive - gradeScale;
    var fiveFive = sixty - gradeScale;
    var fifty = fiveFive - gradeScale;
    var fourFive = fifty - gradeScale;
    var fourty = fourFive - gradeScale;
    var threeFive = fourty - gradeScale;
    var thirty = threeFive - gradeScale;
    var twoFive = thirty - gradeScale;

    if (actual >= eighty) {
      playerGrade["Grade"] = 80;
      playerGrade["Color"] = "#1abded";
    } else if (actual >= sevenFive) {
      playerGrade["Grade"] = 75;
      playerGrade["Color"] = "#00a3c4";
    } else if (actual >= seventy) {
      playerGrade["Grade"] = 70;
      playerGrade["Color"] = "#00c7a2";
    } else if (actual >= sixFive) {
      playerGrade["Grade"] = 65;
      playerGrade["Color"] = "#56ce00";
    } else if (actual >= sixty) {
      playerGrade["Grade"] = 60;
      playerGrade["Color"] = "#b4d800";
    } else if (actual >= fiveFive) {
      playerGrade["Grade"] = 55;
      playerGrade["Color"] = "#b3d800";
    } else if (actual >= fifty) {
      playerGrade["Grade"] = 50;
      playerGrade["Color"] = "#ffdc00";
    } else if (actual >= fourFive) {
      playerGrade["Grade"] = 45;
      playerGrade["Color"] = "#fac600";
    } else if (actual >= fourty) {
      playerGrade["Grade"] = 40;
      playerGrade["Color"] = "#f0780d";
    } else if (actual >= threeFive) {
      playerGrade["Grade"] = 35;
      playerGrade["Color"] = "#f53300";
    } else if (actual >= thirty) {
      playerGrade["Grade"] = 30;
      playerGrade["Color"] = "#da000b";
    } else if (actual >= twoFive) {
      playerGrade["Grade"] = 25;
      playerGrade["Color"] = "#da000c";
    } else {
      playerGrade["Grade"] = 20;
      playerGrade["Color"] = "#b8000b";
    }
    return playerGrade;
  }

  createChart() {
    var chart = Highcharts.chart("container-column-speed", {
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
        tickInterval: 60,
        labels: {
          enabled: false
        }
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Stat: {point.stat}</span>`
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
          pointInterval: 60,
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
            {
              y: this.state.distMiles.Grade,
              color: this.state.distMiles.Color,
              name: "Dist. Miles",
              stat: this.state.player.distMiles
            },
            {
              y: this.state.distMilesO.Grade,
              color: this.state.distMilesO.Color,
              name: "Off. Miles",
              stat: this.state.player.distMilesOff
            },
            {
              y: this.state.distMilesD.Grade,
              color: this.state.distMilesD.Color,
              name: "Def. Miles",
              stat: this.state.player.distMilesDef
            },
            {
              y: this.state.speed.Grade,
              color: this.state.speed.Color,
              name: "Avg Speed",
              stat: this.state.player.avgSpeed
            },
            {
              y: this.state.speedO.Grade,
              color: this.state.speedO.Color,
              name: "Off. Speed",
              stat: this.state.player.avgSpeedOff
            },
            {
              y: this.state.speedD.Grade,
              color: this.state.speedD.Color,
              name: "Def. Speed",
              stat: this.state.player.avgSpeedDef
            }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="card">
        <div
          id="container-column-speed"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
