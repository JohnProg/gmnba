import React from "react";

export default class GPlayerPolColDef extends React.Component {
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
    var highBlkPct = 14.5;
    var highStlPct = 4.0;
    var highDrbPct = 27.0;
    var highDRtg = -96.0;
    //var highDws = 2.5;
    var highDrb = 10.2;
    var highStl = 3.0;
    var highBlk = 3.6;
    var highPf = -0.7;

    var blkPct = this.getGrade(highBlkPct, this.state.player.blkPct, 0);
    var stlPct = this.getGrade(highStlPct, this.state.player.stlPct, 0.5);
    var drbPct = this.getGrade(highDrbPct, this.state.player.drbPct, 5.0);
    //var dws = this.getGrade(highDws, this.state.player.dws, 0);
    var drb = this.getGrade(
      highDrb,
      this.state.player.drb / this.state.player.mpg * 36,
      1.9
    );
    var stl = this.getGrade(
      highStl,
      this.state.player.stl / this.state.player.mpg * 36,
      0.3
    );
    var blk = this.getGrade(
      highBlk,
      this.state.player.blk / this.state.player.mpg * 36,
      0
    );
    var drtg = this.getGrade(highDRtg, this.state.player.dbpm * -1, -114.0);
    var pf = this.getGrade(
      highPf,
      this.state.player.pf / this.state.player.mpg * 36 * -1,
      -5.1
    );
    this.setState(
      {
        blkPct: blkPct,
        stlPct: stlPct,
        drbPct: drbPct,
        drb: drb,
        stl: stl,
        blk: blk,
        drtg: drtg,
        //dws: dws,
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

      exporting: { enabled: false },

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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 32: {point.per32}</span>`
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
              color: "transparent",
              name: "Blk%",
              stat: this.state.player.blkPct
            },
            {
              y: this.state.stlPct.Grade,
              //color: this.state.stlPct.Color,
              color: "transparent",
              name: "Stl%",
              stat: this.state.player.stlPct
            },
            {
              y: this.state.drbPct.Grade,
              //color: this.state.drbPct.Color,
              color: "transparent",
              name: "Drb%",
              stat: this.state.player.drbPct
            },
            {
              y: this.state.drb.Grade,
              color: this.state.drb.Color,
              name: "Drb",
              stat: this.state.player.drb,
              per32: (this.state.player.drb /
                this.state.player.mpg *
                32
              ).toFixed(1)
            },
            {
              y: this.state.stl.Grade,
              color: this.state.stl.Color,
              name: "Stl",
              stat: this.state.player.stl,
              per32: (this.state.player.stl /
                this.state.player.mpg *
                32
              ).toFixed(1)
            },
            {
              y: this.state.blk.Grade,
              color: this.state.blk.Color,
              name: "Blk",
              stat: this.state.player.blk,
              per32: (this.state.player.blk /
                this.state.player.mpg *
                32
              ).toFixed(1)
            },
            {
              y: this.state.pf.Grade,
              color: this.state.pf.Color,
              name: "Pf",
              stat: this.state.player.pf,
              per32: (this.state.player.pf /
                this.state.player.mpg *
                32
              ).toFixed(1)
            },
            {
              y: this.state.drtg.Grade,
              color: this.state.drtg.Color,
              name: "DRtg",
              stat: this.state.player.dbpm
            }
            // {
            //   y: this.state.dws.Grade,
            //   color: this.state.dws.Color,
            //   name: "DWS",
            //   stat: this.state.player.dws
            // }
          ],
          pointPlacement: "on"
        }
      ]
    });
  }

  render() {
    return (
      <div className="card" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <div
          id="container-column-def"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
