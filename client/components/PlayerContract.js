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

export default class PlayerContract extends React.Component {
  constructor() {
    super();
    this.state = {
      yrTwoOption: "None",
      yrThreeOption: "None",
      yrFourOption: "None",
      yrFiveOption: "None",
      yrSixOption: "None"
    };
    this.renderSeasons = this.renderSeasons.bind(this);
    this.convertDollars = this.convertDollars.bind(this);
  }

  componentDidMount() {
    if (this.props.contract.yearTwoOption !== "None") {
      this.setState({ yrTwoOption: this.props.contract.yearTwoOption });
    }
    if (this.props.contract.yearThirdOption !== "None") {
      this.setState({ yrThreeOption: this.props.contract.yearThirdOption });
    }
    if (this.props.contract.yearFourOption !== "None") {
      this.setState({ yrFourOption: this.props.contract.yearFourOption });
    }
    if (this.props.contract.yearFiveOption !== "None") {
      this.setState({ yrFiveOption: this.props.contract.yearFiveOption });
    }
    if (this.props.contract.yearSixOption !== "None") {
      this.setState({ yrSixOption: this.props.contract.yearSixOption });
    }
  }

  convertDollars(value) {
    if (value === "TBD") return "TBD";
    if (value === "") return "-";
    var dollar;
    var arr = value.split("");
    var symbol = arr[0];
    var nums = arr.slice(1, value.length);
    var str = nums.join("");
    var newStr = str.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");

    return "$" + newStr;
  }

  renderSeasons() {
    var yrTwoHeader = {
      color: "black"
    };
    var yrThreeHeader = {
      color: "black"
    };
    var yrFourHeader = {
      color: "black"
    };
    var yrFiveHeader = {
      color: "black"
    };
    var yrSixHeader = {
      color: "black"
    };
    if (this.state.yrTwoOption === "Player") {
      yrTwoHeader = { color: "red" };
    }
    if (this.state.yrTwoOption === "Team") {
      yrTwoHeader = { color: "green" };
    }
    if (this.state.yrTwoOption === "Early Termination") {
      yrTwoHeader = { color: "blue" };
    }

    if (this.state.yrThreeOption === "Player") {
      yrThreeHeader = { color: "red" };
    }
    if (this.state.yrThreeOption === "Team") {
      yrThreeHeader = { color: "green" };
    }
    if (this.state.yrThreeOption === "Early Termination") {
      yrThreeHeader = { color: "blue" };
    }

    if (this.state.yrFourOption === "Player") {
      yrFourHeader = { color: "red" };
    }
    if (this.state.yrFourOption === "Team") {
      yrFourHeader = { color: "green" };
    }
    if (this.state.yrFourOption === "Early Termination") {
      yrFourHeader = { color: "blue" };
    }

    if (this.state.yrFiveOption === "Player") {
      yrFiveHeader = { color: "red" };
    }
    if (this.state.yrFiveOption === "Team") {
      yrFiveHeader = { color: "green" };
    }
    if (this.state.yrFiveOption === "Early Termination") {
      yrFiveHeader = { color: "blue" };
    }

    if (this.state.yrSixOption === "Player") {
      yrSixHeader = { color: "red" };
    }
    if (this.state.yrSixOption === "Team") {
      yrSixHeader = { color: "green" };
    }
    if (this.state.yrSixOption === "Early Termination") {
      yrSixHeader = { color: "blue" };
    }
    return (
      <tbody>
        <tr>
          <td>2017-2018</td>
          <td>{this.convertDollars(this.props.contract.yearOne)}</td>
          <td>{this.props.contract.signedUsing}</td>
          <td>{this.convertDollars(this.props.contract.guaranteed)}</td>
        </tr>
        <tr>
          <td>2018-2019</td>
          <td style={yrTwoHeader}>
            {this.convertDollars(this.props.contract.yearTwo)}
          </td>
        </tr>
        <tr>
          <td>2019-2020</td>
          <td style={yrThreeHeader}>
            {this.convertDollars(this.props.contract.yearThird)}
          </td>
        </tr>
        <tr>
          <td>2020-2021</td>
          <td style={yrFourHeader}>
            {this.convertDollars(this.props.contract.yearFour)}
          </td>
        </tr>
        <tr>
          <td>2021-2022</td>
          <td style={yrFiveHeader}>
            {this.convertDollars(this.props.contract.yearFive)}
          </td>
        </tr>
        <tr>
          <td>2022-2023</td>
          <td style={yrSixHeader}>
            {this.convertDollars(this.props.contract.yearSix)}
          </td>
        </tr>
      </tbody>
    );
  }

  render() {
    console.log(this.props.contract);
    var headerStyle = {
      backgroundColor: this.props.colors.Color_Main || "#eee",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: this.props.colors.Color_Sec || "#000"
    };
    return (
      <div>
        <Grid>
          <Row className="chart-row">
            <Col lg={3} lgOffset={1} md={3} sm={4}>
              <div className="card header" style={headerStyle}>
                Projected Salary
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Col lg={8} lgOffset={1} md={8} sm={8}>
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
          <Row style={{ marginBottom: "20px", paddingTop: "15px" }}>
            <Col lg={8} lgOffset={1} md={8} sm={8}>
              <div className="card" style={{ backgroundColor: "white" }}>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Season</th>
                      <th>{this.props.player.team}</th>
                      <th>Signed Using</th>
                      <th>Guaranteed</th>
                    </tr>
                  </thead>
                  {this.renderSeasons()}
                </Table>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}