import React from "react";

export default class PlayerPolColOvr extends React.Component {
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
    var highPer = 27.0;
    var highWs = 9.0;
    var highWsFourtyEight = 0.3;
    var highDbpm = 5.5;
    var highDws = 2.5;
    var highVorp = 5.0;
    var highBpm = 8.0;
    var highOws = 7.0;
    var highObpm = 7.0;

    var per = this.getGrade(highPer, this.state.player.per, 5.0);
    var ws = this.getGrade(highWs, this.state.player.ws, -1.0);
    var wsFourtyEight = this.getGrade(
      highWsFourtyEight,
      this.state.player.wsFourtyEight,
      -0.03
    );
    var dbpm = this.getGrade(highDbpm, this.state.player.dbpm, -4);
    var dws = this.getGrade(highDws, this.state.player.dws, 0);
    var vorp = this.getGrade(highVorp, this.state.player.vorp, -1.0);
    var bpm = this.getGrade(highBpm, this.state.player.bpm, -7.0);
    var ows = this.getGrade(highOws, this.state.player.ows, -2.0);
    var obpm = this.getGrade(highObpm, this.state.player.obpm, -6.0);
    this.setState(
      {
        per: per,
        ws: ws,
        wsFourtyEight: wsFourtyEight,
        vorp: vorp,
        bpm: bpm,
        ows: ows,
        dws: dws,
        obpm: obpm,
        dbpm: dbpm
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
    var chart = Highcharts.chart("container-column-ovr", {
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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span>`
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
              y: this.state.per.Grade,
              color: this.state.per.Color,
              name: "PER",
              stat: this.state.player.per
            },
            {
              y: this.state.ws.Grade,
              color: this.state.ws.Color,
              name: "WS",
              stat: this.state.player.ws
            },
            {
              y: this.state.wsFourtyEight.Grade,
              color: this.state.wsFourtyEight.Color,
              name: "WS/48",
              stat: this.state.player.wsFourtyEight
            },
            {
              y: this.state.vorp.Grade,
              color: this.state.vorp.Color,
              name: "VORP",
              stat: this.state.player.vorp
            },
            {
              y: this.state.bpm.Grade,
              color: this.state.bpm.Color,
              name: "BPM",
              stat: this.state.player.bpm
            },
            {
              y: this.state.dws.Grade,
              color: this.state.dws.Color,
              name: "DWS",
              stat: this.state.player.dws
            },
            {
              y: this.state.dbpm.Grade,
              color: this.state.dbpm.Color,
              name: "DBPM",
              stat: this.state.player.dbpm
            },
            {
              y: this.state.obpm.Grade,
              color: this.state.obpm.Color,
              name: "OBPM",
              stat: this.state.player.obpm
            },
            {
              y: this.state.ows.Grade,
              color: this.state.ows.Color,
              name: "OWS",
              stat: this.state.player.ows
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
          id="container-column-ovr"
          style={{ height: "320px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
