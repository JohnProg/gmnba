import React from "react";

export default class PlayerAdvOffBarRatings extends React.Component {
  constructor(props) {
    super(props);
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
    var highAstPct = 43.0;
    var highOrbPct = 14.5;
    var highFg = 0.62;
    var highTovPct = -5.0;
    var highUsgPct = 33.0;
    var highObpm = 7.5;
    var highOws = 7.0;

    var astPct = this.getGrade(highAstPct, this.state.player.astPct, 4.0);
    var orbPct = this.getGrade(highOrbPct, this.state.player.orbPct, 0.5);
    var fg = this.getGrade(highFg, this.state.player.efgPct, 0.28);
    var tovPct = this.getGrade(
      highTovPct,
      this.state.player.tovPct * -1,
      -23.0
    );
    var usgPct = this.getGrade(highUsgPct, this.state.player.usgPct, 10);
    var obpm = this.getGrade(highObpm, this.state.player.obpm, -4.5);
    var ows = this.getGrade(highOws, this.state.player.ows, -1.0);
    this.setState(
      {
        astPct: astPct,
        orbPct: orbPct,
        tovPct: tovPct,
        fg: fg,
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
    var chart = Highcharts.chart("container-rating-advoff", {
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
        categories: ["AST%", "ORB%", "eFG%", "TOV%", "USG%", "OBPM", "OWS"],
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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`
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
            { y: 80, color: "#d8d8d8" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.astPct.Grade,
              color: this.state.astPct.Color,
              name: "Ast%",
              stat: this.state.player.astPct
            },
            {
              y: this.state.orbPct.Grade,
              color: this.state.orbPct.Color,
              name: "Orb%",
              stat: this.state.player.orbPct
            },
            {
              y: this.state.fg.Grade,
              color: this.state.fg.Color,
              name: "eFG%",
              stat: this.state.player.efgPct
            },
            {
              y: this.state.tovPct.Grade,
              color: this.state.tovPct.Color,
              name: "Tov%",
              stat: this.state.player.tovPct
            },
            {
              y: this.state.usgPct.Grade,
              color: this.state.usgPct.Color,
              name: "USG%",
              stat: this.state.player.usgPct
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
          ]
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div
          className="card"
          id="container-rating-advoff"
          style={{
            height: "300px",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
