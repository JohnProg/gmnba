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
import TeamContractListEntry from "./TeamContractListEntry";

export default class TeamContracts extends React.Component {
  constructor() {
    super();
    this.renderPlayers = this.renderPlayers.bind(this);
  }

  renderPlayers() {
    if (this.props.contracts) {
      return this.props.contracts.map((player, i) => (
        <TeamContractListEntry player={player} key={i} />
      ));
    }
  }

  render() {
    console.log(this.props.contracts);
    var headerStyle = {
      backgroundColor: this.props.team.Color_Main || "#eee",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: this.props.team.Color_Sec || "#000"
    };
    return (
      <div>
        <Grid>
          <Row className="chart-row">
            <Col lg={3} md={3} sm={4}>
              <div className="card header" style={headerStyle}>
                Team Contracts
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Col lg={12}>
              <div style={{ float: "right" }}>
                <span style={{ color: "green" }}>Team Option</span>
                <span style={{ color: "red", paddingLeft: "20px" }}>
                  Player Option
                </span>
                <span style={{ color: "blue", paddingLeft: "20px" }}>
                  Early Termination
                </span>
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "15px" }}>
            <Col lg={12}>
              <Table striped hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>2017-2018</th>
                    <th>2018-2019</th>
                    <th>2019-2020</th>
                    <th>2020-2021</th>
                    <th>2021-2022</th>
                    <th>2022-2023</th>
                    <th>Signed Using</th>
                    <th>Guaranteed</th>
                  </tr>
                </thead>
                <tbody>{this.renderPlayers()}</tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
