import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  Table
} from "react-bootstrap";
import StatsPlayerEntry from "./StatsPlayerEntry";
import RatingsPlayerEntry from "./RatingsPlayerEntry";

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderStats: true,
      renderRatings: false
    };
    this.renderPlayers = this.renderPlayers.bind(this);
    this.handleStatButton = this.handleStatButton.bind(this);
    this.handleRatingButton = this.handleRatingButton.bind(this);
    this.renderTableHeaders = this.renderTableHeaders.bind(this);
    this.getGrade = this.getGrade.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
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
    //console.log("PG: ", playerGrade);
    return playerGrade;
  }

  calculateGrades(player) {
    var highPoints = 30;
    var highAst = 10;
    var highReb = 15;
    var highStl = 2.5;
    var highBlk = 2.5;
    var highFT = 0.93;
    var highThree = 0.45;
    var highTwo = 0.7;

    var scoring = this.getGrade(highPoints, player.pts / player.mpg * 36, 0);
    var ast = this.getGrade(highAst, player.ast / player.mpg * 36, 0);
    var reb = this.getGrade(highReb, player.trb / player.mpg * 36, 0);
    var stl = this.getGrade(highStl, player.stl / player.mpg * 36, 0);
    var blk = this.getGrade(highBlk, player.blk / player.mpg * 36, 0);
    var ft = this.getGrade(highFT, player.freeThrowPct, 0.4);
    var threePoint = this.getGrade(highThree, player.threePtPct, 0.2);
    var twoPoint = this.getGrade(highTwo, player.twoPtPct, 0.2);
    var grades = {
      scoring: scoring,
      ast: ast,
      reb: reb,
      stl: stl,
      blk: blk,
      ft: ft,
      threePoint: threePoint,
      twoPoint: twoPoint
    };
    return grades;
  }

  renderPlayers() {
    var sorted = [];
    if (this.props.players && this.state.renderStats === true) {
      var players = this.props.players;
      sorted = players.sort(function(a, b) {
        return parseFloat(b.pts) - parseFloat(a.pts);
      });
      return sorted.map((player, i) => (
        <StatsPlayerEntry player={player} key={i} />
      ));
    } else if (this.props.players && this.state.renderRatings === true) {
      var players = this.props.players;
      for (let i = 0; i < players.length; i++) {
        //players[i]["Grades"] = this.calculateGrades(players[i]);
        var temp = this.calculateGrades(players[i]);
        players[i]["Grades"] = temp;
      }
      console.log(players);
      sorted = players.sort(function(a, b) {
        return parseFloat(b.pts) - parseFloat(a.pts);
      });
      return sorted.map((player, i) => (
        <RatingsPlayerEntry player={player} key={i} />
      ));
    }
  }

  renderTableHeaders() {
    if (this.state.renderStats) {
      return (
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>GP</th>
          <th>FG</th>
          <th>FGA</th>
          <th>FG%</th>
          <th>3P</th>
          <th>3PA</th>
          <th>3P%</th>
          <th>2P</th>
          <th>2PA</th>
          <th>2P%</th>
          <th>FT</th>
          <th>FTA</th>
          <th>FT%</th>
          <th>ORB</th>
          <th>DRB</th>
          <th>TRB</th>
          <th>AST</th>
          <th>STL</th>
          <th>BLK</th>
          <th>TOV</th>
          <th>PF</th>
          <th>PTS</th>
        </tr>
      );
    } else {
      return (
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>GP</th>
          <th>FG</th>
          <th>3P</th>
          <th>2P</th>
          <th>FT</th>
          <th>ORB</th>
          <th>DRB</th>
          <th>TRB</th>
          <th>AST</th>
          <th>STL</th>
          <th>BLK</th>
          <th>TOV</th>
          <th>PF</th>
          <th>PTS</th>
        </tr>
      );
    }
  }

  handleStatButton() {
    this.setState({ renderStats: true, renderRatings: false });
  }

  handleRatingButton() {
    this.setState({ renderRatings: true, renderStats: false });
  }

  render() {
    var headerStyle = {
      backgroundColor: "#d00000",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    var statHeader = {
      lineHeight: "40px",
      backgroundColor: "#d00000",
      fontSize: "18px",
      paddingLeft: "15px",
      color: "white"
    };
    var selectedStatButton = {
      borderRadius: "10px 0px 0px 10px",
      backgroundColor: "#d00000",
      color: "white",
      width: "100px",
      fontWeight: "bold"
    };
    var unSelectedStatButton = {
      borderRadius: "10px 0px 0px 10px",
      backgroundColor: "#fff",
      color: "#d00000",
      width: "100px"
    };
    var selectedRatingButton = {
      borderRadius: "0px 10px 10px 0px",
      backgroundColor: "#d00000",
      color: "white",
      width: "100px",
      fontWeight: "bold"
    };
    var unSelectedRatingButton = {
      borderRadius: "0px 10px 10px 0px",
      backgroundColor: "#fff",
      color: "#d00000",
      width: "100px"
    };
    var statStyle;
    var ratingStyle;
    if (this.state.renderStats) {
      statStyle = selectedStatButton;
    } else {
      statStyle = unSelectedStatButton;
    }
    if (this.state.renderRatings) {
      ratingStyle = selectedRatingButton;
    } else {
      ratingStyle = unSelectedRatingButton;
    }
    return (
      <div>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={3} lgOffset={1}>
            <div className="card" style={headerStyle}>
              League Stats
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg={3} lgOffset={8} style={{ paddingLeft: "70px" }}>
            <span>
              <Button onClick={this.handleStatButton} style={statStyle}>
                Stats
              </Button>
            </span>
            <span>
              <Button onClick={this.handleRatingButton} style={ratingStyle}>
                Ratings
              </Button>
            </span>
          </Col>
        </Row>
        <Row style={{ paddingBottom: "40px" }}>
          <Col lg={10} lgOffset={1}>
            <div className="card" style={{ marginTop: "30px" }}>
              <div style={statHeader}>PLAYER STATS</div>
            </div>
            <div
              style={{
                overflowX: "scroll",
                height: "800px",
                overflowY: "scroll"
              }}
            >
              <Table striped hover>
                <thead>{this.renderTableHeaders()}</thead>
                <tbody>{this.renderPlayers()}</tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
