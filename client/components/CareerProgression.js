import React from "react";

export default class CareerProgression extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statOne: "ovr",
      data: []
    };
    this.createChart = this.createChart.bind(this);
    this.getStat = this.getStat.bind(this);
    this.scaleStat = this.scaleStat.bind(this);
    this.getOverall = this.getOverall.bind(this);
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
    var stats = [];
    if (stat === "Overall") {
      var seasons = this.props.seasons.sort(function(a, b) {
        return parseInt(a.year) - parseInt(b.year);
      });
      for (var i = 0; i < seasons.length; i++) {
        var ovr = this.getOverall(seasons[i]);
        stats.push(parseFloat(ovr.toFixed(1)));
      }
      console.log("ovr stats: ", stats);
    }
    this.setState({ data: stats }, () => {
      this.createChart();
    });
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

  createChart() {
    var chart = Highcharts.chart("containerProg", {
      chart: {
        backgroundColor: null
      },
      title: {
        text: "Player Career Progression"
      },

      yAxis: {
        title: {
          text: `${this.state.statOne}`
        },
        min: 0,
        max: 115,
        tickInterval: 10
      },
      xAxis: {
        title: {
          text: "Experience"
        },
        tickInterval: 1
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
        enabled: false
      },

      exporting: { enabled: false },

      plotOptions: {
        series: {
          lineWidth: 4,
          label: {
            connectorAllowed: false
          },
          pointStart: 1
        }
      },

      series: [
        {
          name: `${this.props.statCat}`,
          data: this.state.data,
          color: `${this.props.colors.Color_Sec}`
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
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />
      </div>
    );
  }
}
