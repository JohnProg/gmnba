import React from "react";

export default class PlayerPolColDef extends React.Component {
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
    var highBlkPct = 6.5;
    var highStlPct = 3.0;
    var highDrbPct = 36.0;
    var highDbpm = 4.0;
    var highDws = 3.3;
    var highDrb = 11.0;
    var highStl = 2.4;
    var highBlk = 2.4;
    var highPf = 0;

    if (
      this.state.player.position === "PG" ||
      this.state.player.position === "SG"
    ) {
      highBlk = 1.2;
    }
    if (this.state.player.position === "SF") {
      highBlk = 1.5;
    }

    var blkPct = this.getGrade(highBlkPct, this.state.player.blkPct, 0);
    var stlPct = this.getGrade(highStlPct, this.state.player.stlPct, 0);
    var drbPct = this.getGrade(highDrbPct, this.state.player.drbPct, 5);
    var dws = this.getGrade(highDws, this.state.player.dws, 0);
    var drb = this.getGrade(
      highDrb,
      (this.state.player.drb / this.state.player.mpg) * 36,
      1
    );
    var stl = this.getGrade(
      highStl,
      (this.state.player.stl / this.state.player.mpg) * 36,
      0
    );
    var blk = this.getGrade(
      highBlk,
      (this.state.player.blk / this.state.player.mpg) * 36,
      0
    );
    var dbpm = this.getGrade(highDbpm, this.state.player.dbpm, -4);
    var pf = this.getGrade(
      highPf,
      (this.state.player.pf / this.state.player.mpg) * 36 * -1,
      -6.0
    );
    this.setState(
      {
        blkPct: blkPct,
        stlPct: stlPct,
        drbPct: drbPct,
        drb: drb,
        stl: stl,
        blk: blk,
        dbpm: dbpm,
        dws: dws,
        pf: pf
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
    var chart = Highcharts.chart("container-column-def", {
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
              y: this.state.blkPct.Grade,
              color: this.state.blkPct.Color,
              name: "Blk%",
              stat: this.state.player.blkPct
            },
            {
              y: this.state.stlPct.Grade,
              color: this.state.stlPct.Color,
              name: "Stl%",
              stat: this.state.player.stlPct
            },
            {
              y: this.state.drbPct.Grade,
              color: this.state.drbPct.Color,
              name: "Drb%",
              stat: this.state.player.drbPct
            },
            {
              y: this.state.drb.Grade,
              color: this.state.drb.Color,
              name: "Drb",
              stat: this.state.player.drb,
              per36: (
                (this.state.player.drb / this.state.player.mpg) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.stl.Grade,
              color: this.state.stl.Color,
              name: "Stl",
              stat: this.state.player.stl,
              per36: (
                (this.state.player.stl / this.state.player.mpg) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.blk.Grade,
              color: this.state.blk.Color,
              name: "Blk",
              stat: this.state.player.blk,
              per36: (
                (this.state.player.blk / this.state.player.mpg) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.pf.Grade,
              color: this.state.pf.Color,
              name: "Pf",
              stat: this.state.player.pf,
              per36: (
                (this.state.player.pf / this.state.player.mpg) *
                36
              ).toFixed(1)
            },
            {
              y: this.state.dbpm.Grade,
              color: this.state.dbpm.Color,
              name: "DBPM",
              stat: this.state.player.dbpm
            },
            {
              y: this.state.dws.Grade,
              color: this.state.dws.Color,
              name: "DWS",
              stat: this.state.player.dws
            }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    return (
      <div style={{ paddingTop: "20px" }}>
        <div
          id="container-column-def"
          style={{ height: "320px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
