import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import axios from "axios";
import PlayerProjectionChart from "./PlayerProjectionChart";
import PlayerComps from "./PlayerComps";

const weights = {
  // Vitals
  draft: 0.05,
  height: 0.05,
  weight: 0.05,
  gamesPlayed: 0.0256,
  mpg: 0.0258,
  ovr: 0.067,
  off: 0.049,
  def: 0.049,
  stl: 0.015,
  blk: 0.015,
  usgPct: 0.035,
  fgm: 0.008,
  fga: 0.015,
  fgPct: 0.015,
  twoPtAtt: 0.004,
  twoPtPct: 0.006,
  tov: 0.009,
  pf: 0.006,
  blkPct: 0.018,
  stlPct: 0.018,
  efgPct: 0.018,
  tsPct: 0.018,
  pts: 0.0166,
  ast: 0.013,
  trb: 0.013,
  per: 0.04,
  vorp: 0.016,
  ws: 0.028,
  ows: 0.019,
  dws: 0.019,
  obpm: 0.019,
  dbpm: 0.019,
  wsFourtyEight: 0.016,
  orb: 0.013,
  drb: 0.013,
  threePtPct: 0.015,
  threePtAtt: 0.015,
  threePAr: 0.018,
  ftr: 0.018,
  freeThrowPct: 0.01,
  fta: 0.016,
  astPct: 0.018,
  drbPct: 0.014,
  orbPct: 0.014,
  tovPct: 0.016,
  bpm: 0.037
};

const statCats = [
  //"draft",
  //"height",
  "weight",
  "gamesPlayed",
  "mpg",
  //"ovr",
  //"off",
  //"def",
  "stl",
  "blk",
  "usgPct",
  "fgm",
  "fga",
  "fgPct",
  "twoPtAtt",
  "twoPtPct",
  "tov",
  "pf",
  "blkPct",
  "stlPct",
  "efgPct",
  "tsPct",
  "pts",
  "ast",
  "trb",
  "per",
  "vorp",
  "ws",
  "ows",
  "dws",
  "obpm",
  "dbpm",
  "wsFourtyEight",
  "orb",
  "drb",
  "threePtPct",
  "threePtAtt",
  "threePAr",
  "ftr",
  "freeThrowPct",
  "fta",
  "astPct",
  "drbPct",
  "orbPct",
  "tovPct",
  "bpm"
];

export default class PlayerProjection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStats: [],
      sorted: false,
      stats: [],
      topTen: []
    };
    this.calculateSimularity = this.calculateSimularity.bind(this);
    this.getZscore = this.getZscore.bind(this);
    this.getStdDev = this.getStdDev.bind(this);
    this.getPlayerSimScore = this.getPlayerSimScore.bind(this);
    this.renderComps = this.renderComps.bind(this);
  }

  componentDidMount() {
    var age = this.props.player.age;
    axios
      .get(`/api/teams/getAgeStats/${age}`)
      .then(data => {
        this.setState({ playerStats: data.data }, () => {
          //console.log(this.state.playerStats);
          this.calculateSimularity();
        });
      })
      .catch(err => {
        console.log(err);
      });
    axios
      .get(`/api/teams/getCareerStats/${this.props.player.name}`)
      .then(data => {
        this.setState({ stats: data.data }, () => {
          //console.log(this.state.stats);
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  calculateSimularity() {
    var players = this.state.playerStats;
    var currentPlayer = this.props.player;
    currentPlayer.Zscores = this.getZscore(currentPlayer);
    var positive = [];
    for (var i = 0; i < players.length; i++) {
      players[i].Zscores = this.getZscore(players[i]);
      var simScore = this.getPlayerSimScore(
        currentPlayer.Zscores,
        players[i].Zscores
      );
      players[i].simScore = simScore;
      if (simScore >= 30) {
        positive.push(players[i]);
      }
    }
    var sorted = positive.sort(function(a, b) {
      return b.simScore - a.simScore;
    });
    var topTen = [];
    var j = 0;
    while (topTen.length < 10 && j < 20) {
      if (sorted[j].name !== this.props.player.name) {
        var exist = false;
        for (var i = 0; i < topTen.length; i++) {
          if (topTen[i].name === sorted[j].name) {
            exist = true;
          }
        }
        if (exist === false) {
          var playerFuture = {};
          axios
            .get(`/api/teams/getFutureStats`, {
              params: {
                name: sorted[j].name,
                age: sorted[j].age
              }
            })
            .then(data => {
              console.log(data.data);
            })
            .catch(err => {
              console.log(err);
            });
          topTen.push(sorted[j]);
        }
      }
      j++;
    }
    this.setState({ sorted: true, topTen: topTen });
    //console.log(topTen);
  }

  getZscore(player) {
    var playerZs = {};
    for (var i = 0; i < statCats.length; i++) {
      var mean = this.getStatMean(statCats[i]);
      var stdDev = this.getStdDev(statCats[i], mean);
      var score = (parseFloat(player[statCats[i]]) - mean) / stdDev;
      playerZs[statCats[i]] = score.toFixed(2);
    }
    return playerZs;
  }

  getStatMean(stat) {
    var count = 0;
    for (var i = 0; i < this.state.playerStats.length; i++) {
      count += parseFloat(this.state.playerStats[i][stat]);
    }
    var mean = (count / this.state.playerStats.length).toFixed(3);
    return mean;
  }

  getStdDev(stat, mean) {
    var players = this.state.playerStats;
    var count = 0;
    for (var i = 0; i < players.length; i++) {
      var meanDiff = mean - parseFloat(players[i][stat]);
      var squared = meanDiff * meanDiff;
      count += squared;
    }
    var meanSquared = count / players.length;
    //console.log(stat, meanSquared);
    var stdDev = Math.sqrt(meanSquared);
    return stdDev;
  }

  getPlayerSimScore(current, comp) {
    var count = 0;
    for (var key in current) {
      var diff = parseFloat(current[key]) - parseFloat(comp[key]);
      var squared = diff * diff;
      var weighted = squared * weights[key];
      //console.log(key, weighted);
      count += weighted;
    }
    var deviance = Math.sqrt(count);
    var score = 100 * ((1.25 - deviance) / 1.25);
    return score;
  }

  renderComps() {
    var headerStyle = {
      backgroundColor: this.props.colors.Color_Main,
      height: "50px",
      lineHeight: "50px",
      fontSize: "20px",
      paddingLeft: "25px",
      color: this.props.colors.Color_Sec
    };
    if (this.state.sorted) {
      return (
        <div>
          <Row style={{ paddingTop: "40px" }}>
            <Col lg={3} md={4}>
              <div className="card" style={headerStyle}>
                Player Projection
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={12}>
              <PlayerProjectionChart
                current={this.props.player}
                past={this.state.stats}
                colors={this.props.colors}
                statCat="pts"
              />
            </Col>
          </Row>
          <Row style={{ paddingTop: "40px" }}>
            <Col lg={3} md={4}>
              <div className="card" style={headerStyle}>
                Top Comparisons
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "40px" }}>
            <Col lg={12}>
              <PlayerComps comps={this.state.topTen} />
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div style={{ textAlign: "center", color: "white" }}>
          <img
            style={{ marginTop: "60px", height: "150px" }}
            src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
          />
          <div>Analyzing 6,000+ Players</div>
          <div>This May Take A Minute...</div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={12}>{this.renderComps()}</Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
