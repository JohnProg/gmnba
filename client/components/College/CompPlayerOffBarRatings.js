import React from "react";

export default class CompPlayerOffBarRatings extends React.Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    this.setState({ player: this.props.player }, () => {
      console.log("TSPCT: ", this.state.player.tsPct);
      this.calculateGrades();
    });
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.player) {
  //     this.setState({ player: nextProps.player }, () => {
  //       console.log("TSPCT: ", this.state.player.tsPct);
  //       this.calculateGrades();
  //       //this.createChart();
  //     });
  //   }
  // }

  calculateGrades() {
    var highEFG = 0.68;
    var highTS = 0.67;
    var highFTr = 0.7;
    var highThreePar = 0.8;
    var highAstPct = 40.0;
    var highTovPct = -7.0;
    var highOrbPct = 14.5;
    var highUsgPct = 32.0;
    var highObpm = 9.0;
    var highOws = 4.0;

    var efg = this.getGrade(highEFG, this.state.player.efgPct, 0.25);
    var ts = this.getGrade(highTS, this.state.player.tsPct, 0.35);
    var ftr = this.getGrade(highFTr, this.state.player.ftr, 0.1);
    var threePar = this.getGrade(highThreePar, this.state.player.threePAr, 0);
    var astPct = this.getGrade(highAstPct, this.state.player.astPct, 2.0);
    var tovPct = this.getGrade(
      highTovPct,
      this.state.player.tovPct * -1,
      -27.0
    );
    var orbPct = this.getGrade(highOrbPct, this.state.player.orbPct, 0.5);
    var usgPct = this.getGrade(highUsgPct, this.state.player.usgPct, 10.0);
    var obpm = this.getGrade(highObpm, this.state.player.obpm, -3.0);
    var ows = this.getGrade(highOws, this.state.player.ows, 0);
    this.setState(
      {
        efg: efg,
        ts: ts,
        ftr: ftr,
        threePar: threePar,
        astPct: astPct,
        tovPct: tovPct,
        orbPct: orbPct,
        usgPct: usgPct,
        obpm: obpm,
        ows: ows
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
    var chart = Highcharts.chart("container-rating-off", {
      chart: {
        type: "bar",
        backgroundColor: null
      },
      title: {
        text: null
      },
      exporting: { enabled: false },
      subtitle: {
        text: null
      },
      xAxis: {
        categories: [
          "TS%",
          "FTr",
          "3PAr",
          "AST%",
          "TOV%",
          "ORB%",
          "USG%",
          "OBPM",
          "OWS"
        ],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 18,
        max: 80,
        title: {
          text: null,
          align: "high"
        },
        labels: {
          overflow: "justify",
          enabled: false
        },
        gridLineWidth: 0,
        minorGridLineWidth: 0
      },
      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Stat: {point.stat}</span>`
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          },
          grouping: false
        },
        series: {
          borderRadius: 10
        }
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      series: [
        {
          name: "Possible",
          dataLabels: false,
          data: [
            { y: 80, color: "grey" },
            { y: 80, color: "grey" },
            { y: 80, color: "grey" },
            { y: 80, color: "grey" },
            { y: 80, color: "grey" },
            { y: 80, color: "grey" },
            { y: 80, color: "grey" },
            { y: 80, color: "grey" },
            { y: 80, color: "grey" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.ts.Grade,
              color: this.state.ts.Color,
              stat: this.props.player.tsPct
            },
            {
              y: this.state.ftr.Grade,
              color: this.state.ftr.Color,
              stat: this.props.player.ftr
            },
            {
              y: this.state.threePar.Grade,
              color: this.state.threePar.Color,
              stat: this.props.player.threePAr
            },
            {
              y: this.state.astPct.Grade,
              color: this.state.astPct.Color,
              stat: this.props.player.astPct
            },
            {
              y: this.state.tovPct.Grade,
              color: this.state.tovPct.Color,
              stat: this.props.player.tovPct
            },
            {
              y: this.state.orbPct.Grade,
              color: this.state.orbPct.Color,
              stat: this.props.player.orbPct
            },
            {
              y: this.state.usgPct.Grade,
              color: this.state.usgPct.Color,
              stat: this.props.player.usgPct
            },
            {
              y: this.state.obpm.Grade,
              color: this.state.obpm.Color,
              stat: this.props.player.obpm
            },
            {
              y: this.state.ows.Grade,
              color: this.state.ows.Color,
              stat: this.props.player.ows
            }
          ]
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div
          id="container-rating-off"
          style={{
            height: "500px",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
