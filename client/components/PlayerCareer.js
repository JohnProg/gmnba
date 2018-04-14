import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import PlayerTimeline from "./PlayerTimeline";
import CareerProgression from "./CareerProgression";
import axios from "axios";

export default class PlayerCareer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      progStat: "Ovr/Off/Def"
    };
    this.getCareerStats = this.getCareerStats.bind(this);
    this.renderProgression = this.renderProgression.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
  }

  componentDidMount() {
    this.props.player.year = 2018;
    this.setState({ stats: [...this.state.stats, this.props.player] });
    this.getCareerStats(this.props.player.name);
  }

  getCareerStats(name) {
    axios.get(`/api/teams/getCareerStats/${name}`).then(data => {
      this.setState({ stats: [...this.state.stats, ...data.data] });
    });
  }

  selectStatCat(evt, eventKey) {
    this.setState({ progStat: eventKey.target.innerHTML });
  }

  renderProgression() {
    if (this.state.stats.length > 1) {
      return (
        <Row className="chart-row" style={{ paddingBottom: "40px" }}>
          <Col lg={12}>
            <div>
              <CareerProgression
                seasons={this.state.stats}
                statCat={this.state.progStat}
                colors={this.props.colors}
              />
            </div>
          </Col>
        </Row>
      );
    }
  }

  render() {
    var headerStyle = {
      backgroundColor: this.props.colors.Color_Main,
      height: "50px",
      lineHeight: "50px",
      fontSize: "20px",
      paddingLeft: "25px",
      color: this.props.colors.Color_Sec
    };
    return (
      <div>
        <Grid>
          <Row style={{ paddingTop: "40px" }}>
            <Col lg={3} md={4}>
              <div className="card" style={headerStyle}>
                CAREER RATINGS
              </div>
            </Col>
          </Row>
          <Row className="chart-row">
            <Col lg={12}>
              <div>
                <PlayerTimeline stats={this.state.stats} />
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "40px" }}>
            <Col lg={3} md={4}>
              <div className="card" style={headerStyle}>
                PROGRESSION
              </div>
            </Col>
            <Col lg={2} lgOffset={7} md={3} mdOffset={7}>
              <div className="stat-selector">
                <DropdownButton
                  pullRight
                  title={this.state.progStat}
                  className="card"
                  style={{
                    border: "none",
                    fontSize: "16px",
                    backgroundColor: this.props.colors.Color_Main,
                    marginTop: "20px",
                    color: this.props.colors.Color_Sec
                  }}
                  onSelect={this.selectStatCat}
                >
                  <MenuItem eventKey="1">Overall</MenuItem>
                  <MenuItem eventKey="2">Offense</MenuItem>
                  <MenuItem eventKey="3">Defense</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Offense</MenuItem>
                  <MenuItem eventKey="91">pts</MenuItem>
                  <MenuItem eventKey="92">ast</MenuItem>
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
                  <MenuItem eventKey="93">trb</MenuItem>
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
                  <MenuItem eventKey="84">gamesPlayed</MenuItem>
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
          {this.renderProgression()}
        </Grid>
      </div>
    );
  }
}
