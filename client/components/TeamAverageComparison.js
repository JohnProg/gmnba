import React from "react";

export default class TeamAverageComparison extends React.Component {
  constructor() {
    super();
    this.state = {
      team: {},
      league: {}
    };
    this.createChart = this.createChart.bind(this);
    this.getLeagueAverage = this.getLeagueAverage.bind(this);
  }

  componentDidMount() {
    if (this.props.team) {
      this.setState(
        { team: this.props.team, league: this.props.league },
        () => {
          if (this.state.league) {
            var pointAvg = this.getLeagueAverage("PTS");
            var rebAvg = this.getLeagueAverage("TRB");
            var astAvg = this.getLeagueAverage("AST");
            var stlAvg = this.getLeagueAverage("STL");
            var blkAvg = this.getLeagueAverage("BLK");
            var shotAvg = this.getLeagueAverage("FG_PCT");
            this.setState(
              {
                avgPTS: pointAvg,
                avgREB: rebAvg,
                avgAST: astAvg,
                avgSTL: stlAvg,
                avgBLK: blkAvg,
                avgSHOT: shotAvg
              },
              () => {
                this.createChart();
              }
            );
          }
        }
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.team) {
      this.setState({ team: nextProps.team, league: nextProps.league }, () => {
        if (this.state.league) {
          var pointAvg = this.getLeagueAverage("PTS");
          var rebAvg = this.getLeagueAverage("TRB");
          var astAvg = this.getLeagueAverage("AST");
          var stlAvg = this.getLeagueAverage("STL");
          var blkAvg = this.getLeagueAverage("BLK");
          var shotAvg = this.getLeagueAverage("FG_PCT");
          this.setState(
            {
              avgPTS: pointAvg,
              avgREB: rebAvg,
              avgAST: astAvg,
              avgSTL: stlAvg,
              avgBLK: blkAvg,
              avgSHOT: shotAvg
            },
            () => {
              this.createChart();
            }
          );
        }
      });
    }
  }

  getLeagueAverage(stat) {
    var count = 0;
    var teamsCount = this.props.league.length;
    this.state.league.forEach(team => {
      count += parseFloat(team[stat]);
    });
    var average = count / teamsCount;
    return average.toFixed(2);
  }

  createChart() {
    var chart = Highcharts.chart("container-average", {
      chart: {
        type: "column"
      },
      title: {
        text: `${this.state.team.Name} Vs League Averages`
      },
      xAxis: {
        categories: ["Pts", "Reb", "Ast", "Stl", "Blk", "Shot %"]
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: "League Averages"
          },
          labels: {
            enabled: false
          }
        },
        {
          title: {
            text: null
          },
          opposite: true
        }
      ],
      legend: {
        shadow: false
      },
      tooltip: {
        shared: true
      },
      plotOptions: {
        column: {
          grouping: false,
          shadow: false,
          borderWidth: 0
        }
      },
      series: [
        {
          name: "League Average",
          color: "#c2ced5",
          data: [
            parseFloat(this.state.avgPTS),
            parseFloat(this.state.avgREB),
            parseFloat(this.state.avgAST) * 2,
            parseFloat(this.state.avgSTL) * 5,
            parseFloat(this.state.avgBLK) * 5,
            parseFloat(this.state.avgSHOT) * 100
          ],
          pointPadding: 0.3,
          pointPlacement: 0
        },
        {
          name: "Team Average",
          color: `${this.state.team.Color_Main}`,
          data: [
            parseFloat(this.state.team.PTS),
            parseFloat(this.state.team.TRB),
            parseFloat(this.state.team.AST) * 2,
            parseFloat(this.state.team.STL) * 5,
            parseFloat(this.state.team.BLK) * 5,
            parseFloat(this.state.team.FG_PCT) * 100
          ],
          pointPadding: 0.4,
          pointPlacement: 0
        }
      ]
    });
  }

  render() {
    return (
      <div>
        <div
          className="card"
          id="container-average"
          style={{
            height: "500px",
            width: "800",
            margin: "0 auto"
          }}
        />
      </div>
    );
  }
}
