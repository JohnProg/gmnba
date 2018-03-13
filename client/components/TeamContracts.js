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
    this.state = {
      avgAge: 25
    };
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getAgeAvg = this.getAgeAvg.bind(this);
    this.getTotals = this.getTotals.bind(this);
  }

  componentDidMount() {
    this.getAgeAvg();
    this.getTotals();
  }

  renderPlayers() {
    if (this.props.contracts) {
      return this.props.contracts.map((player, i) => (
        <TeamContractListEntry player={player} key={i} />
      ));
    }
  }

  getAgeAvg() {
    var count = 0;
    for (var i = 0; i < this.props.contracts.length; i++) {
      count += parseInt(this.props.contracts[i].age);
    }
    var average = (count / this.props.contracts.length).toFixed(0);
    this.setState({ avgAge: average });
  }

  getTotals() {
    var countOne = 0;
    for (let i = 0; i < this.props.contracts.length; i++) {
      if (
        this.props.contracts[i].yearOne !== "TBD" &&
        this.props.contracts[i].yearOne !== ""
      ) {
        let arr = this.props.contracts[i].yearOne.split("");
        let nums = arr.slice(1, this.props.contracts[i].yearOne.length);
        let str = nums.join("");
        countOne += parseInt(str);
      }
    }
    var newStr = countOne.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.setState({ totalOne: newStr });

    var countTwo = 0;
    for (let i = 0; i < this.props.contracts.length; i++) {
      if (
        this.props.contracts[i].yearTwo !== "TBD" &&
        this.props.contracts[i].yearTwo !== ""
      ) {
        let arr = this.props.contracts[i].yearTwo.split("");
        let nums = arr.slice(1, this.props.contracts[i].yearTwo.length);
        let str = nums.join("");
        countTwo += parseInt(str);
      }
    }
    var ns2 = countTwo.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.setState({ totalTwo: ns2 });

    var countThree = 0;
    for (let i = 0; i < this.props.contracts.length; i++) {
      if (
        this.props.contracts[i].yearThird !== "TBD" &&
        this.props.contracts[i].yearThird !== ""
      ) {
        let arr = this.props.contracts[i].yearThird.split("");
        let nums = arr.slice(1, this.props.contracts[i].yearThird.length);
        let str = nums.join("");
        countThree += parseInt(str);
      }
    }
    var ns3 = countThree.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.setState({ totalThree: ns3 });

    var countFour = 0;
    for (let i = 0; i < this.props.contracts.length; i++) {
      if (
        this.props.contracts[i].yearFour !== "TBD" &&
        this.props.contracts[i].yearFour !== ""
      ) {
        let arr = this.props.contracts[i].yearFour.split("");
        let nums = arr.slice(1, this.props.contracts[i].yearFour.length);
        let str = nums.join("");
        countFour += parseInt(str);
      }
    }
    var ns4 = countFour.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.setState({ totalFour: ns4 });

    var countFive = 0;
    for (let i = 0; i < this.props.contracts.length; i++) {
      if (
        this.props.contracts[i].yearFive !== "TBD" &&
        this.props.contracts[i].yearFive !== ""
      ) {
        let arr = this.props.contracts[i].yearFive.split("");
        let nums = arr.slice(1, this.props.contracts[i].yearFive.length);
        let str = nums.join("");
        countFive += parseInt(str);
      }
    }
    var ns5 = countFive.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.setState({ totalFive: ns5 });

    var countSix = 0;
    for (let i = 0; i < this.props.contracts.length; i++) {
      if (
        this.props.contracts[i].yearSix !== "TBD" &&
        this.props.contracts[i].yearSix !== ""
      ) {
        let arr = this.props.contracts[i].yearSix.split("");
        let nums = arr.slice(1, this.props.contracts[i].yearSix.length);
        let str = nums.join("");
        countSix += parseInt(str);
      }
    }
    var ns6 = countSix.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.setState({ totalSix: ns6 });

    var countG = 0;
    for (let i = 0; i < this.props.contracts.length; i++) {
      if (
        this.props.contracts[i].guaranteed !== "TBD" &&
        this.props.contracts[i].guaranteed !== ""
      ) {
        let arr = this.props.contracts[i].guaranteed.split("");
        let nums = arr.slice(1, this.props.contracts[i].guaranteed.length);
        let str = nums.join("");
        countG += parseInt(str);
      }
    }
    var ns7 = countG.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    this.setState({ totalGuaranteed: ns7 });
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
                <tbody>
                  {this.renderPlayers()}
                  <tr>
                    <td style={{ fontWeight: "bold" }}>Totals</td>
                    <td style={{ fontWeight: "bold" }}>{this.state.avgAge}</td>
                    <td style={{ fontWeight: "bold" }}>
                      ${this.state.totalOne}
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      ${this.state.totalTwo}
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      ${this.state.totalThree}
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      ${this.state.totalFour}
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      ${this.state.totalFive}
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      ${this.state.totalSix}
                    </td>
                    <td style={{ fontWeight: "bold" }}>-</td>
                    <td style={{ fontWeight: "bold" }}>
                      ${this.state.totalGuaranteed}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
