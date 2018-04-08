import React from "react";

export default class PlayerPolarColumn2 extends React.Component {
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
    var highPoints = 30;
    var highAst = 11;
    var highReb = 15;
    var highStl = 2.5;
    var highBlk = 2.5;
    var highFT = 0.93;
    var highThree = 0.45;
    var highTwo = 0.7;

    var scoring = this.getGrade(
      highPoints,
      this.state.player.pts / this.state.player.mpg * 36,
      0
    );
    var ast = this.getGrade(
      highAst,
      this.state.player.ast / this.state.player.mpg * 36,
      0
    );
    var reb = this.getGrade(
      highReb,
      this.state.player.trb / this.state.player.mpg * 36,
      0
    );
    var stl = this.getGrade(
      highStl,
      this.state.player.stl / this.state.player.mpg * 36,
      0
    );
    var blk = this.getGrade(
      highBlk,
      this.state.player.blk / this.state.player.mpg * 36,
      0
    );
    var ft = this.getGrade(highFT, this.state.player.freeThrowPct, 0.4);
    var threePoint = this.getGrade(
      highThree,
      this.state.player.threePtPct,
      0.2
    );
    var twoPoint = this.getGrade(highTwo, this.state.player.twoPtPct, 0.2);
    this.setState(
      {
        scoring: scoring,
        ast: ast,
        reb: reb,
        stl: stl,
        blk: blk,
        ft: ft,
        threePoint: threePoint,
        twoPoint: twoPoint
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
    var chart = Highcharts.chart("container-column", {
      chart: {
        polar: true,
        type: "column",
        backgroundColor: null
      },

      title: {
        text: null
      },

      exporting: {
        enabled: false
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
        },
        gridLineColor: "grey"
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`
      },

      yAxis: {
        min: 0,
        max: 60,
        labels: {
          enabled: false
        },
        gridLineColor: "grey"
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
            {
              y: this.state.scoring.Grade,
              color: this.state.scoring.Color,
              name: "Scoring",
              stat: this.state.player.pts,
              per36: (this.state.player.pts /
                this.state.player.mpg *
                36
              ).toFixed(1)
            },
            {
              y: this.state.ast.Grade,
              color: this.state.ast.Color,
              name: "Ast",
              stat: this.state.player.ast,
              per36: (this.state.player.ast /
                this.state.player.mpg *
                36
              ).toFixed(1)
            },
            {
              y: this.state.reb.Grade,
              color: this.state.reb.Color,
              name: "Reb",
              stat: this.state.player.trb,
              per36: (this.state.player.trb /
                this.state.player.mpg *
                36
              ).toFixed(1)
            },
            {
              y: this.state.stl.Grade,
              color: this.state.stl.Color,
              name: "Stl",
              stat: this.state.player.stl,
              per36: (this.state.player.stl /
                this.state.player.mpg *
                36
              ).toFixed(1)
            },
            {
              y: this.state.blk.Grade,
              color: this.state.blk.Color,
              name: "Blk",
              stat: this.state.player.blk,
              per36: (this.state.player.blk /
                this.state.player.mpg *
                36
              ).toFixed(1)
            },
            {
              y: this.state.ft.Grade,
              color: this.state.ft.Color,
              name: "FT%",
              stat: (this.state.player.freeThrowPct * 100).toFixed(1)
            },
            {
              y: this.state.threePoint.Grade,
              color: this.state.threePoint.Color,
              name: "3P%",
              stat: (this.state.player.threePtPct * 100).toFixed(1)
            },
            {
              y: this.state.twoPoint.Grade,
              color: this.state.twoPoint.Color,
              name: "2P%",
              stat: (this.state.player.twoPtPct * 100).toFixed(1)
            }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div
          id="container-column"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
