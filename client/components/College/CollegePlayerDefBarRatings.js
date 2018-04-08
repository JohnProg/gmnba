import React from "react";

export default class CollegePlayerDefBarRatings extends React.Component {
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
    var highBlkPct = 14.5;
    var highStlPct = 4.0;
    var highDrbPct = 27.0;
    var highDbpm = 9.5;
    var highDws = 2.5;
    var highDrb = 9.0;
    var highStl = 2.25;
    var highBlk = 2.2;
    var highPf = 3.6;

    var blkPct = this.getGrade(highBlkPct, this.state.player.blkPct, 0);
    var stlPct = this.getGrade(highStlPct, this.state.player.stlPct, 0.5);
    var drbPct = this.getGrade(highDrbPct, this.state.player.drbPct, 5.0);
    var dws = this.getGrade(highDws, this.state.player.dws, 0);
    var drb = this.getGrade(
      highDrb,
      this.state.player.drb / this.state.player.mpg * 32,
      1.8
    );
    var stl = this.getGrade(
      highStl,
      this.state.player.stl / this.state.player.mpg * 32,
      0
    );
    var blk = this.getGrade(
      highBlk,
      this.state.player.blk / this.state.player.mpg * 32,
      0
    );
    var dbpm = this.getGrade(highDbpm, this.state.player.dbpm, -1.0);
    var pf = this.getGrade(
      highPf,
      this.state.player.pf / this.state.player.mpg * 32,
      1
    );
    this.setState(
      {
        blkPct: blkPct,
        stlPct: stlPct,
        drbPct: drbPct,
        drb: drb,
        dbpm: dbpm,
        dws: dws
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
    var chart = Highcharts.chart("container-rating-def", {
      chart: {
        type: "bar",
        backgroundColor: null
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      exporting: { enabled: false },
      xAxis: {
        categories: ["BLK%", "STL%", "DRB%", "DRB", "DBPM", "DWS"],
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
        pointFormat: `<span>Rating: {point.y}</span><br/><span>Per Game: {point.stat}</span><br/><span>Per 32: {point.per32}</span>`
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
            { y: 80, color: "grey" }
          ]
        },
        {
          name: "Grade",
          data: [
            {
              y: this.state.blkPct.Grade,
              color: this.state.blkPct.Color,
              name: "Blk%",
              stat: this.state.player.blkPct
            },
            {
              y: this.state.stlPct.Grade,
              color: this.state.stlPct.Color,
              name: "Stl%",
              stat: this.state.player.stlPct
            },
            {
              y: this.state.drbPct.Grade,
              color: this.state.drbPct.Color,
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
              y: this.state.dbpm.Grade,
              color: this.state.dbpm.Color,
              name: "DBPM",
              stat: this.state.player.dbpm
            },
            {
              y: this.state.dws.Grade,
              color: this.state.dws.Color,
              name: "DWS",
              stat: this.state.player.dws
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
          id="container-rating-def"
          style={{
            height: "250px",
            margin: "0 auto",
            backgroundColor: "rgba(0,0,0,0.6)"
          }}
        />
      </div>
    );
  }
}
