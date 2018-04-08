import React from "react";

export default class CRatingslayersEntry extends React.Component {
  constructor(props) {
    super(props);
    this.calculateGrades = this.calculateGrades.bind(this);
    this.getGrade = this.getGrade.bind(this);
  }

  componentDidMount() {
    this.setState({ player: this.props.player }, () => {
      this.calculateGrades();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.player) {
      this.setState({ player: nextProps.player }, () => {
        this.calculateGrades();
        //this.createChart();
      });
    }
  }

  calculateGrades() {
    var highPoints = 30;
    var highAst = 10;
    var highReb = 15;
    var highStl = 2.5;
    var highBlk = 2.5;
    var highFT = 0.93;
    var highThree = 0.5;
    var highTwo = 0.88;
    var highFg = 0.65;

    var scoring = this.getGrade(
      highPoints,
      this.state.player.pts / this.state.player.mpg * 32,
      0
    );
    var ast = this.getGrade(
      highAst,
      this.state.player.ast / this.state.player.mpg * 32,
      0
    );
    var reb = this.getGrade(
      highReb,
      this.state.player.trb / this.state.player.mpg * 32,
      0
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
    var ft = this.getGrade(highFT, this.state.player.freeThrowPct, 0.4);
    var threePoint = this.getGrade(
      highThree,
      this.state.player.threePtPct,
      0.2
    );
    var fg = this.getGrade(highFg, this.state.player.fgPct, 0.25);
    var twoPoint = this.getGrade(highTwo, this.state.player.twoPtPct, 0.2);
    this.setState({
      scoring: scoring,
      ast: ast,
      reb: reb,
      stl: stl,
      blk: blk,
      ft: ft,
      threePoint: threePoint,
      twoPoint: twoPoint,
      fg: fg
    });
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

  render() {
    return (
      <tr
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white"
        }}
      >
        <td>
          <a href={`/college-player/${this.props.player.id}`}>
            <span style={{ color: "white" }}>{this.props.player.name}</span>
          </a>
        </td>
        <td>{this.props.player.position}</td>
        <td>{this.props.player.gamesPlayed}</td>
        <td
          style={{
            color: this.props.player.Grades.fg.Color,
            fontWeight: "bold"
          }}
        >
          -
        </td>
        <td
          style={{
            color: this.props.player.Grades.threePoint.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.threePoint.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.twoPoint.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.twoPoint.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.ft.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.ft.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.orb.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.orb.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.drb.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.drb.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.reb.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.reb.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.ast.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.ast.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.stl.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.stl.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.blk.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.blk.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.tov.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.tov.Grade}
        </td>
        <td
          style={{
            color: this.props.player.Grades.scoring.Color,
            fontWeight: "bold"
          }}
        >
          {this.props.player.Grades.scoring.Grade}
        </td>
      </tr>
    );
  }
}
