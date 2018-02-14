import React from "react";

export default class CompTeamOffBarRatings2 extends React.Component {
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
    var highOrtg = 115.0;
    var highPace = 102.0;
    var highftr = 0.32;
    var highthreepar = 0.5;
    var highEfg = 0.55;
    var highTovPct = 15.0;
    var highOrbPct = 27.0;
    var highFtFga = 0.25;

    var ortg = this.getGrade(highOrtg, this.props.player.ORtg, 104.0);
    var pace = this.getGrade(highPace, this.props.player.PACE, 96.0);
    var ftr = this.getGrade(highftr, this.props.player.FTr, 0.2);
    var threepar = this.getGrade(
      highthreepar,
      this.props.player.Three_PAr,
      0.25
    );
    var efg = this.getGrade(highEfg, this.props.player.OFF_eFG_PCT, 0.48);
    var tovPct = this.getGrade(highTovPct, this.props.player.OFF_TOV_PCT, 12.0);
    var orbPct = this.getGrade(highOrbPct, this.props.player.ORB_PCT, 17.5);
    var ftfga = this.getGrade(highFtFga, this.props.player.OFF_FT_FGA, 0.15);

    this.setState(
      {
        ortg: ortg,
        pace: pace,
        ftr: ftr,
        threepar: threepar,
        efg: efg,
        tovPct: tovPct,
        orbPct: orbPct,
        ftfga: ftfga
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
    var chart = Highcharts.chart("container-rating-off2", {
      chart: {
        type: "bar"
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      xAxis: {
        categories: [
          "ORtg",
          "PACE",
          "FTr",
          "3PAr",
          "OFF eFG",
          "TOV%",
          "ORB%",
          "FT/FGA"
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
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" },
            { y: 80, color: "#d8d8d8" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.ortg.Grade,
              color: this.state.ortg.Color,
              stat: this.props.player.ORtg
            },
            {
              y: this.state.pace.Grade,
              color: this.state.pace.Color,
              stat: this.props.player.PACE
            },
            {
              y: this.state.ftr.Grade,
              color: this.state.ftr.Color,
              stat: this.props.player.FTr
            },
            {
              y: this.state.threepar.Grade,
              color: this.state.threepar.Color,
              stat: this.props.player.Three_PAr
            },
            {
              y: this.state.efg.Grade,
              color: this.state.efg.Color,
              stat: this.props.player.OFF_eFG_PCT
            },
            {
              y: this.state.tovPct.Grade,
              color: this.state.tovPct.Color,
              stat: this.props.player.OFF_TOV_PCT
            },
            {
              y: this.state.orbPct.Grade,
              color: this.state.orbPct.Color,
              stat: this.props.player.ORB_PCT
            },
            {
              y: this.state.ftfga.Grade,
              color: this.state.ftfga.Color,
              stat: this.props.player.OFF_FT_FGA
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
          id="container-rating-off2"
          style={{
            height: "300px",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
