import React from "react";

export default class CareerProgression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statOne: "ovr",
      statTwo: "off",
      statThree: "def",
      statOneData: [],
      statTwoData: [],
      statThreeData: []
    };
    this.createChart = this.createChart.bind(this);
    this.getStat = this.getStat.bind(this);
    this.scaleStat = this.scaleStat.bind(this);
    this.getOverall = this.getOverall.bind(this);
    this.getOffense = this.getOffense.bind(this);
    this.getDefense = this.getDefense.bind(this);
  }

  componentDidMount() {
    this.getStat(this.props.statCat);
    //this.createChart();
  }

  componentWillReceiveProps(nextProps) {
    this.getStat(nextProps.statCat);
    //this.createChart();
  }

  getStat(stat) {
    var statsOne = [];
    var statsTwo = [];
    var statsThree = [];
    if (stat === "Ovr/Off/Def") {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var player1 = {};
        var player2 = {};
        var player3 = {};
        var ovr = this.getOverall(seasons[i]);
        player1.y = parseFloat(ovr.toFixed(1));
        player1.gp = seasons[i].gamesPlayed;
        player1.mpg = seasons[i].mpg;
        player1.team = seasons[i].team;
        player1.year = seasons[i].year;
        statsOne.push(player1);
        var off = this.getOffense(seasons[i]);
        player2.y = parseFloat(off.toFixed(1));
        player2.gp = seasons[i].gamesPlayed;
        player2.mpg = seasons[i].mpg;
        player2.team = seasons[i].team;
        player2.year = seasons[i].year;
        statsTwo.push(player2);
        var def = this.getDefense(seasons[i]);
        player3.y = parseFloat(def.toFixed(1));
        player3.gp = seasons[i].gamesPlayed;
        player3.mpg = seasons[i].mpg;
        player3.team = seasons[i].team;
        player3.year = seasons[i].year;
        statsThree.push(player3);
      }
    }
    if (stat === "Overall") {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var player = {};
        var ovr = this.getOverall(seasons[i]);
        player.y = parseFloat(ovr.toFixed(1));
        player.gp = seasons[i].gamesPlayed;
        player.mpg = seasons[i].mpg;
        player.team = seasons[i].team;
        player.year = seasons[i].year;
        statsOne.push(player);
      }
    } else if (stat === "Offense") {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var player = {};
        var off = this.getOffense(seasons[i]);
        player.y = parseFloat(off.toFixed(1));
        player.gp = seasons[i].gamesPlayed;
        player.mpg = seasons[i].mpg;
        player.team = seasons[i].team;
        player.year = seasons[i].year;
        statsOne.push(player);
      }
    } else if (stat === "Defense") {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var player = {};
        var def = this.getDefense(seasons[i]);
        player.y = parseFloat(def.toFixed(1));
        player.gp = seasons[i].gamesPlayed;
        player.mpg = seasons[i].mpg;
        player.team = seasons[i].team;
        player.year = seasons[i].year;
        statsOne.push(player);
      }
    } else {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var player = {};
        var point = parseFloat(seasons[i][stat]);
        player.y = parseFloat(point.toFixed(2));
        player.gp = seasons[i].gamesPlayed;
        player.mpg = seasons[i].mpg;
        player.team = seasons[i].team;
        player.year = seasons[i].year;
        statsOne.push(player);
      }
    }
    this.setState(
      {
        statOneData: statsOne,
        statTwoData: statsTwo,
        statThreeData: statsThree
      },
      () => {
        this.createChart();
      }
    );
  }

  scaleStat(high, stat, low) {
    var scaled = 100 / (high - low) * (stat - low);
    return scaled;
  }

  getOverall(player) {
    var scaledPer = this.scaleStat(30.5, parseFloat(player.per), 5.0) * 0.4;
    var scaledBpm = this.scaleStat(10.9, parseFloat(player.bpm), -6.0) * 0.3;
    var scaledWs48 =
      this.scaleStat(0.299, parseFloat(player.wsFourtyEight), -0.03) * 0.1;
    var scaledWs = this.scaleStat(11.2, parseFloat(player.ws), -1.0) * 0.1;
    var scaledVorp = this.scaleStat(5.9, parseFloat(player.vorp), -1.2) * 0.1;
    var weightedOvr =
      scaledPer + scaledBpm + scaledWs48 + scaledWs + scaledVorp;

    return weightedOvr;
  }

  getOffense(player) {
    var scaledObpm = this.scaleStat(10.2, parseFloat(player.obpm), -6.0) * 0.5;
    var scaledOws = this.scaleStat(8.7, parseFloat(player.ows), -2.0) * 0.5;
    var offRating = scaledObpm + scaledOws;
    return offRating;
  }

  getDefense(player) {
    var scaledDbpm = this.scaleStat(5.8, parseFloat(player.dbpm), -4.0) * 0.5;
    var scaledDws = this.scaleStat(4.1, parseFloat(player.dws), 0) * 0.5;
    var defRating = scaledDbpm + scaledDws;
    return defRating;
  }

  createChart() {
    var xMax = this.props.seasons.length;
    var axisStyle = {
      title: {
        text: `${this.props.statCat}`
      }
    };
    if (
      this.props.statCat === "Overall" ||
      this.props.statCat === "Offense" ||
      this.props.statCat === "Defense" ||
      this.props.statCat === "Ovr/Off/Def"
    ) {
      axisStyle = {
        title: {
          text: `${this.props.statCat}`
        },
        min: 0,
        max: 115,
        tickInterval: 10
      };
    }
    var colorThree = "white";
    if (this.props.colors.Color_Third) {
      colorThree = this.props.colors.Color_Third;
    }
    var chart = Highcharts.chart("containerProg", {
      chart: {
        backgroundColor: null
      },
      title: {
        text: "Player Career Progression"
      },

      yAxis: axisStyle,
      xAxis: {
        title: {
          text: "Experience"
        },
        tickInterval: 1,
        max: xMax
      },
      legend: {
        layout: "horizontal",
        align: "middle",
        verticalAlign: "top",
        enabled: true
      },

      tooltip: {
        formatter: function() {
          return (
            "<b>" +
            this.point.year +
            " " +
            this.point.team +
            "</b><br/>" +
            "<b>" +
            this.series.name +
            "</b>" +
            ": " +
            this.point.y +
            "<br/>" +
            "<b>GP: </b>" +
            this.point.gp +
            "    " +
            "<b>MPG: </b>" +
            this.point.mpg
          );
        }
      },

      exporting: { enabled: false },

      plotOptions: {
        series: {
          lineWidth: 5,
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },

      // series: [
      //   {
      //     name: `${this.props.statCat}`,
      //     data: this.state.statOneData,
      //     color: `${this.props.colors.Color_Sec}`
      //   },
      //   {
      //     name: "Offense",
      //     data: this.state.statTwoData,
      //     color: `${this.props.colors.Color_Main}`
      //   },
      //   {
      //     name: "Defense",
      //     data: this.state.statThreeData,
      //     color: colorThree
      //   }
      // ],
      series: [
        {
          data: this.state.statOneData,
          name: `${this.props.statCat}`,
          color: `${this.props.colors.Color_Sec}`
        },
        {
          name: "Offense",
          data: this.state.statTwoData,
          color: `${this.props.colors.Color_Main}`
        },
        {
          name: "Defense",
          data: this.state.statThreeData,
          color: colorThree
        }
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom"
              }
            }
          }
        ]
      }
    });
  }

  render() {
    //console.log("props: ", this.props);
    return (
      <div>
        <div
          className="card"
          id="containerProg"
          style={{
            height: "500px",
            backgroundColor: "rgba(0,0,0,0.6)"
          }}
        />
      </div>
    );
  }
}
