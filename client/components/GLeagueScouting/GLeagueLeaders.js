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
  Checkbox,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import axios from "axios";
import GLeagueLeadersTable4 from "./GLeagueLeadersTable4";
import GLeagueLeadersTable5 from "./GLeagueLeadersTable5";
import GLeagueLeadersTable6 from "./GLeagueLeadersTable6";
import GLeagueLeadersTable7 from "./GLeagueLeadersTable7";
import GLeagueLeadersTable8 from "./GLeagueLeadersTable8";
import GLeagueLeadersTable9 from "./GLeagueLeadersTable9";
import GLeagueLeadersOverallTable from "./GLeagueLeadersOverallTable";
import GLeagueLeadersOffenseTable from "./GLeagueLeadersOffenseTable";
import GLeagueLeadersDefenseTable from "./GLeagueLeadersDefenseTable";

export default class GLeagueLeaders extends React.Component {
  constructor() {
    super();
    this.state = {
      table4: [],
      showFilter: false,
      g: true,
      f: true,
      c: true,
      mpg1: false,
      mpg2: false,
      mpg3: false,
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
      sal1: true,
      sal2: true,
      sal3: true,
      sal4: true,
      sal5: true,
      table4stat: "pts",
      table5stat: "trb",
      table6stat: "ast",
      table7stat: "pts",
      table8stat: "trb",
      table9stat: "ast"
    };
    this.rankOverall = this.rankOverall.bind(this);
    this.rankOffense = this.rankOffense.bind(this);
    this.rankDefense = this.rankDefense.bind(this);
    this.rankPoints = this.rankPoints.bind(this);
    this.rankRebounds = this.rankRebounds.bind(this);
    this.rankAssists = this.rankAssists.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.renderFilter = this.renderFilter.bind(this);
    this.handlePG = this.handlePG.bind(this);
    this.handleSF = this.handleSF.bind(this);
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
    this.handleSAL1 = this.handleSAL1.bind(this);
    this.handleSAL2 = this.handleSAL2.bind(this);
    this.handleSAL3 = this.handleSAL3.bind(this);
    this.handleSAL4 = this.handleSAL4.bind(this);
    this.handleSAL5 = this.handleSAL5.bind(this);
    this.filterPlayers = this.filterPlayers.bind(this);
    this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
    this.selectStat4 = this.selectStat4.bind(this);
    this.selectStat5 = this.selectStat5.bind(this);
    this.selectStat6 = this.selectStat6.bind(this);
    this.selectStat7 = this.selectStat7.bind(this);
    this.selectStat8 = this.selectStat8.bind(this);
    this.selectStat9 = this.selectStat9.bind(this);
  }

  componentDidMount() {
    this.setState(
      {
        players: this.props.players
      },
      () => {
        this.rankOverall();
        this.rankOffense();
        this.rankDefense();
        this.rankPoints();
        this.rankRebounds();
        this.rankAssists();
        this.filterPlayers();
      }
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.players) {
      this.setState(
        {
          players: nextProps.players
        },
        () => {
          this.rankOverall();
          this.rankOffense();
          this.rankDefense();
          this.rankPoints();
          this.rankRebounds();
          this.rankAssists();
          this.filterPlayers();
        }
      );
    }
  }

  rankOverall() {
    let players = this.state.players;
  }

  rankOffense() {}

  rankDefense() {}

  rankPoints() {
    let players = this.state.players;
    players.sort(
      function(a, b) {
        return parseFloat(b.pts) - parseFloat(a.pts);
      },
      () => {
        this.setState({ table4: players });
      }
    );
  }

  rankRebounds() {}

  rankAssists() {}

  toggleFilter() {
    this.setState({ showFilter: !this.state.showFilter });
  }

  handlePG(evt) {
    this.setState({ g: evt.target.checked }, () => {
      console.log(this.state.g);
    });
  }

