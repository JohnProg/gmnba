import React from "react";

export default class PlayerPolarArea extends React.Component {
  constructor() {
    super();
    this.createChart = this.createChart.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.player.name) {
      this.setState(
        { player: nextProps.player, colors: nextProps.colors },
        () => {
          this.calculateGrades();
          //this.createChart();
        }
      );
    }
  }

  calculateGrades() {
    console.log("CALC STATE", this.state.player);
    var highPoints = 29;
    var highAst = 11;
    var highReb = 15;
    var highStl = 2.5;
    var highBlk = 2.5;
    var highFT = 0.93;
    var highThree = 0.53;
    var highTwo = 0.88;

    var scoring = this.getGrade(highPoints, this.state.player.pts);
    var ast = this.getGrade(highAst, this.state.player.ast);
    var reb = this.getGrade(highReb, this.state.player.trb);
    var stl = this.getGrade(highStl, this.state.player.stl);
    var blk = this.getGrade(highBlk, this.state.player.blk);
    var ft = this.getGrade(highFT, this.state.player.freeThrowPct);
    var threePoint = this.getGrade(highThree, this.state.player.threePtPct);
    var twoPoint = this.getGrade(highTwo, this.state.player.twoPtPct);
    this.setState(
      {
        scoring: scoring,
        ast: ast,
        reb: reb,
        stl: stl,
        blk: blk,
        threePoint: threePoint
      },
      () => {
        console.log("STATE", this.state);
        this.createChart();
      }
    );
  }

  getGrade(high, actual) {
    var playerGrade = {};
    var gradeSlots = 13;
    var gradeScale = high / gradeSlots;

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
    } else if (actual >= sevenFive) {
      playerGrade["Grade"] = 75;
    } else if (actual >= seventy) {
      playerGrade["Grade"] = 70;
    } else if (actual >= sixFive) {
      playerGrade["Grade"] = 65;
    } else if (actual >= sixty) {
      playerGrade["Grade"] = 60;
    } else if (actual >= fiveFive) {
      playerGrade["Grade"] = 55;
    } else if (actual >= fifty) {
      playerGrade["Grade"] = 50;
    } else if (actual >= fourFive) {
      playerGrade["Grade"] = 45;
    } else if (actual >= fourty) {
      playerGrade["Grade"] = 40;
    } else if (actual >= threeFive) {
      playerGrade["Grade"] = 35;
    } else if (actual >= thirty) {
      playerGrade["Grade"] = 30;
    } else if (actual >= twoFive) {
      playerGrade["Grade"] = 25;
    } else {
      playerGrade["Grade"] = 20;
    }
    return playerGrade;
  }

  createChart() {
    var chart = Highcharts.chart("container-polar2", {
      chart: {
        polar: true,
        type: "area"
      },

      title: {
        text: null,
        x: 0
      },

      pane: {
        size: "80%"
      },

      xAxis: {
        categories: [
          "Scoring",
          "Rebounding",
          "Playmaking",
          "3P%",
          "Blocks",
          "Steals"
        ],
        tickmarkPlacement: "on",
        lineWidth: 0
      },

      yAxis: {
        gridLineInterpolation: "polygon",
        lineWidth: 0,
        gridLineColor: "#C0C0C0",
        min: 15,
        max: 80,
        tickInterval: 10,
        labels: {
          enabled: false
        }
      },

      tooltip: {
        shared: false,
        pointFormat:
          '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
      },

      legend: {
        align: "right",
        verticalAlign: "top",
        y: 70,
        layout: "vertical",
        enabled: false
      },

      series: [
        {
          name: "Player Grade",
          data: [
            this.state.scoring.Grade,
            this.state.reb.Grade,
            this.state.ast.Grade,
            this.state.threePoint.Grade,
            this.state.blk.Grade,
            this.state.stl.Grade
          ],
          pointPlacement: "on",
          color: `${this.state.colors.Color_Main}`
        }
      ]
    });
  }

  render() {
    return (
      <div className="card">
        <div
          id="container-polar2"
          style={{ height: "400px", margin: "0 auto" }}
        />
      </div>
    );
  }
}
