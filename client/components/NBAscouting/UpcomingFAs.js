import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  FormGroup,
  Checkbox
} from "react-bootstrap";
import UpcomingFAListEntry from "./UpcomingFAListEntry";
import axios from "axios";

export default class UpcomingFAs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expiring: [],
      showFilter: false,
      pg: true,
      sg: true,
      sf: true,
      pf: true,
      c: true,
      mpg1: true,
      mpg2: true,
      mpg3: true,
      mpg4: true,
      mpg5: true,
      exp1: true,
      exp2: true,
      exp3: true,
      exp4: true,
      exp5: true,
      age1: true,
      age2: true,
      age3: true,
      age4: true,
      age5: true,
      type1: true,
      type2: true,
      type3: true,
      type4: true,
      type5: true
    };
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getExpiring = this.getExpiring.bind(this);
    //this.getPlayer = this.getPlayer.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.handlePG = this.handlePG.bind(this);
    this.handleSG = this.handleSG.bind(this);
    this.handleSF = this.handleSF.bind(this);
    this.handlePF = this.handlePF.bind(this);
    this.handleC = this.handleC.bind(this);
    this.handleMPG1 = this.handleMPG1.bind(this);
    this.handleMPG2 = this.handleMPG2.bind(this);
    this.handleMPG3 = this.handleMPG3.bind(this);
    this.handleMPG4 = this.handleMPG4.bind(this);
    this.handleMPG5 = this.handleMPG5.bind(this);
    this.handleEXP1 = this.handleEXP1.bind(this);
    this.handleEXP2 = this.handleEXP2.bind(this);
    this.handleEXP3 = this.handleEXP3.bind(this);
    this.handleEXP4 = this.handleEXP4.bind(this);
    this.handleEXP5 = this.handleEXP5.bind(this);
    this.handleAGE1 = this.handleAGE1.bind(this);
    this.handleAGE2 = this.handleAGE2.bind(this);
    this.handleAGE3 = this.handleAGE3.bind(this);
    this.handleAGE4 = this.handleAGE4.bind(this);
    this.handleAGE5 = this.handleAGE5.bind(this);
    this.handleTYPE1 = this.handleTYPE1.bind(this);
    this.handleTYPE2 = this.handleTYPE2.bind(this);
    this.handleTYPE3 = this.handleTYPE3.bind(this);
    this.handleTYPE4 = this.handleTYPE4.bind(this);
    this.handleTYPE5 = this.handleTYPE5.bind(this);
  }

  componentDidMount() {
    if (this.props.contracts) {
      this.getExpiring();
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.contracts) {
  //     this.getExpiring();
  //   }
  // }

  renderPlayers() {
    if (this.state.expiring.length > 0) {
      return this.state.expiring.map((player, i) => (
        <UpcomingFAListEntry
          player={player}
          key={i}
          unrestricted={this.state.type1}
          restricted={this.state.type2}
          playerOption={this.state.type3}
          pg={this.state.pg}
          sg={this.state.sg}
          sf={this.state.sf}
          pf={this.state.pf}
          c={this.state.c}
        />
      ));
    }
  }

  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  handleFilterSubmit() {
    this.getExpiring();
  }

  handlePG(evt) {
    this.setState({ pg: evt.target.checked }, () => {
      console.log(this.state.pg);
    });
  }

  handleSG(evt) {
    this.setState({ sg: evt.target.checked }, () => {
      console.log(this.state.sg);
    });
  }

  handleSF(evt) {
    this.setState({ sf: evt.target.checked }, () => {
      console.log(this.state.sf);
    });
  }

  handlePF(evt) {
    this.setState({ pf: evt.target.checked }, () => {
      console.log(this.state.pf);
    });
  }

  handleC(evt) {
    this.setState({ c: evt.target.checked }, () => {
      console.log(this.state.c);
    });
  }

  handleMPG1(evt) {
    this.setState({ mpg1: evt.target.checked });
  }
  handleMPG2(evt) {
    this.setState({ mpg2: evt.target.checked });
  }
  handleMPG3(evt) {
    this.setState({ mpg3: evt.target.checked });
  }
  handleMPG4(evt) {
    this.setState({ mpg4: evt.target.checked });
  }
  handleMPG5(evt) {
    this.setState({ mpg5: evt.target.checked });
  }

  handleEXP1(evt) {
    this.setState({ exp1: evt.target.checked });
  }
  handleEXP2(evt) {
    this.setState({ exp2: evt.target.checked });
  }
  handleEXP3(evt) {
    this.setState({ exp3: evt.target.checked });
  }
  handleEXP4(evt) {
    this.setState({ exp4: evt.target.checked });
  }
  handleEXP5(evt) {
    this.setState({ exp5: evt.target.checked });
  }

  handleAGE1(evt) {
    this.setState({ age1: evt.target.checked });
  }
  handleAGE2(evt) {
    this.setState({ age2: evt.target.checked });
  }
  handleAGE3(evt) {
    this.setState({ age3: evt.target.checked });
  }
  handleAGE4(evt) {
    this.setState({ age4: evt.target.checked });
  }
  handleAGE5(evt) {
    this.setState({ age5: evt.target.checked });
  }

  handleTYPE1(evt) {
    this.setState({ type1: evt.target.checked });
  }
  handleTYPE2(evt) {
    this.setState({ type2: evt.target.checked });
  }
  handleTYPE3(evt) {
    this.setState({ type3: evt.target.checked });
  }
  handleTYPE4(evt) {
    this.setState({ type4: evt.target.checked });
  }
  handleTYPE5(evt) {
    this.setState({ type5: evt.target.checked });
  }

  renderFilter() {
    if (this.state.showFilter) {
      return (
        <div style={{ height: "100px" }}>
          <Col lg={3} md={3} mdOffset={0}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Position
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.pg} onChange={this.handlePG}>
                Point Guard
              </Checkbox>{" "}
              <Checkbox checked={this.state.sg} onChange={this.handleSG}>
                Shooting Guard
              </Checkbox>{" "}
              <Checkbox checked={this.state.sf} onChange={this.handleSF}>
                Shooting Forward
              </Checkbox>{" "}
              <Checkbox checked={this.state.pf} onChange={this.handlePF}>
                Power Forward
              </Checkbox>{" "}
              <Checkbox checked={this.state.c} onChange={this.handleC}>
                Center
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2} md={2}>
            <div style={{ paddingLeft: "30px" }}>
              <div style={{ color: "#d00000", textDecoration: "underline" }}>
                MPG
              </div>
              <FormGroup style={{ paddingLeft: "10px" }}>
                <Checkbox
                  checked={this.state.mpg1}
                  onChange={this.handleMPG1}
                  disabled
                >
                  &#60; 15
                </Checkbox>{" "}
                <Checkbox
                  checked={this.state.mpg2}
                  onChange={this.handleMPG2}
                  disabled
                >
                  15-20
                </Checkbox>{" "}
                <Checkbox
                  checked={this.state.mpg3}
                  onChange={this.handleMPG3}
                  disabled
                >
                  20-25
                </Checkbox>{" "}
                <Checkbox
                  checked={this.state.mpg4}
                  onChange={this.handleMPG4}
                  disabled
                >
                  25-30
                </Checkbox>{" "}
                <Checkbox
                  checked={this.state.mpg5}
                  onChange={this.handleMPG5}
                  disabled
                >
                  > 30
                </Checkbox>
              </FormGroup>
            </div>
          </Col>
          <Col lg={2} md={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Experience
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox
                checked={this.state.exp1}
                onChange={this.handleEXP1}
                disabled
              >
                Rookie
              </Checkbox>{" "}
              <Checkbox
                checked={this.state.exp2}
                onChange={this.handleEXP2}
                disabled
              >
                1-3
              </Checkbox>{" "}
              <Checkbox
                checked={this.state.exp3}
                onChange={this.handleEXP3}
                disabled
              >
                4-6
              </Checkbox>{" "}
              <Checkbox
                checked={this.state.exp4}
                onChange={this.handleEXP4}
                disabled
              >
                7-10
              </Checkbox>{" "}
              <Checkbox
                checked={this.state.exp5}
                onChange={this.handleEXP5}
                disabled
              >
                > 10
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2} md={2}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              Age
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox
                checked={this.state.age1}
                onChange={this.handleAGE1}
                disabled
              >
                &#60; 21
              </Checkbox>{" "}
              <Checkbox
                checked={this.state.age2}
                onChange={this.handleAGE2}
                disabled
              >
                21-25
              </Checkbox>{" "}
              <Checkbox
                checked={this.state.age3}
                onChange={this.handleAGE3}
                disabled
              >
                26-30
              </Checkbox>{" "}
              <Checkbox
                checked={this.state.age4}
                onChange={this.handleAGE4}
                disabled
              >
                31-35
              </Checkbox>{" "}
              <Checkbox
                checked={this.state.age5}
                onChange={this.handleAGE5}
                disabled
              >
                > 35
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={3} md={3}>
            <div style={{ color: "#d00000", textDecoration: "underline" }}>
              FA Type
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.type1} onChange={this.handleTYPE1}>
                Unrestricted
              </Checkbox>{" "}
              <Checkbox checked={this.state.type2} onChange={this.handleTYPE2}>
                Restricted
              </Checkbox>{" "}
              <Checkbox checked={this.state.type3} onChange={this.handleTYPE3}>
                Player Option
              </Checkbox>
            </FormGroup>
          </Col>
        </div>
      );
    }
  }

  getExpiring() {
    var arr = [];
    var contracts = this.props.contracts;
    if (contracts.length > 0) {
      // Loop through contracts
      for (var i = 0; i < contracts.length; i++) {
        // Check if contract is expiring
        if (
          (contracts[i].yearTwo === "" ||
            contracts[i].yearTwoOption === "Player") &&
          contracts[i].yearOne !== "TBD"
        ) {
          // For every expiring contract create player object with FA type and current salary
          var player = {};
          if (contracts[i].signedUsing === "1st Round Pick") {
            player.name = contracts[i].name;
            player.team = contracts[i].team;
            player.current = contracts[i].yearOne;
            player.type = "Restricted";
          } else if (contracts[i].yearTwoOption === "Player") {
            player.name = contracts[i].name;
            player.team = contracts[i].team;
            player.current = contracts[i].yearOne;
            player.type = "Player Option";
          } else {
            player.name = contracts[i].name;
            player.team = contracts[i].team;
            player.current = contracts[i].yearOne;
            player.type = "Unrestricted";
          }
          //console.log("FREE AGENT: ", player);
          arr.push(player);
        }
      }
      this.setState({ expiring: arr });
    }
  }

  // getPlayer(name) {
  //   return axios
  //     .get(`/api/teams/getPlayer/${name}`)
  //     .then(data => {
  //       var player = data.data;
  //       return player;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    var headerStyle = {
      backgroundColor: "#d00000",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    return (
      <div>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={3} lgOffset={1} md={4}>
            <div className="card" style={headerStyle}>
              Upcoming FAs
            </div>
          </Col>
          <Col lg={1} lgOffset={6}>
            <div
              onClick={this.toggleFilter}
              style={{
                color: "#d00000",
                textDecoration: "underline",
                fontSize: "16px",
                cursor: "pointer",
                paddingTop: "20px"
              }}
            >
              Filter
            </div>
          </Col>
          <Col lg={10} lgOffset={1} style={{ paddingTop: "20px" }}>
            {this.renderFilter()}
          </Col>
        </Row>
        <Row style={{ paddingTop: "15px" }}>
          <Col lg={10} lgOffset={1} md={12}>
            {this.renderPlayers()}
          </Col>
        </Row>
      </div>
    );
  }
}
