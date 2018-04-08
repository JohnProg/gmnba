import React from "react";
import axios from "axios";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";

export default class GTeamStats extends React.Component {
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
    this.renderTeam = this.renderTeam.bind(this);
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
    var highPoints = 88;
    var highAst = 20;
    var highReb = 42;
    var highStl = 9;
    var highBlk = 7;
    var highFT = 0.8;
    var highThree = 0.42;
    var highFg = 0.51;
    var highOrb = 14;
    var highDrb = 30;
    var highTov = -9;
    var highPf = -13;

    var fg = this.getGrade(highFg, this.props.team.FG_PCT, 0.42);
    var scoring = this.getGrade(highPoints, this.props.team.PTS, 65);
    var ast = this.getGrade(highAst, this.props.team.AST, 11);
    var reb = this.getGrade(highReb, this.props.team.TRB, 32);
    var stl = this.getGrade(highStl, this.props.team.STL, 4.5);
    var blk = this.getGrade(highBlk, this.props.team.BLK, 2.5);
    var ft = this.getGrade(highFT, this.props.team.FT_PCT, 0.65);
    var tov = this.getGrade(highTov, this.props.team.TOV * -1, -16);
    var pf = this.getGrade(highPf, this.props.team.PF * -1, -20);
    var threePoint = this.getGrade(
      highThree,
      this.props.team.Three_Pointers_Pct,
      0.3
    );
    var orb = this.getGrade(highOrb, this.props.team.ORB, 8);
    var drb = this.getGrade(highDrb, this.props.team.DRB, 23);
    this.setState({
      fg: fg,
      scoring: scoring,
      ast: ast,
      reb: reb,
      stl: stl,
      blk: blk,
      ft: ft,
      orb: orb,
      drb: drb,
      tov: tov,
      pf: pf,
      threePoint: threePoint
    });
  }

  handleStatButton() {
    this.setState({ renderStats: true, renderRatings: false });
  }

  handleRatingButton() {
    this.setState({ renderRatings: true, renderStats: false });
  }

  renderTeam(stat) {
    if (this.state.renderStats === true) {
      return (
        <Table striped hover responsive>
          <thead>
            <tr
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white"
              }}
            >
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
            <tr
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white"
              }}
            >
              <th>{stat["GP"]}</th>
              <th>{stat["FG"]}</th>
              <th>{stat["FGA"]}</th>
              <th>{stat["FG_PCT"]}</th>
              <th>{stat["Three_Pointers"]}</th>
              <th>{stat["Three_Pointers_Att"]}</th>
              <th>{stat["Three_Pointers_Pct"]}</th>
              <th>{stat["Two_Pointers"]}</th>
              <th>{stat["Two_Pointers_Att"]}</th>
              <th>{stat["Two_Pointers_Pct"]}</th>
              <th>{stat["FTM"]}</th>
              <th>{stat["FTA"]}</th>
              <th>{stat["FT_PCT"]}</th>
              <th>{stat["ORB"]}</th>
              <th>{stat["DRB"]}</th>
              <th>{stat["TRB"]}</th>
              <th>{stat["AST"]}</th>
              <th>{stat["STL"]}</th>
              <th>{stat["BLK"]}</th>
              <th>{stat["TOV"]}</th>
              <th>{stat["PF"]}</th>
              <th>{stat["PTS"]}</th>
            </tr>
          </tbody>
        </Table>
      );
    } else if (this.state.renderRatings === true) {
      // this.calculateGrades();
      return (
        <Table striped hover responsive>
          <thead>
            <tr
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white"
              }}
            >
              <th>FG</th>
              <th>3P</th>
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
          </thead>
          <tbody>
            <tr
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                color: "white"
              }}
            >
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

              <th style={{ color: this.state.ft.Color, fontWeight: "bold" }}>
                {this.state.ft.Grade}
              </th>
              <th style={{ color: this.state.orb.Color, fontWeight: "bold" }}>
                {this.state.orb.Grade}
              </th>
              <th style={{ color: this.state.drb.Color, fontWeight: "bold" }}>
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
              <th style={{ color: this.state.tov.Color, fontWeight: "bold" }}>
                {this.state.tov.Grade}
              </th>
              <th style={{ color: this.state.pf.Color, fontWeight: "bold" }}>
                {this.state.pf.Grade}
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
      backgroundColor: this.props.team.Color_Main,
      fontSize: "20px",
      paddingLeft: "15px",
      color: this.props.team.Color_Sec
    };
    var selectedStatButton = {
      borderRadius: "10px 0px 0px 10px",
      backgroundColor: this.props.team.Color_Main,
      color: this.props.team.Color_Sec,
      width: "100px",
      fontWeight: "bold"
    };
    var unSelectedStatButton = {
      borderRadius: "10px 0px 0px 10px",
      backgroundColor: "#fff",
      color: this.props.team.Color_Main,
      width: "100px"
    };
    var selectedRatingButton = {
      borderRadius: "0px 10px 10px 0px",
      backgroundColor: this.props.team.Color_Main,
      color: this.props.team.Color_Sec,
      width: "100px",
      fontWeight: "bold"
    };
    var unSelectedRatingButton = {
      borderRadius: "0px 10px 10px 0px",
      backgroundColor: "#fff",
      color: this.props.team.Color_Main,
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
    var stat = this.props.team;
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
                  <div style={headerStyle}>2017-18 TEAM STATS</div>
                </div>
                {this.renderTeam(stat)}
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
                  <div style={headerStyle}>2017-18 TEAM ADVANCED STATS</div>
                </div>
                <Table striped hover responsive>
                  <thead>
                    <tr
                      style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white"
                      }}
                    >
                      <th>W</th>
                      <th>L</th>
                      <th>MOV</th>
                      <th>SOS</th>
                      <th>SRS</th>
                      <th>ORtg</th>
                      <th>DRtg</th>
                      <th>PACE</th>
                      <th>FTr</th>
                      <th>3PAr</th>
                      <th>Off eFG%</th>
                      <th>Off TOV%</th>
                      <th>ORB%</th>
                      <th>Off FT/FGA</th>
                      <th>Def eFG%</th>
                      <th>Def TOV%</th>
                      <th>DRB%</th>
                      <th>Def FT/FGA</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        backgroundColor: "rgba(0,0,0,0.5)",
                        color: "white"
                      }}
                    >
                      <th>{stat["W"]}</th>
                      <th>{stat["L"]}</th>
                      <th>{stat["MOV"]}</th>
                      <th>{stat["SOS"]}</th>
                      <th>{stat["SRS"]}</th>
                      <th>{stat["ORtg"]}</th>
                      <th>{stat["DRtg"]}</th>
                      <th>{stat["PACE"]}</th>
                      <th>{stat["FTr"]}</th>
                      <th>{stat["Three_PAr"]}</th>
                      <th>{stat["OFF_eFG_PCT"]}</th>
                      <th>{stat["OFF_TOV_PCT"]}</th>
                      <th>{stat["ORB_PCT"]}</th>
                      <th>{stat["OFF_FT_FGA"]}</th>
                      <th>{stat["DEF_eFG_PCT"]}</th>
                      <th>{stat["DEF_TOV_PCT"]}</th>
                      <th>{stat["DRB_PCT"]}</th>
                      <th>{stat["DEF_FT_FGA"]}</th>
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
