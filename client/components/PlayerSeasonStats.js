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
                    <tr>
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
