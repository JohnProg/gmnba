import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Table,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import PlayerPolarColumn from "../PlayerPolarColumn";
import PlPolTest from "../CarouselCharts/PlPolTest";
import CarPolAdvOff from "../CarouselCharts/CarPolAdvOff";
import CarPolOff from "../CarouselCharts/CarPolOff";
import CarPolPRHandler from "../CarouselCharts/CarPolPRHandler";
import CarPolPRRollMan from "../CarouselCharts/CarPolPRRollMan";
import CarPolDef from "../CarouselCharts/CarPolDef";
import CarPolOvr from "../CarouselCharts/CarPolOvr";
import axios from "axios";

export default class CarouselItemNBA extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      statCat: "Basic",
      team: {}
    };
    this.checkLoad = this.checkLoad.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
    this.getTeamColors = this.getTeamColors.bind(this);
    this.renderLogo = this.renderLogo.bind(this);
  }

  componentDidMount() {
    this.getTeamColors(this.props.player.team);
    this.setState({ statCat: this.props.stat });
  }

  componentWillReceiveProps(nextProps) {
    this.getTeamColors(nextProps.player.team);
    this.setState({ statCat: nextProps.stat });
  }

  getTeamColors(team) {
    axios
      .get(`api/teams/getTeamColors/${team}`)
      .then(data => {
        this.setState({ team: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  checkLoad() {
    if (this.props.player) {
      if (this.state.statCat === "Basic") {
        return (
          <div>
            <PlPolTest player={this.props.player} name={this.props.name} />
          </div>
        );
      } else if (this.state.statCat === "Advanced Off") {
        return (
          <div>
            <CarPolAdvOff player={this.props.player} name={this.props.name} />
          </div>
        );
      } else if (this.state.statCat === "Offense") {
        return (
          <div>
            <CarPolOff player={this.props.player} name={this.props.name} />
          </div>
        );
      } else if (this.state.statCat === "P+R Ball Hand.") {
        return (
          <div>
            <CarPolPRHandler
              player={this.props.player}
              name={this.props.name}
            />
          </div>
        );
      } else if (this.state.statCat === "P+R Roll Man") {
        return (
          <div>
            <CarPolPRRollMan
              player={this.props.player}
              name={this.props.name}
            />
          </div>
        );
      } else if (this.state.statCat === "Defense") {
        return (
          <div>
            <CarPolDef player={this.props.player} name={this.props.name} />
          </div>
        );
      } else if (this.state.statCat === "Overall") {
        return (
          <div>
            <CarPolOvr player={this.props.player} name={this.props.name} />
          </div>
        );
      }
    } else {
      return (
        <div style={{ paddingTop: "15%", paddingLeft: "30%" }}>
          <div style={{ margin: "0 auto" }}>
            <img
              style={{ height: "100px" }}
              src="https://thumbs.gfycat.com/AggressiveGrouchyHammerkop-max-1mb.gif"
            />
            <div>Loading Player...</div>
          </div>
        </div>
      );
    }
  }

  selectStatCat(evt, eventKey) {
    this.setState({ statCat: eventKey.target.innerHTML });
  }

  renderLogo() {
    if (JSON.stringify(this.state.team) != "{}") {
      return <img src={this.state.team.Logo} />;
    } else {
      return null;
    }
  }

  render() {
    console.log(this.props.stat);
    var picture =
      "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
    if (this.props.player.picture) {
      picture = this.props.player.picture;
    }
    return (
      <div className="card murdered-out">
        <Grid>
          <Row>
            <Col
              lg={3}
              md={3}
              style={{
                backgroundColor: "rgba(105,105,105,0.1)",
                marginRight: "20px"
              }}
            >
              <div
                style={{
                  color: "grey",
                  paddingTop: "20px",
                  paddingLeft: "20px",
                  paddingBottom: "20px"
                }}
              >
                <div style={{ textAlign: "center", height: "200px" }}>
                  <img src={picture} />
                </div>
                <div style={{ paddingLeft: "5px" }}>
                  <div style={{ fontSize: "19px" }}>
                    {this.props.player.name}
                    <span style={{ paddingLeft: "3px", fontSize: "11px" }}>
                      {" "}
                      {this.props.player.position}
                    </span>
                  </div>
                  <div>
                    <span>Height: {this.props.player.height}</span>
                    <span style={{ paddingLeft: "3px" }}>
                      {" "}
                      Weight: {this.props.player.weight}
                    </span>
                  </div>
                  <div>Age: {this.props.player.age}</div>
                  <div>Team: {this.props.player.team}</div>
                  <div>College: {this.props.player.college || "None"}</div>
                </div>
              </div>
            </Col>
            <Col lg={5} md={8}>
              <div>{this.checkLoad()}</div>
            </Col>
            <Col lg={2}>
              <div>
                <DropdownButton
                  title={this.state.statCat}
                  pullRight
                  className="card carButton"
                  style={{
                    border: "none",
                    fontSize: "16px",
                    backgroundColor: "rgba(105,105,105,0.1)",
                    marginTop: "30px",
                    color: this.state.team.Color_Sec
                  }}
                  onSelect={this.selectStatCat}
                >
                  <MenuItem eventKey="1">Basic</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2">Offense</MenuItem>
                  <MenuItem eventKey="3">Advanced Off</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Play Type</MenuItem>
                  <MenuItem eventKey="10" disabled>
                    P+R Ball Hand.
                  </MenuItem>
                  <MenuItem eventKey="11" disabled>
                    P+R Roll Man
                  </MenuItem>
                  <MenuItem eventKey="12" disabled>
                    Isolation
                  </MenuItem>
                  <MenuItem eventKey="14" disabled>
                    Transition
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Player Tracking</MenuItem>
                  <MenuItem eventKey="4" disabled>
                    Shooting Eff
                  </MenuItem>
                  <MenuItem eventKey="5" disabled>
                    Catch/Shoot
                  </MenuItem>
                  <MenuItem eventKey="6" disabled>
                    Post Ups
                  </MenuItem>
                  <MenuItem eventKey="9" disabled>
                    Speed/Distance
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="7">Defense</MenuItem>
                  <MenuItem eventKey="13" disabled>
                    Hustle
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="8">Overall</MenuItem>
                </DropdownButton>
              </div>
              <div style={{ height: "80px", marginTop: "110%" }}>
                {this.renderLogo()}
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
