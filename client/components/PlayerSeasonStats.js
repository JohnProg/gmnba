import React from "react";
import axios from "axios";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";

export default class PlayerSeasonStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderStats: true,
      renderRatings: false
    };
    this.handleStatButton = this.handleStatButton.bind(this);
    this.handleRatingButton = this.handleRatingButton.bind(this);
    this.getGrade = this.getGrade.bind(this);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
  }

  componentDidMount() {
    this.calculateGrades();
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

  calculateGrades() {
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

    var scoring = this.getGrade(
      highPoints,
      this.props.player.pts / this.props.player.mpg * 36,
      0
    );
    var ast = this.getGrade(
      highAst,
      this.props.player.ast / this.props.player.mpg * 36,
      0
    );
    var reb = this.getGrade(
      highReb,
      this.props.player.trb / this.props.player.mpg * 36,
      0
    );
    var stl = this.getGrade(
      highStl,
      this.props.player.stl / this.props.player.mpg * 36,
      0
    );
    var blk = this.getGrade(
      highBlk,
      this.props.player.blk / this.props.player.mpg * 36,
      0
    );
    var ft = this.getGrade(highFT, this.props.player.freeThrowPct, 0.4);
    var threePoint = this.getGrade(
      highThree,
      this.props.player.threePtPct,
      0.2
    );
    var fg = this.getGrade(highEFg, this.props.player.efgPct, 0.3);
    var orb = this.getGrade(highOrb, this.props.player.orb, 0);
    var drb = this.getGrade(highDrb, this.props.player.drb, 1.0);
    var tov = this.getGrade(highTov, this.props.player.tov * -1, -5.0);
    var twoPoint = this.getGrade(highTwo, this.props.player.twoPtPct, 0.2);
    this.setState({
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
    });
  }

  handleStatButton() {
    this.setState({ renderStats: true, renderRatings: false });
  }

  handleRatingButton() {
    this.setState({ renderRatings: true, renderStats: false });
  }

  renderPlayer(stat) {
    if (this.state.renderStats === true) {
      return (
        <Table striped hover>
          <thead>
            <tr>
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
          </thead>
          <tbody>
            <tr>
              <th>{stat["gamesPlayed"]}</th>
              <th>{stat["fgm"]}</th>
              <th>{stat["fga"]}</th>
              <th>{stat["fgPct"]}</th>
              <th>{stat["threePt"]}</th>
              <th>{stat["threePtAtt"]}</th>
              <th>{stat["threePtPct"]}</th>
              <th>{stat["twoPt"]}</th>
              <th>{stat["twoPtAtt"]}</th>
              <th>{stat["twoPtPct"]}</th>
              <th>{stat["ft"]}</th>
              <th>{stat["fta"]}</th>
              <th>{stat["freeThrowPct"]}</th>
              <th>{stat["orb"]}</th>
              <th>{stat["drb"]}</th>
              <th>{stat["trb"]}</th>
              <th>{stat["ast"]}</th>
              <th>{stat["stl"]}</th>
              <th>{stat["blk"]}</th>
              <th>{stat["tov"]}</th>
              <th>{stat["pf"]}</th>
              <th>{stat["pts"]}</th>
            </tr>
          </tbody>
        </Table>
      );
    } else if (this.state.renderRatings === true) {
      // this.calculateGrades();
      return (
        <Table striped hover>
          <thead>
            <tr>
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
          </thead>
          <tbody>
            <tr>
              <th
                style={{
                  color: this.state.fg.Color,
                  fontWeight: "bold"
                }}
              >
                {this.state.fg.Grade}
              </th>
              <th
                style={{
                  color: this.state.threePoint.Color,
                  fontWeight: "bold"
                }}
              >
                {this.state.threePoint.Grade}
              </th>
              <th
                style={{ color: this.state.twoPoint.Color, fontWeight: "bold" }}
              >
                {this.state.twoPoint.Grade}
              </th>
              <th style={{ color: this.state.ft.Color, fontWeight: "bold" }}>
                {this.state.ft.Grade}
              </th>
              <th
                style={{
                  color: this.state.orb.Color,
                  fontWeight: "bold"
                }}
              >
                {this.state.orb.Grade}
              </th>
              <th
                style={{
                  color: this.state.drb.Color,
                  fontWeight: "bold"
                }}
              >
                {this.state.drb.Grade}
              </th>
              <th style={{ color: this.state.reb.Color, fontWeight: "bold" }}>
                {this.state.reb.Grade}
              </th>
              <th style={{ color: this.state.ast.Color, fontWeight: "bold" }}>
                {this.state.ast.Grade}
              </th>
              <th style={{ color: this.state.stl.Color, fontWeight: "bold" }}>
                {this.state.stl.Grade}
              </th>
              <th style={{ color: this.state.blk.Color, fontWeight: "bold" }}>
                {this.state.blk.Grade}
              </th>
              <th
                style={{
                  color: this.state.tov.Color,
                  fontWeight: "bold"
                }}
              >
                {this.state.tov.Grade}
              </th>
              <th
                style={{ color: this.state.scoring.Color, fontWeight: "bold" }}
              >
                {this.state.scoring.Grade}
              </th>
            </tr>
          </tbody>
        </Table>
      );
    }
  }

  render() {
    var headerStyle = {
      lineHeight: "50px",
      backgroundColor: this.props.colors.Color_Main,
      fontSize: "20px",
      paddingLeft: "15px",
      color: this.props.colors.Color_Sec
    };
    var selectedStatButton = {
      borderRadius: "10px 0px 0px 10px",
      backgroundColor: this.props.colors.Color_Main,
      color: this.props.colors.Color_Sec,
      width: "100px",
      fontWeight: "bold"
    };
    var unSelectedStatButton = {
      borderRadius: "10px 0px 0px 10px",
      backgroundColor: "#fff",
      color: this.props.colors.Color_Main,
      width: "100px"
    };
    var selectedRatingButton = {
      borderRadius: "0px 10px 10px 0px",
      backgroundColor: this.props.colors.Color_Main,
      color: this.props.colors.Color_Sec,
      width: "100px",
      fontWeight: "bold"
    };
    var unSelectedRatingButton = {
      borderRadius: "0px 10px 10px 0px",
      backgroundColor: "#fff",
      color: this.props.colors.Color_Main,
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
    var stat = this.props.player;
    return (
      <div>
        <Grid>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={3} lgOffset={9} style={{ paddingLeft: "70px" }}>
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
          <Row style={{ paddingTop: "20px" }}>
            <Col lg={12}>
              <div className="card">
                <div>
                  <div style={headerStyle}>2017-18 PLAYER STATS</div>
                </div>
                {this.renderPlayer(stat)}
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="card">
                <div
                  style={{
                    marginTop: "30px",
                    height: "50px"
                  }}
                >
                  <div style={headerStyle}>2017-18 PLAYER ADVANCED STATS</div>
                </div>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>AST%</th>
                      <th>BLK%</th>
                      <th>STL%</th>
                      <th>DRB%</th>
                      <th>ORB%</th>
                      <th>TRB%</th>
                      <th>eFG%</th>
                      <th>TOV%</th>
                      <th>FTr</th>
                      <th>3PAr</th>
                      <th>TS%</th>
                      <th>USG%</th>
                      <th>DBPM</th>
                      <th>OBPM</th>
                      <th>BPM</th>
                      <th>PER</th>
                      <th>VORP</th>
                      <th>DWS</th>
                      <th>OWS</th>
                      <th>WS</th>
                      <th>WS/48</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{stat["astPct"]}</th>
                      <th>{stat["blkPct"]}</th>
                      <th>{stat["stlPct"]}</th>
                      <th>{stat["drbPct"]}</th>
                      <th>{stat["orbPct"]}</th>
                      <th>{stat["trbPct"]}</th>
                      <th>{stat["efgPct"]}</th>
                      <th>{stat["tovPct"]}</th>
                      <th>{stat["ftr"]}</th>
                      <th>{stat["threePAr"]}</th>
                      <th>{stat["tsPct"]}</th>
                      <th>{stat["usgPct"]}</th>
                      <th>{stat["dbpm"]}</th>
                      <th>{stat["obpm"]}</th>
                      <th>{stat["bpm"]}</th>
                      <th>{stat["per"]}</th>
                      <th>{stat["vorp"]}</th>
                      <th>{stat["dws"]}</th>
                      <th>{stat["ows"]}</th>
                      <th>{stat["ws"]}</th>
                      <th>{stat["wsFourtyEight"]}</th>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
