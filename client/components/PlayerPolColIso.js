import React from "react";

export default class PlayerPolColIso extends React.Component {
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
    var highFreq = 28.0;
    var highPPP = 1.25;
    var highPts = 7.0;
    var highEfg = 57.0;
    var highScoreFreq = 55.0;
    var highToFreq = -1.0;
    var highFtFreq = 24.0;
    var highFga = 7.0;

    var freq = this.getGrade(highFreq, this.state.player.freq, 5.0);
    var ppp = this.getGrade(highPPP, this.state.player.ppp, 0.3);
    var pts = this.getGrade(
      highPts,
      this.state.player.pts / this.props.gp / this.props.min * 36,
      0.3
    );
    var efg = this.getGrade(highEfg, this.state.player.efg, 24.0);
    var scoreFreq = this.getGrade(
      highScoreFreq,
      this.state.player.scoreFreq,
      24.0
    );
    var toFreq = this.getGrade(
      highToFreq,
      this.state.player.toFreq * -1,
      -36.0
    );
    var ftFreq = this.getGrade(highFtFreq, this.state.player.ftFreq, 0);
    var fga = this.getGrade(
      highFga,
      this.state.player.fga / this.props.min * 36,
      0.3
    );
    this.setState(
      {
        freq: freq,
        ppp: ppp,
        pts: pts,
        efg: efg,
        scoreFreq: scoreFreq,
        toFreq: toFreq,
        ftFreq: toFreq,
        fga: fga
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
    var chart = Highcharts.chart("container-column-iso", {
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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Stat: {point.stat}</span><br/><span>Per36: {point.per36}</span>`
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
              y: this.state.freq.Grade,
              color: this.state.freq.Color,
              name: "Freq%",
              stat: this.state.player.freq
            },
            {
              y: this.state.ppp.Grade,
              color: this.state.ppp.Color,
              name: "PPP",
              stat: this.state.player.ppp
            },
            {
              y: this.state.pts.Grade,
              color: this.state.pts.Color,
              name: "PTS",
              stat: (this.state.player.pts / this.props.gp).toFixed(1),
              per36: (this.state.player.pts /
                this.props.gp /
                this.props.min *
                36
              ).toFixed(1)
            },
            {
              y: this.state.efg.Grade,
              color: this.state.efg.Color,
              name: "eFG%",
              stat: this.state.player.efg
            },
            {
              y: this.state.scoreFreq.Grade,
              color: this.state.scoreFreq.Color,
              name: "Score Freq.",
              stat: this.state.player.scoreFreq
            },
            {
              y: this.state.toFreq.Grade,
              color: this.state.toFreq.Color,
              name: "TOV Freq.",
              stat: this.state.player.toFreq
            },
            {
              y: this.state.ftFreq.Grade,
              color: this.state.ftFreq.Color,
              name: "FT Freq.",
              stat: this.state.player.ftFreq
            },
            {
              y: this.state.fga.Grade,
              color: this.state.fga.Color,
              name: "FGA",
              stat: this.state.player.fga,
              per36: (this.state.player.fga / this.props.min * 36).toFixed(1)
            }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    return (
      <div className="card" style={{ backgroundColor: "black" }}>
        <div style={{ backgroundColor: "rgba(105,105,105,0.1)" }}>
          <div
            id="container-column-iso"
            style={{ height: "400px", margin: "0 auto" }}
          />
        </div>
      </div>
    );
  }
}
