import React from "react";

export default class CompTeamOvrBarRatings2 extends React.Component {
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
    var highMov = 8.0;
    var highOrtg = 115.0;
    var highDrtg = -103.0;
    var highSos = 1.1;
    var highSrs = 9.0;

    var mov = this.getGrade(highMov, this.props.player.MOV, -8.0);
    var sos = this.getGrade(highSos, this.props.player.SOS, -1.1);
    var srs = this.getGrade(highSrs, this.props.player.SRS, -8.0);
    var drtg = this.getGrade(highDrtg, this.props.player.DRtg * -1, -113.0);
    var ortg = this.getGrade(highOrtg, this.props.player.ORtg, 104.0);

    this.setState(
      {
        mov: mov,
        sos: sos,
        srs: srs,
        drtg: drtg,
        ortg: ortg
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
    var chart = Highcharts.chart("container-rating-ovr2", {
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
        categories: ["MOV", "SOS", "SRS", "DRtg", "ORtg"],
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
            { y: 80, color: "#d8d8d8" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.mov.Grade,
              color: this.state.mov.Color,
              stat: this.props.player.MOV
            },
            {
              y: this.state.sos.Grade,
              color: this.state.sos.Color,
              stat: this.props.player.SOS
            },
            {
              y: this.state.srs.Grade,
              color: this.state.srs.Color,
              stat: this.props.player.SRS
            },
            {
              y: this.state.drtg.Grade,
              color: this.state.drtg.Color,
              stat: this.props.player.DRtg
            },
            {
              y: this.state.ortg.Grade,
              color: this.state.ortg.Color,
              stat: this.props.player.ORtg
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
          id="container-rating-ovr2"
          style={{
            height: "300px",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
