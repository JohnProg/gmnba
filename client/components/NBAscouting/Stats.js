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
      renderRatings: false,
      sortStat: "pts"
    };
    this.renderPlayers = this.renderPlayers.bind(this);
    this.handleStatButton = this.handleStatButton.bind(this);
    this.handleRatingButton = this.handleRatingButton.bind(this);
    this.renderTableHeaders = this.renderTableHeaders.bind(this);
    this.getGrade = this.getGrade.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.sortGP = this.sortGP.bind(this);
    this.sortFG = this.sortFG.bind(this);
    this.sortFGA = this.sortFGA.bind(this);
    this.sortFGPCT = this.sortFGPCT.bind(this);
    this.sort3P = this.sort3P.bind(this);
    this.sort3PA = this.sort3PA.bind(this);
    this.sort3PPCT = this.sort3PPCT.bind(this);
    this.sort2P = this.sort2P.bind(this);
    this.sort2PA = this.sort2PA.bind(this);
    this.sort2PPCT = this.sort2PPCT.bind(this);
    this.sortFT = this.sortFT.bind(this);
    this.sortFTA = this.sortFTA.bind(this);
    this.sortFTPCT = this.sortFTPCT.bind(this);
    this.sortORB = this.sortORB.bind(this);
    this.sortDRB = this.sortDRB.bind(this);
    this.sortTRB = this.sortTRB.bind(this);
    this.sortAST = this.sortAST.bind(this);
    this.sortSTL = this.sortSTL.bind(this);
    this.sortBLK = this.sortBLK.bind(this);
    this.sortTOV = this.sortTOV.bind(this);
    this.sortPF = this.sortPF.bind(this);
    this.sortPTS = this.sortPTS.bind(this);
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
    var highEFg = 0.65;
    var highOrb = 5.0;
    var highDrb = 10.0;
    var highTov = 0;

    var scoring = this.getGrade(highPoints, player.pts / player.mpg * 36, 0);
    var ast = this.getGrade(highAst, player.ast / player.mpg * 36, 0);
    var reb = this.getGrade(highReb, player.trb / player.mpg * 36, 0);
    var stl = this.getGrade(highStl, player.stl / player.mpg * 36, 0);
    var blk = this.getGrade(highBlk, player.blk / player.mpg * 36, 0);
    var ft = this.getGrade(highFT, player.freeThrowPct, 0.4);
    var threePoint = this.getGrade(highThree, player.threePtPct, 0.2);
    var twoPoint = this.getGrade(highTwo, player.twoPtPct, 0.2);
    var fg = this.getGrade(highEFg, player.efgPct, 0.3);
    var orb = this.getGrade(highOrb, player.orb, 0);
    var drb = this.getGrade(highDrb, player.drb, 1.0);
    var tov = this.getGrade(highTov, player.tov * -1, -5.0);
    var grades = {
      scoring: scoring,
      ast: ast,
      reb: reb,
      stl: stl,
      blk: blk,
      ft: ft,
      threePoint: threePoint,
      twoPoint: twoPoint,
      fg: fg,
      orb: orb,
      drb: drb,
      tov: tov
    };
    return grades;
  }

  renderPlayers() {
    var sorted = [];
    var stat = this.state.sortStat;
    if (this.props.players && this.state.renderStats === true) {
      var players = this.props.players;
      sorted = players.sort(function(a, b) {
        return parseFloat(b[stat]) - parseFloat(a[stat]);
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

  sortGP() {
    this.setState({ sortStat: "gamesPlayed" });
  }
  sortFG() {
    this.setState({ sortStat: "fgm" });
  }
  sortFGA() {
    this.setState({ sortStat: "fga" });
  }
  sortFGPCT() {
    this.setState({ sortStat: "fgPct" });
  }
  sort3P() {
    this.setState({ sortStat: "threePt" });
  }
  sort3PA() {
    this.setState({ sortStat: "threePtAtt" });
  }
  sort3PPCT() {
    this.setState({ sortStat: "threePtPct" });
  }
  sort2P() {
    this.setState({ sortStat: "twoPt" });
  }
  sort2PA() {
    this.setState({ sortStat: "twoPtAtt" });
  }
  sort2PPCT() {
    this.setState({ sortStat: "twoPtPct" });
  }
  sortFT() {
    this.setState({ sortStat: "ft" });
  }
  sortFTA() {
    this.setState({ sortStat: "fta" });
  }
  sortFTPCT() {
    this.setState({ sortStat: "freeThrowPct" });
  }
  sortORB() {
    this.setState({ sortStat: "orb" });
  }
  sortDRB() {
    this.setState({ sortStat: "drb" });
  }
  sortTRB() {
    this.setState({ sortStat: "trb" });
  }
  sortAST() {
    this.setState({ sortStat: "ast" });
  }
  sortSTL() {
    this.setState({ sortStat: "stl" });
  }
  sortBLK() {
    this.setState({ sortStat: "blk" });
  }
  sortTOV() {
    this.setState({ sortStat: "tov" });
  }
  sortPF() {
    this.setState({ sortStat: "pf" });
  }
  sortPTS() {
    this.setState({ sortStat: "pts" });
  }

  renderTableHeaders() {
    if (this.state.renderStats) {
      return (
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th onClick={this.sortGP} style={{ cursor: "pointer" }}>
            GP
          </th>
          <th onClick={this.sortFG} style={{ cursor: "pointer" }}>
            FG
          </th>
          <th onClick={this.sortFGA} style={{ cursor: "pointer" }}>
            FGA
          </th>
          <th onClick={this.sortFGPCT} style={{ cursor: "pointer" }}>
            FG%
          </th>
          <th onClick={this.sort3P} style={{ cursor: "pointer" }}>
            3P
          </th>
          <th onClick={this.sort3PA} style={{ cursor: "pointer" }}>
            3PA
          </th>
          <th onClick={this.sort3PPCT} style={{ cursor: "pointer" }}>
            3P%
          </th>
          <th onClick={this.sort2P} style={{ cursor: "pointer" }}>
            2P
          </th>
          <th onClick={this.sort2PA} style={{ cursor: "pointer" }}>
            2PA
          </th>
          <th onClick={this.sort2PPCT} style={{ cursor: "pointer" }}>
            2P%
          </th>
          <th onClick={this.sortFT} style={{ cursor: "pointer" }}>
            FT
          </th>
          <th onClick={this.sortFTA} style={{ cursor: "pointer" }}>
            FTA
          </th>
          <th onClick={this.sortFTPCT} style={{ cursor: "pointer" }}>
            FT%
          </th>
          <th onClick={this.sortORB} style={{ cursor: "pointer" }}>
            ORB
          </th>
          <th onClick={this.sortDRB} style={{ cursor: "pointer" }}>
            DRB
          </th>
          <th onClick={this.sortTRB} style={{ cursor: "pointer" }}>
            TRB
          </th>
          <th onClick={this.sortAST} style={{ cursor: "pointer" }}>
            AST
          </th>
          <th onClick={this.sortSTL} style={{ cursor: "pointer" }}>
            STL
          </th>
          <th onClick={this.sortBLK} style={{ cursor: "pointer" }}>
            BLK
          </th>
          <th onClick={this.sortTOV} style={{ cursor: "pointer" }}>
            TOV
          </th>
          <th onClick={this.sortPF} style={{ cursor: "pointer" }}>
            PF
          </th>
          <th onClick={this.sortPTS} style={{ cursor: "pointer" }}>
            PTS
          </th>
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
          <Col lg={3} lgOffset={1} md={4}>
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
