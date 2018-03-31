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
import PlayerPolarColumn from "./PlayerPolarColumn";
import PlPolTest from "./PlPolTest";

export default class CarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      statCat: "Basic"
    };
    this.checkLoad = this.checkLoad.bind(this);
  }

  checkLoad() {
    if (this.props.player) {
      return (
        <div>
          <PlPolTest player={this.props.player} name={this.props.name} />
        </div>
      );
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

  render() {
    console.log(this.props.name);
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
                  className="card"
                  style={{
                    border: "none",
                    fontSize: "16px",
                    backgroundColor: "rgba(105,105,105,0.1)",
                    marginTop: "30px",
                    color: this.props.team.Color_Sec
                  }}
                  //onSelect={this.selectStatCat}
                >
                  <MenuItem eventKey="1">Basic</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2">Offense</MenuItem>
                  <MenuItem eventKey="3">Advanced Offense</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Play Type</MenuItem>
                  <MenuItem eventKey="10">P+R Ball Handler</MenuItem>
                  <MenuItem eventKey="11">P+R Roll Man</MenuItem>
                  <MenuItem eventKey="12">Isolation</MenuItem>
                  <MenuItem eventKey="14">Transition</MenuItem>
                  <MenuItem divider />
                  <MenuItem header>Player Tracking</MenuItem>
                  <MenuItem eventKey="4">Shooting Efficiency</MenuItem>
                  <MenuItem eventKey="5">Catch/Shoot</MenuItem>
                  <MenuItem eventKey="6">Post Ups</MenuItem>
                  <MenuItem eventKey="9">Speed/Distance</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="7">Defense</MenuItem>
                  <MenuItem eventKey="13">Hustle</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="8">Overall</MenuItem>
                </DropdownButton>
              </div>
              <div style={{ height: "80px", marginTop: "110%" }}>
                <img src={this.props.team.Logo} />
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