  handleSF(evt) {
    this.setState({ f: evt.target.checked }, () => {
      console.log(this.state.f);
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

  handleSAL1(evt) {
    this.setState({ sal1: evt.target.checked });
  }
  handleSAL2(evt) {
    this.setState({ sal2: evt.target.checked });
  }
  handleSAL3(evt) {
    this.setState({ sal3: evt.target.checked });
  }
  handleSAL4(evt) {
    this.setState({ sal4: evt.target.checked });
  }
  handleSAL5(evt) {
    this.setState({ sal5: evt.target.checked });
  }

  filterPlayers() {
    var playersArr = this.props.players;
    if (!this.state.g) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "G";
      });
    }
    if (!this.state.f) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "F";
      });
    }
    if (!this.state.c) {
      playersArr = playersArr.filter(function(player) {
        return player.position !== "C";
      });
    }

    if (!this.state.mpg1) {
      playersArr = playersArr.filter(function(player) {
        return player.mpg >= 15.0;
      });
    }
    if (!this.state.mpg2) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 15.0 || player.mpg >= 20.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg3) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 20.0 || player.mpg >= 25.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg4) {
      playersArr = playersArr.filter(function(player) {
        if (player.mpg < 25.0 || player.mpg >= 30.0) {
          return player;
        }
      });
    }
    if (!this.state.mpg5) {
      playersArr = playersArr.filter(function(player) {
        return player.mpg < 30.0;
      });
    }

    if (!this.state.exp1) {
      playersArr = playersArr.filter(function(player) {
        return player.experience !== "R";
      });
    }
    if (!this.state.exp2) {
      playersArr = playersArr.filter(function(player) {
        if (player.experience === "R" || player.experience > 3) {
          return player;
        }
      });
    }
    if (!this.state.exp3) {
      playersArr = playersArr.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 4 ||
          player.experience > 6
        ) {
          return player;
        }
      });
    }
    if (!this.state.exp4) {
      playersArr = playersArr.filter(function(player) {
        if (
          player.experience === "R" ||
          player.experience < 7 ||
          player.experience > 10
        ) {
          return player;
        }
      });
    }
    if (!this.state.exp5) {
      playersArr = playersArr.filter(function(player) {
        if (player.experience === "R" || player.experience < 11) {
          return player;
        }
      });
    }

    if (!this.state.age1) {
      playersArr = playersArr.filter(function(player) {
        return player.age >= 21;
      });
    }
    if (!this.state.age2) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 21 || player.age > 25.0) {
          return player;
        }
      });
    }
    if (!this.state.age3) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 26 || player.age > 30) {
          return player;
        }
      });
    }
    if (!this.state.age4) {
      playersArr = playersArr.filter(function(player) {
        if (player.age < 31 || player.age > 35) {
          return player;
        }
      });
    }
    if (!this.state.age5) {
      playersArr = playersArr.filter(function(player) {
        return player.age < 35;
      });
    }

    if (!this.state.sal1) {
      playersArr = playersArr.filter(function(player) {
        return player.salary >= 5000000;
      });
    }
    if (!this.state.sal2) {
      playersArr = playersArr.filter(function(player) {
        if (player.salary < 5000000 || player.salary >= 10000000) {
          return player;
        }
      });
    }
    if (!this.state.sal3) {
      playersArr = playersArr.filter(function(player) {
        if (player.salary < 10000000 || player.salary >= 15000000) {
          return player;
        }
      });
    }
    if (!this.state.sal4) {
      playersArr = playersArr.filter(function(player) {
        if (player.salary < 15000000 || player.salary >= 20000000) {
          return player;
        }
      });
    }
    if (!this.state.sal5) {
      playersArr = playersArr.filter(function(player) {
        return player.salary < 20000000;
      });
    }
    this.setState({ players: playersArr });
  }

  handleFilterSubmit() {
    this.filterPlayers();
  }

  renderFilter() {
    if (this.state.showFilter) {
      return (
        <div style={{ height: "100px", color: "white" }}>
          <Col lg={2} lgOffset={1} md={3} mdOffset={0}>
            <div style={{ color: "#303030", textDecoration: "underline" }}>
              Position
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.g} onChange={this.handlePG}>
                Guard
              </Checkbox>{" "}
              <Checkbox checked={this.state.f} onChange={this.handleSF}>
                Forward
              </Checkbox>{" "}
              <Checkbox checked={this.state.c} onChange={this.handleC}>
                Center
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2} md={2}>
            <div style={{ paddingLeft: "30px" }}>
              <div style={{ color: "#303030", textDecoration: "underline" }}>
                MPG
              </div>
              <FormGroup style={{ paddingLeft: "10px" }}>
                <Checkbox checked={this.state.mpg1} onChange={this.handleMPG1}>
                  &#60; 15
                </Checkbox>{" "}
                <Checkbox checked={this.state.mpg2} onChange={this.handleMPG2}>
                  15-20
                </Checkbox>{" "}
                <Checkbox checked={this.state.mpg3} onChange={this.handleMPG3}>
                  20-25
                </Checkbox>{" "}
                <Checkbox checked={this.state.mpg4} onChange={this.handleMPG4}>
                  25-30
                </Checkbox>{" "}
                <Checkbox checked={this.state.mpg5} onChange={this.handleMPG5}>
                  > 30
                </Checkbox>
              </FormGroup>
            </div>
          </Col>
          <Col lg={2} md={2}>
            <div style={{ color: "#303030", textDecoration: "underline" }}>
              Experience
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.exp1} onChange={this.handleEXP1}>
                Rookie
              </Checkbox>{" "}
              <Checkbox checked={this.state.exp2} onChange={this.handleEXP2}>
                1-3
              </Checkbox>{" "}
              <Checkbox checked={this.state.exp3} onChange={this.handleEXP3}>
                4-6
              </Checkbox>{" "}
              <Checkbox checked={this.state.exp4} onChange={this.handleEXP4}>
                7-10
              </Checkbox>{" "}
              <Checkbox checked={this.state.exp5} onChange={this.handleEXP5}>
                > 10
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={2} md={2}>
            <div style={{ color: "#303030", textDecoration: "underline" }}>
              Age
            </div>
            <FormGroup style={{ paddingLeft: "10px" }}>
              <Checkbox checked={this.state.age1} onChange={this.handleAGE1}>
                &#60; 21
              </Checkbox>{" "}
              <Checkbox checked={this.state.age2} onChange={this.handleAGE2}>
                21-25
              </Checkbox>{" "}
              <Checkbox checked={this.state.age3} onChange={this.handleAGE3}>
                26-30
              </Checkbox>{" "}
              <Checkbox checked={this.state.age4} onChange={this.handleAGE4}>
                31-35
              </Checkbox>{" "}
              <Checkbox checked={this.state.age5} onChange={this.handleAGE5}>
                > 35
              </Checkbox>
            </FormGroup>
          </Col>
          <Col lg={4} md={4}>
            <div>
              <Button
                onClick={this.handleFilterSubmit}
                style={{ backgroundColor: "#303030", color: "white" }}
              >
                Filter
              </Button>
            </div>
          </Col>
        </div>
      );
    }
  }

  selectStat4(evt, eventKey) {
    this.setState({ table4stat: eventKey.target.innerHTML });
  }

  selectStat5(evt, eventKey) {
    this.setState({ table5stat: eventKey.target.innerHTML });
  }

  selectStat6(evt, eventKey) {
    this.setState({ table6stat: eventKey.target.innerHTML });
  }

  selectStat7(evt, eventKey) {
    this.setState({ table7stat: eventKey.target.innerHTML });
  }

  selectStat8(evt, eventKey) {
    this.setState({ table8stat: eventKey.target.innerHTML });
  }

  selectStat9(evt, eventKey) {
    this.setState({ table9stat: eventKey.target.innerHTML });
  }

  render() {
    var headerStyle = {
      backgroundColor: "#3f336d",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    var statLabels = {
      backgroundColor: "#3f336d",
      color: "#fff",
      textAlign: "center",
      fontSize: "20px",
      borderRadius: "0px",
      width: "80px",
      marginBottom: "3px",
      border: "none",
      paddingLeft: "0px"
    };
    return (
      <div>
        <Row style={{ paddingLeft: "20px", paddingTop: "30px" }}>
          <Col lg={10}>
            <div
              onClick={this.toggleFilter}
              style={{
                color: "white",
                textDecoration: "underline",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Filter
            </div>
          </Col>
          <Col lg={12} style={{ paddingTop: "20px" }}>
            {this.renderFilter()}
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px", paddingLeft: "10px" }}>
          <Col lg={3} md={3}>
            <div className="card" style={headerStyle}>
              Overall
            </div>
          </Col>
          <Col lg={3} lgOffset={1} mdOffset={1} md={3}>
            <div className="card" style={headerStyle}>
              Offense
            </div>
          </Col>
          <Col lg={3} lgOffset={1} mdOffset={1} md={3}>
            <div className="card" style={headerStyle}>
              Defense
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "40px",
            paddingLeft: "10px",
            paddingRight: "10px"
          }}
        >
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersOverallTable players={this.state.players} />
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersOffenseTable players={this.state.players} />
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersDefenseTable players={this.state.players} />
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "60px", paddingLeft: "10px" }}>
          <Col lg={3} md={3}>
            <div className="card" style={headerStyle}>
              <DropdownButton
                title={this.state.table4stat.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectStat4}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">pts</MenuItem>
                <MenuItem eventKey="2">ast</MenuItem>
                <MenuItem eventKey="20">tov</MenuItem>
                <MenuItem eventKey="25">astPct</MenuItem>
                <MenuItem eventKey="26">tovPct</MenuItem>
                <MenuItem eventKey="30">usgPct</MenuItem>
                <MenuItem eventKey="34">ftr</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="7">fgm</MenuItem>
                <MenuItem eventKey="8">fga</MenuItem>
                <MenuItem eventKey="9">fgPct</MenuItem>
                <MenuItem eventKey="10">threePt</MenuItem>
                <MenuItem eventKey="11">threePtAtt</MenuItem>
                <MenuItem eventKey="12">twoPt</MenuItem>
                <MenuItem eventKey="13">twoPtAtt</MenuItem>
                <MenuItem eventKey="14">twoPtPct</MenuItem>
                <MenuItem eventKey="15">threePtPct</MenuItem>
                <MenuItem eventKey="16">ft</MenuItem>
                <MenuItem eventKey="17">fta</MenuItem>
                <MenuItem eventKey="18">freeThrowPct</MenuItem>
                <MenuItem eventKey="19">efgPct</MenuItem>
                <MenuItem eventKey="32">tsPct</MenuItem>
                <MenuItem eventKey="33">threePAr</MenuItem>
                <MenuItem divider />
                <MenuItem header>Rebounding</MenuItem>
                <MenuItem eventKey="3">trb</MenuItem>
                <MenuItem eventKey="21">orb</MenuItem>
                <MenuItem eventKey="22">drb</MenuItem>
                <MenuItem eventKey="24">orbPct</MenuItem>
                <MenuItem eventKey="27">drbPct</MenuItem>
                <MenuItem eventKey="31">trbPct</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">stl</MenuItem>
                <MenuItem eventKey="6">blk</MenuItem>
                <MenuItem eventKey="28">stlPct</MenuItem>
                <MenuItem eventKey="29">blkPct</MenuItem>
                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>
                <MenuItem eventKey="4">mpg</MenuItem>
                <MenuItem eventKey="23">pf</MenuItem>
                <MenuItem eventKey="35">per</MenuItem>
                <MenuItem eventKey="36">ows</MenuItem>
                <MenuItem eventKey="37">dws</MenuItem>
                <MenuItem eventKey="38">bpm</MenuItem>
                <MenuItem eventKey="39">ws</MenuItem>
                <MenuItem eventKey="40">obpm</MenuItem>
                <MenuItem eventKey="41">dbpm</MenuItem>
                <MenuItem eventKey="42">wsFourtyEight</MenuItem>
                <MenuItem eventKey="43">vorp</MenuItem>
              </DropdownButton>
            </div>
          </Col>
          <Col lg={3} lgOffset={1} mdOffset={1} md={3}>
            <div className="card" style={headerStyle}>
              <DropdownButton
                title={this.state.table5stat.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectStat5}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">pts</MenuItem>
                <MenuItem eventKey="2">ast</MenuItem>
                <MenuItem eventKey="20">tov</MenuItem>
                <MenuItem eventKey="25">astPct</MenuItem>
                <MenuItem eventKey="26">tovPct</MenuItem>
                <MenuItem eventKey="30">usgPct</MenuItem>
                <MenuItem eventKey="34">ftr</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="7">fgm</MenuItem>
                <MenuItem eventKey="8">fga</MenuItem>
                <MenuItem eventKey="9">fgPct</MenuItem>
                <MenuItem eventKey="10">threePt</MenuItem>
                <MenuItem eventKey="11">threePtAtt</MenuItem>
                <MenuItem eventKey="12">twoPt</MenuItem>
                <MenuItem eventKey="13">twoPtAtt</MenuItem>
                <MenuItem eventKey="14">twoPtPct</MenuItem>
                <MenuItem eventKey="15">threePtPct</MenuItem>
                <MenuItem eventKey="16">ft</MenuItem>
                <MenuItem eventKey="17">fta</MenuItem>
                <MenuItem eventKey="18">freeThrowPct</MenuItem>
                <MenuItem eventKey="19">efgPct</MenuItem>
                <MenuItem eventKey="32">tsPct</MenuItem>
                <MenuItem eventKey="33">threePAr</MenuItem>
                <MenuItem divider />
                <MenuItem header>Rebounding</MenuItem>
                <MenuItem eventKey="3">trb</MenuItem>
                <MenuItem eventKey="21">orb</MenuItem>
                <MenuItem eventKey="22">drb</MenuItem>
                <MenuItem eventKey="24">orbPct</MenuItem>
                <MenuItem eventKey="27">drbPct</MenuItem>
                <MenuItem eventKey="31">trbPct</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">stl</MenuItem>
                <MenuItem eventKey="6">blk</MenuItem>
                <MenuItem eventKey="28">stlPct</MenuItem>
                <MenuItem eventKey="29">blkPct</MenuItem>
                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>
                <MenuItem eventKey="4">mpg</MenuItem>
                <MenuItem eventKey="23">pf</MenuItem>
                <MenuItem eventKey="35">per</MenuItem>
                <MenuItem eventKey="36">ows</MenuItem>
                <MenuItem eventKey="37">dws</MenuItem>
                <MenuItem eventKey="38">bpm</MenuItem>
                <MenuItem eventKey="39">ws</MenuItem>
                <MenuItem eventKey="40">obpm</MenuItem>
                <MenuItem eventKey="41">dbpm</MenuItem>
                <MenuItem eventKey="42">wsFourtyEight</MenuItem>
                <MenuItem eventKey="43">vorp</MenuItem>
              </DropdownButton>
            </div>
          </Col>
          <Col lg={3} lgOffset={1} mdOffset={1} md={3}>
            <div className="card" style={headerStyle}>
              <DropdownButton
                title={this.state.table6stat.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectStat6}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">pts</MenuItem>
                <MenuItem eventKey="2">ast</MenuItem>
                <MenuItem eventKey="20">tov</MenuItem>
                <MenuItem eventKey="25">astPct</MenuItem>
                <MenuItem eventKey="26">tovPct</MenuItem>
                <MenuItem eventKey="30">usgPct</MenuItem>
                <MenuItem eventKey="34">ftr</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="7">fgm</MenuItem>
                <MenuItem eventKey="8">fga</MenuItem>
                <MenuItem eventKey="9">fgPct</MenuItem>
                <MenuItem eventKey="10">threePt</MenuItem>
                <MenuItem eventKey="11">threePtAtt</MenuItem>
                <MenuItem eventKey="12">twoPt</MenuItem>
                <MenuItem eventKey="13">twoPtAtt</MenuItem>
                <MenuItem eventKey="14">twoPtPct</MenuItem>
                <MenuItem eventKey="15">threePtPct</MenuItem>
                <MenuItem eventKey="16">ft</MenuItem>
                <MenuItem eventKey="17">fta</MenuItem>
                <MenuItem eventKey="18">freeThrowPct</MenuItem>
                <MenuItem eventKey="19">efgPct</MenuItem>
                <MenuItem eventKey="32">tsPct</MenuItem>
                <MenuItem eventKey="33">threePAr</MenuItem>
                <MenuItem divider />
                <MenuItem header>Rebounding</MenuItem>
                <MenuItem eventKey="3">trb</MenuItem>
                <MenuItem eventKey="21">orb</MenuItem>
                <MenuItem eventKey="22">drb</MenuItem>
                <MenuItem eventKey="24">orbPct</MenuItem>
                <MenuItem eventKey="27">drbPct</MenuItem>
                <MenuItem eventKey="31">trbPct</MenuItem>
                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">stl</MenuItem>
                <MenuItem eventKey="6">blk</MenuItem>
                <MenuItem eventKey="28">stlPct</MenuItem>
                <MenuItem eventKey="29">blkPct</MenuItem>
                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>
                <MenuItem eventKey="4">mpg</MenuItem>
                <MenuItem eventKey="23">pf</MenuItem>
                <MenuItem eventKey="35">per</MenuItem>
                <MenuItem eventKey="36">ows</MenuItem>
                <MenuItem eventKey="37">dws</MenuItem>
                <MenuItem eventKey="38">bpm</MenuItem>
                <MenuItem eventKey="39">ws</MenuItem>
                <MenuItem eventKey="40">obpm</MenuItem>
                <MenuItem eventKey="41">dbpm</MenuItem>
                <MenuItem eventKey="42">wsFourtyEight</MenuItem>
                <MenuItem eventKey="43">vorp</MenuItem>
              </DropdownButton>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "40px",
            paddingLeft: "10px",
            paddingRight: "10px"
          }}
        >
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersTable4
                players={this.state.players}
                stat={this.state.table4stat}
              />
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersTable5
                players={this.state.players}
                stat={this.state.table5stat}
              />
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersTable6
                players={this.state.players}
                stat={this.state.table6stat}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "60px" }}>
          <Col lg={12}>
            <div
              style={{
                paddingLeft: "20px",
                color: "#303030",
                fontSize: "18px",
                textDecoration: "underline"
              }}
            >
              Per 36 Minutes
            </div>
          </Col>
        </Row>
        <Row style={{ paddingTop: "40px", paddingLeft: "10px" }}>
          <Col lg={3} md={3}>
            <div className="card" style={headerStyle}>
              <DropdownButton
                title={this.state.table7stat.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectStat7}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">pts</MenuItem>
                <MenuItem eventKey="2">ast</MenuItem>
                <MenuItem eventKey="20">tov</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="7">fgm</MenuItem>
                <MenuItem eventKey="8">fga</MenuItem>

                <MenuItem eventKey="10">threePt</MenuItem>
                <MenuItem eventKey="11">threePtAtt</MenuItem>
                <MenuItem eventKey="12">twoPt</MenuItem>
                <MenuItem eventKey="13">twoPtAtt</MenuItem>

                <MenuItem eventKey="16">ft</MenuItem>
                <MenuItem eventKey="17">fta</MenuItem>

                <MenuItem divider />
                <MenuItem header>Rebounding</MenuItem>
                <MenuItem eventKey="3">trb</MenuItem>
                <MenuItem eventKey="21">orb</MenuItem>
                <MenuItem eventKey="22">drb</MenuItem>

                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">stl</MenuItem>
                <MenuItem eventKey="6">blk</MenuItem>

                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>

                <MenuItem eventKey="23">pf</MenuItem>
              </DropdownButton>
            </div>
          </Col>
          <Col lg={3} lgOffset={1} mdOffset={1} md={3}>
            <div className="card" style={headerStyle}>
              <DropdownButton
                title={this.state.table8stat.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectStat8}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">pts</MenuItem>
                <MenuItem eventKey="2">ast</MenuItem>
                <MenuItem eventKey="20">tov</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="7">fgm</MenuItem>
                <MenuItem eventKey="8">fga</MenuItem>

                <MenuItem eventKey="10">threePt</MenuItem>
                <MenuItem eventKey="11">threePtAtt</MenuItem>
                <MenuItem eventKey="12">twoPt</MenuItem>
                <MenuItem eventKey="13">twoPtAtt</MenuItem>

                <MenuItem eventKey="16">ft</MenuItem>
                <MenuItem eventKey="17">fta</MenuItem>

                <MenuItem divider />
                <MenuItem header>Rebounding</MenuItem>
                <MenuItem eventKey="3">trb</MenuItem>
                <MenuItem eventKey="21">orb</MenuItem>
                <MenuItem eventKey="22">drb</MenuItem>

                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">stl</MenuItem>
                <MenuItem eventKey="6">blk</MenuItem>

                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>

                <MenuItem eventKey="23">pf</MenuItem>
              </DropdownButton>
            </div>
          </Col>
          <Col lg={3} lgOffset={1} mdOffset={1} md={3}>
            <div className="card" style={headerStyle}>
              <DropdownButton
                title={this.state.table9stat.toUpperCase()}
                style={statLabels}
                className="card"
                onSelect={this.selectStat9}
              >
                <MenuItem header>Offense</MenuItem>
                <MenuItem eventKey="1">pts</MenuItem>
                <MenuItem eventKey="2">ast</MenuItem>
                <MenuItem eventKey="20">tov</MenuItem>
                <MenuItem divider />
                <MenuItem header>Shooting</MenuItem>
                <MenuItem eventKey="7">fgm</MenuItem>
                <MenuItem eventKey="8">fga</MenuItem>

                <MenuItem eventKey="10">threePt</MenuItem>
                <MenuItem eventKey="11">threePtAtt</MenuItem>
                <MenuItem eventKey="12">twoPt</MenuItem>
                <MenuItem eventKey="13">twoPtAtt</MenuItem>

                <MenuItem eventKey="16">ft</MenuItem>
                <MenuItem eventKey="17">fta</MenuItem>

                <MenuItem divider />
                <MenuItem header>Rebounding</MenuItem>
                <MenuItem eventKey="3">trb</MenuItem>
                <MenuItem eventKey="21">orb</MenuItem>
                <MenuItem eventKey="22">drb</MenuItem>

                <MenuItem divider />
                <MenuItem header>Defense</MenuItem>
                <MenuItem eventKey="5">stl</MenuItem>
                <MenuItem eventKey="6">blk</MenuItem>

                <MenuItem divider />
                <MenuItem header>Misc.</MenuItem>

                <MenuItem eventKey="23">pf</MenuItem>
              </DropdownButton>
            </div>
          </Col>
        </Row>
        <Row
          style={{
            paddingTop: "40px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "20px"
          }}
        >
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersTable7
                players={this.state.players}
                stat={this.state.table7stat}
              />
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersTable8
                players={this.state.players}
                stat={this.state.table8stat}
              />
            </div>
          </Col>
          <Col lg={4} md={4}>
            <div
              className="card"
              style={{
                height: "400px",
                backgroundColor: "white",
                overflow: "scroll"
              }}
            >
              <GLeagueLeadersTable9
                players={this.state.players}
                stat={this.state.table9stat}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
