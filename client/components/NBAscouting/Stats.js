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

export default class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers() {
    var sorted = [];
    if (this.props.players) {
      var players = this.props.players;
      sorted = players.sort(function(a, b) {
        return parseFloat(b.pts) - parseFloat(a.pts);
      });
    }
    return sorted.map((player, i) => (
      <StatsPlayerEntry player={player} key={i} />
    ));
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
              <Button
                style={{
                  borderRadius: "10px 0px 0px 10px",
                  backgroundColor: "#d00000",
                  color: "white",
                  width: "100px",
                  fontWeight: "bold"
                }}
              >
                Stats
              </Button>
            </span>
            <span>
              <Button
                style={{
                  borderRadius: "0px 10px 10px 0px",
                  backgroundColor: "#fff",
                  color: "#d00000",
                  width: "100px"
                }}
              >
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
                <thead>
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
                </thead>
                <tbody>{this.renderPlayers()}</tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
