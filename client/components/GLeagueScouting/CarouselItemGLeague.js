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
import PlPolTest from "../CarouselChartsCollege/PlPolTest";
import CarPolAdvOff from "../CarouselChartsCollege/CarPolAdvOff";
import CarPolOff from "../CarouselChartsCollege/CarPolOff";
import CarPolDef from "../CarouselChartsCollege/CarPolDef";
import axios from "axios";

export default class CarouselItemGLeague extends React.Component {
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
    if (this.props.stat === "Offense" || this.props.stat === "Defense") {
      this.setState({ statCat: this.props.stat });
    } else {
      this.setState({ statCat: "Basic" });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getTeamColors(nextProps.player.team);
    if (nextProps.stat === "Offense" || nextProps.stat === "Defense") {
      this.setState({ statCat: nextProps.stat });
    } else {
      this.setState({ statCat: "Basic" });
    }
  }

  getTeamColors(team) {
    axios
      .get(`api/teams/getgTeamColors/${team}`)
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
      } else if (this.state.statCat === "Defense") {
        return (
          <div>
            <CarPolDef player={this.props.player} name={this.props.name} />
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
      return (
        <a href={`/gleague-team/${this.state.team.id}`}>
          <img src={this.state.team.Logo} />
        </a>
      );
    } else {
      return null;
    }
  }

  render() {
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
                    <a href={`/gleague-player/${this.props.player.id}`}>
                      <span style={{ color: "grey" }}>
                        {this.props.player.name}
                      </span>
                    </a>
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
                  <div>Class: {this.props.player.class}</div>
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
                  <MenuItem eventKey="2">Offense</MenuItem>
                  <MenuItem eventKey="3">Advanced Off</MenuItem>
                  <MenuItem eventKey="7">Defense</MenuItem>
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
