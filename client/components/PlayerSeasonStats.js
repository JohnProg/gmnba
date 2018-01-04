import React from "react";
import axios from "axios";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";

export default class PlayerSeasonStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var headerStyle = {
      lineHeight: "50px",
      backgroundColor: this.props.colors.Color_Main,
      fontSize: "20px",
      paddingLeft: "15px",
      color: this.props.colors.Color_Sec
    };
    var stat = this.props.player;
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={12}>
              <div className="card">
                <div id="roster-header">
                  <div style={headerStyle}>2017-18 PLAYER STATS</div>
                </div>
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
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="card">
                <div id="roster-header">
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
