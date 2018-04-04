import React from "react";

export default class PlayerPolColHustle extends React.Component {
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
    var highScreenAst = 6.9;
    var highCharges = 0.68;
    var highLooseRec = 2.1;
    var highDeflections = 4.1;
    var highContestTwo = 15.0;
    var highContestThree = 5.3;
    var highContestShot = 16.0;

    var screenAst = this.getGrade(
      highScreenAst,
      this.state.player.screenAst / this.props.min * 36,
      0.1
    );
    var chargesDrawn = this.getGrade(
      highCharges,
      this.state.player.chargesDrawn / this.props.min * 36,
      0
    );
    var looseBallRec = this.getGrade(
      highLooseRec,
      this.state.player.looseBallRec / this.props.min * 36,
      0.5
    );
    var deflections = this.getGrade(
      highDeflections,
      this.state.player.deflections / this.props.min * 36,
      0.5
    );
    var contestedTwo = this.getGrade(
      highContestTwo,
      this.state.player.contestedTwo / this.props.min * 36,
      1.0
    );
    var contestedThree = this.getGrade(
      highContestThree,
      this.state.player.contestedThree / this.props.min * 36,
      1.5
    );
    var contestedShots = this.getGrade(
      highContestShot,
      this.state.player.contestedShots / this.props.min * 36,
      3.5
    );
    this.setState(
      {
        screenAst: screenAst,
        chargesDrawn: chargesDrawn,
        looseBallRec: looseBallRec,
        deflections: deflections,
        contestedTwo: contestedTwo,
        contestedThree: contestedThree,
        contestedShots: contestedShots
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
    var chart = Highcharts.chart("container-hustle", {
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
        tickInterval: 51.4,
        labels: {
          enabled: false
        },
        gridLineColor: "grey"
      },

      tooltip: {
        headerFormat: "<b>{point.key}</b><br/>",
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Stat: {point.stat}</span><br/><span>Per 36: {point.per36}</span>`
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
          pointInterval: 51.4,
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
              y: this.state.screenAst.Grade,
              color: this.state.screenAst.Color,
              name: "Screen Ast",
              stat: this.state.player.screenAst,
              per36: (this.state.player.screenAst /
                this.props.min *
                36
              ).toFixed(1)
            },
            {
              y: this.state.chargesDrawn.Grade,
              color: this.state.chargesDrawn.Color,
              name: "Charges Drawn",
              stat: this.state.player.chargesDrawn,
              per36: (this.state.player.chargesDrawn /
                this.props.min *
                36
              ).toFixed(1)
            },
            {
              y: this.state.looseBallRec.Grade,
              color: this.state.looseBallRec.Color,
              name: "Loose Ball",
              stat: this.state.player.looseBallRec,
              per36: (this.state.player.looseBallRec /
                this.props.min *
                36
              ).toFixed(1)
            },
            {
              y: this.state.deflections.Grade,
              color: this.state.deflections.Color,
              name: "Deflections",
              stat: this.state.player.deflections,
              per36: (this.state.player.deflections /
                this.props.min *
                36
              ).toFixed(1)
            },
            {
              y: this.state.contestedTwo.Grade,
              color: this.state.contestedTwo.Color,
              name: "Cont. 2P",
              stat: this.state.player.contestedTwo,
              per36: (this.state.player.contestedTwo /
                this.props.min *
                36
              ).toFixed(1)
            },
            {
              y: this.state.contestedThree.Grade,
              color: this.state.contestedThree.Color,
              name: "Cont. 3P",
              stat: this.state.player.contestedThree,
              per36: (this.state.player.contestedThree /
                this.props.min *
                36
              ).toFixed(1)
            },
            {
              y: this.state.contestedShots.Grade,
              color: this.state.contestedShots.Color,
              name: "Cont. Shot",
              stat: this.state.player.contestedShots,
              per36: (this.state.player.contestedShots /
                this.props.min *
                36
              ).toFixed(1)
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
            id="container-hustle"
            style={{ height: "400px", margin: "0 auto" }}
          />
        </div>
      </div>
    );
  }
}
