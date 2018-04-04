import React from "react";

export default class PlayerPolColPostUp extends React.Component {
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
    var highAst = 0.2;
    var highFg = 0.55;
    var highFt = 0.9;
    var highPass = 0.5;
    var highPf = 0.1;
    var highPostUps = 12.0;
    var highPts = 8.0;
    var highPtsPct = 0.7;
    var highTov = -0.03;

    var ast = this.getGrade(highAst, this.state.player.astPct, 0.02);
    var fg = this.getGrade(highFg, this.state.player.fgPct, 0.26);
    var ft = this.getGrade(highFt, this.state.player.ftPct, 0.5);
    var pass = this.getGrade(highPass, this.state.player.passPct, 0.1);
    var pf = this.getGrade(highPf, this.state.player.pfPct, 0);
    var postUps = this.getGrade(
      highPostUps,
      this.state.player.postUps / this.props.min * 36,
      0
    );
    var pts = this.getGrade(
      highPts,
      this.state.player.pts / this.props.min * 36,
      0
    );
    var ptsPct = this.getGrade(highPtsPct, this.state.player.ptsPct, 0);
    var tovPct = this.getGrade(highTov, this.state.player.tovPct * -1, -0.11);
    this.setState(
      {
        ast: ast,
        fg: fg,
        ft: ft,
        pass: pass,
        pf: pf,
        postUps: postUps,
        pts: pts,
        ptsPct: ptsPct,
        tovPct: tovPct
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
    var chart = Highcharts.chart("container-column-post", {
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
              y: this.state.ast.Grade,
              color: this.state.ast.Color,
              name: "Ast%",
              stat: this.state.player.astPct
            },
            {
              y: this.state.fg.Grade,
              color: this.state.fg.Color,
              name: "FG%",
              stat: this.state.player.fgPct
            },
            {
              y: this.state.ft.Grade,
              color: this.state.ft.Color,
              name: "FT%",
              stat: this.state.player.ftPct
            },
            {
              y: this.state.pass.Grade,
              color: this.state.pass.Color,
              name: "Pass%",
              stat: this.state.player.passPct
            },
            {
              y: this.state.pf.Grade,
              color: this.state.pf.Color,
              name: "PF%",
              stat: (this.state.player.pfPct * 100).toFixed(1)
            },
            {
              y: this.state.postUps.Grade,
              color: this.state.postUps.Color,
              name: "Post Ups",
              stat: this.state.player.postUps,
              per36: (this.state.player.postUps / this.props.min * 36).toFixed(
                1
              )
            },
            {
              y: this.state.ptsPct.Grade,
              color: this.state.ptsPct.Color,
              name: "Pts%",
              stat: (this.state.player.ptsPct * 100).toFixed(1)
            },
            {
              y: this.state.pts.Grade,
              color: this.state.pts.Color,
              name: "Pts",
              stat: this.state.player.pts,
              per36: (this.state.player.pts / this.props.min * 36).toFixed(1)
            },
            {
              y: this.state.tovPct.Grade,
              color: this.state.tovPct.Color,
              name: "Tov%",
              stat: (this.state.player.tovPct * 100).toFixed(1)
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
          id="container-column-post"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
