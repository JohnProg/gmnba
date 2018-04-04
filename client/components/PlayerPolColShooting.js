import React from "react";

export default class PlayerPolColShooting extends React.Component {
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
    // if (nextProps.player.name) {
    //   this.setState({ player: nextProps.player }, () => {
    //     this.calculateGrades();
    //     //this.createChart();
    //   });
    // }
  }

  calculateGrades() {
    var highDrPts = 9.5;
    var highDrPct = 0.6;
    var highCatchPts = 8.5;
    var highCatchPct = 0.6;
    var highPullPts = 9.5;
    var highPullPct = 0.5;
    var highPaintPct = 0.8;
    var highPostPct = 0.6;
    var highElbowPct = 0.65;

    var drPts = this.getGrade(
      highDrPts,
      this.state.player.drPts / this.props.min * 36,
      0
    );
    var drPct = this.getGrade(highDrPct, this.state.player.drPct, 0.33);
    var catchPts = this.getGrade(
      highCatchPts,
      this.state.player.catchPts / this.props.min * 36,
      0
    );
    var catchPct = this.getGrade(
      highCatchPct,
      this.state.player.catchPct,
      0.22
    );
    var pullPts = this.getGrade(
      highPullPts,
      this.state.player.pullPts / this.props.min * 36,
      0
    );
    var pullPct = this.getGrade(highPullPct, this.state.player.pullPct, 0.22);
    var paintPct = this.getGrade(
      highPaintPct,
      this.state.player.paintPct,
      0.33
    );
    var postPct = this.getGrade(highPostPct, this.state.player.postPct, 0.37);
    var elbowPct = this.getGrade(highElbowPct, this.state.player.elbowPct, 0.4);
    this.setState(
      {
        drPts: drPts,
        drPct: drPct,
        catchPts: catchPts,
        catchPct: catchPct,
        pullPts: pullPts,
        pullPct: pullPct,
        paintPct: paintPct,
        postPct: postPct,
        elbowPct: elbowPct
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
    var chart = Highcharts.chart("container-column-shooting", {
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
        tickInterval: 36,
        labels: {
          enabled: false
        }
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Stat: {point.stat}</span><br/><span>Per36: {point.per36}</span>`
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
          pointInterval: 40,
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
              y: this.state.drPts.Grade,
              color: this.state.drPts.Color,
              name: "Drive Pts",
              stat: this.state.player.drPts,
              per36: (this.state.player.drPts / this.props.min * 36).toFixed(1)
            },
            {
              y: this.state.drPct.Grade,
              color: this.state.drPct.Color,
              name: "Drive FG%",
              stat: (this.state.player.drPct * 100).toFixed(1)
            },
            {
              y: this.state.catchPts.Grade,
              color: this.state.catchPts.Color,
              name: "Catch/Shoot Pts",
              stat: this.state.player.catchPts,
              per36: (this.state.player.catchPts / this.props.min * 36).toFixed(
                1
              )
            },
            {
              y: this.state.catchPct.Grade,
              color: this.state.catchPct.Color,
              name: "Catch/Shoot FG%",
              stat: (this.state.player.catchPct * 100).toFixed(1)
            },
            {
              y: this.state.pullPts.Grade,
              color: this.state.pullPts.Color,
              name: "Pull Up Pts",
              stat: this.state.player.pullPts,
              per36: (this.state.player.pullPts / this.props.min * 36).toFixed(
                1
              )
            },
            {
              y: this.state.pullPct.Grade,
              color: this.state.pullPct.Color,
              name: "Pull Up FG%",
              stat: (this.state.player.pullPct * 100).toFixed(1)
            },
            {
              y: this.state.paintPct.Grade,
              color: this.state.paintPct.Color,
              name: "Paint FG%",
              stat: (this.state.player.paintPct * 100).toFixed(1)
            },
            {
              y: this.state.postPct.Grade,
              color: this.state.postPct.Color,
              name: "Post FG%",
              stat: (this.state.player.postPct * 100).toFixed(1)
            },
            {
              y: this.state.elbowPct.Grade,
              color: this.state.elbowPct.Color,
              name: "Elbow Touch FG%",
              stat: (this.state.player.elbowPct * 100).toFixed(1)
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
          id="container-column-shooting"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
