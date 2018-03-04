import React from "react";

export default class PlayerCatchShootBarRatings extends React.Component {
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
    var highFgPct = 0.5;
    var highFgAtt = 9;
    var highPts = 9;
    var highThreeAtt = 6;
    var highThreePct = 0.46;
    var highEfg = 0.67;

    var fgPct = this.getGrade(highFgPct, this.state.player.fgPct, 0.2);
    var fga = this.getGrade(highFgAtt, this.state.player.fga, 0);
    var pts = this.getGrade(highPts, this.state.player.pts, 0);
    var threeAtt = this.getGrade(highThreeAtt, this.state.player.threePtAtt, 0);
    var threePct = this.getGrade(
      highThreePct,
      this.state.player.threePtPct,
      0.25
    );
    var efg = this.getGrade(highEfg, this.state.player.efgPct, 0.41);
    this.setState(
      {
        fgPct: fgPct,
        fga: fga,
        pts: pts,
        threeAtt: threeAtt,
        threePct: threePct,
        efg: efg
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
    var chart = Highcharts.chart("container-rating-catch", {
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
        categories: ["FG%", "FGA", "PTS", "3P%", "3PA", "eFG%"],
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
            { y: 80, color: "#d8d8d8" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.fgPct.Grade,
              color: this.state.fgPct.Color,
              name: "FG%",
              stat: (this.state.player.fgPct * 100).toFixed(1)
            },
            {
              y: this.state.fga.Grade,
              color: this.state.fga.Color,
              name: "FGA",
              stat: this.state.player.fga
            },
            {
              y: this.state.pts.Grade,
              color: this.state.pts.Color,
              name: "PTS",
              stat: this.state.player.pts
            },
            {
              y: this.state.threePct.Grade,
              color: this.state.threePct.Color,
              name: "3P%",
              stat: (this.state.player.threePtPct * 100).toFixed(1)
            },
            {
              y: this.state.threeAtt.Grade,
              color: this.state.threeAtt.Color,
              name: "3PA",
              stat: this.state.player.threePtAtt
            },
            {
              y: this.state.efg.Grade,
              color: this.state.efg.Color,
              name: "eFG%",
              stat: (this.state.player.efgPct * 100).toFixed(1)
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
          id="container-rating-catch"
          style={{
            height: "275px",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
