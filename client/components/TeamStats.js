import React from "react";
import axios from "axios";
import { Col, Button, Well, Row, Grid, Table } from "react-bootstrap";

export default class TeamStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.team);
    var headerStyle = {
      lineHeight: "50px",
      backgroundColor: this.props.team.Color_Main,
      fontSize: "20px",
      paddingLeft: "15px",
      color: this.props.team.Color_Sec
    };
    var stat = this.props.team;
    return (
      <div>
        <Grid>
          <Row>
            <Col lg={12}>
              <div className="card">
                <div id="roster-header">
                  <div style={headerStyle}>2017-18 TEAM STATS</div>
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
                      <th>{parseInt(stat["W"]) + parseInt(stat["L"])}</th>
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
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className="card">
                <div id="roster-header">
                  <div style={headerStyle}>2017-18 TEAM ADVANCED STATS</div>
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
