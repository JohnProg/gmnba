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
  }

  componentDidMount() {}

  handleStatButton() {
    this.setState({ renderStats: true, renderRatings: false });
  }

  handleRatingButton() {
    this.setState({ renderRatings: true, renderStats: false });
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
      <div style={{ paddingRight: "20px" }}>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={12}>
            <div style={{ fontSize: "16px" }}>
              <Table striped hover responsive>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      color: this.props.colors.Color_Sec
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
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      backgroundColor: "rgba(0,0,0,0)",
                      color: "white"
                    }}
                  >
                    <th>{stat["gamesPlayed"]}</th>
                    <th>{stat["fgm"]}</th>
                    <th>{stat["fga"]}</th>
                    <th>{(stat["fgPct"] * 100).toFixed(1)}</th>
                    <th>{stat["threePt"]}</th>
                    <th>{stat["threePtAtt"]}</th>
                    <th>{(stat["threePtPct"] * 100).toFixed(1)}</th>
                    <th>{stat["twoPt"]}</th>
                    <th>{stat["twoPtAtt"]}</th>
                    <th>{(stat["twoPtPct"] * 100).toFixed(1)}</th>
                    <th>{stat["ft"]}</th>
                    <th>{stat["fta"]}</th>
                    <th>{(stat["freeThrowPct"] * 100).toFixed(1)}</th>
                    <th>{stat["orb"]}</th>
                    <th>{stat["drb"]}</th>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg={12}>
            <div style={{ fontSize: "16px" }}>
              <Table striped hover responsive>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      color: this.props.colors.Color_Sec
                    }}
                  >
                    <th>TRB</th>
                    <th>AST</th>
                    <th>STL</th>
                    <th>BLK</th>
                    <th>TOV</th>
                    <th>PF</th>
                    <th>PTS</th>
                    <th>AST%</th>
                    <th>BLK%</th>
                    <th>STL%</th>
                    <th>DRB%</th>
                    <th>ORB%</th>
                    <th>TRB%</th>
                    <th>eFG%</th>
                    <th>TOV%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      backgroundColor: "rgba(0,0,0,0)",
                      color: "white"
                    }}
                  >
                    <th>{stat["trb"]}</th>
                    <th>{stat["ast"]}</th>
                    <th>{stat["stl"]}</th>
                    <th>{stat["blk"]}</th>
                    <th>{stat["tov"]}</th>
                    <th>{stat["pf"]}</th>
                    <th>{stat["pts"]}</th>
                    <th>{stat["astPct"]}</th>
                    <th>{stat["blkPct"]}</th>
                    <th>{stat["stlPct"]}</th>
                    <th>{stat["drbPct"]}</th>
                    <th>{stat["orbPct"]}</th>
                    <th>{stat["trbPct"]}</th>
                    <th>{stat["efgPct"]}</th>
                    <th>{stat["tovPct"]}</th>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "10px" }}>
          <Col lg={12}>
            <div style={{ fontSize: "16px" }}>
              <Table striped hover responsive>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "rgba(0,0,0,0.8)",
                      color: this.props.colors.Color_Sec
                    }}
                  >
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
                  <tr
                    style={{
                      backgroundColor: "rgba(0,0,0,0)",
                      color: "white"
                    }}
                  >
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
      </div>
    );
  }
}
