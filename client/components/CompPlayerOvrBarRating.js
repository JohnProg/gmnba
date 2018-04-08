import React from "react";

export default class CompPlayerOvrBarRating extends React.Component {
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
    var highPER = 27.0;
    var highBPM = 8.0;
    var highVorp = 5.0;
    var highWS = 9.0;
    var highWs48 = 0.3;

    var per = this.getGrade(highPER, this.state.player.per, 5.0);
    var bpm = this.getGrade(highBPM, this.state.player.bpm, -7.0);
    var vorp = this.getGrade(highVorp, this.state.player.vorp, -1.0);
    var ws = this.getGrade(highWS, this.state.player.ws, -1.0);
    var wsFourtyEight = this.getGrade(
      highWs48,
      this.state.player.wsFourtyEight,
      0
    );
    this.setState(
      {
        per: per,
        bpm: bpm,
        vorp: vorp,
        ws: ws,
        wsFourtyEight: wsFourtyEight
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
    var chart = Highcharts.chart("container-rating-ovr", {
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
        categories: ["PER", "BPM", "VORP", "WS", "WS/48"],
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
            { y: 80, color: "grey" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.per.Grade,
              color: this.state.per.Color,
              stat: this.props.player.per
            },
            {
              y: this.state.bpm.Grade,
              color: this.state.bpm.Color,
              stat: this.props.player.bpm
            },
            {
              y: this.state.vorp.Grade,
              color: this.state.vorp.Color,
              stat: this.props.player.vorp
            },
            {
              y: this.state.ws.Grade,
              color: this.state.ws.Color,
              stat: this.props.player.ws
            },
            {
              y: this.state.wsFourtyEight.Grade,
              color: this.state.wsFourtyEight.Color,
              stat: this.props.player.wsFourtyEight
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
          id="container-rating-ovr"
          style={{
            height: "300px",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
