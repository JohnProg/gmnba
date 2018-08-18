import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import axios from "axios";
import PlayerPolColComp from "./PlayerPolColComp";

export default class CompCarouselItem extends React.Component {
  constructor(props) {
    super(props);
    this.renderLogo = this.renderLogo.bind(this);
    this.getLogo = this.getLogo.bind(this);
    this.state = {
      team: {}
    };
  }

  componentDidMount() {
    this.getLogo();
  }

  getLogo() {
    axios
      .get(`api/teams/getTeamColors/${this.props.player.team}`)
      .then(data => {
        this.setState({ team: data.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderLogo() {
    if (JSON.stringify(this.state.team) != "{}") {
      return (
        <div style={{ height: "100px" }}>
          <img src={this.state.team.Logo} />
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    var picture =
      this.props.player.picture ||
      "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
    return (
      <div>
        <Row>
          <Col lg={12} style={{ paddingRight: "20px", paddingLeft: "20px" }}>
            <div
              className="card"
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                minHeight: "620px",
                overflowY: "auto"
              }}
            >
              <Col
                lg={12}
                style={{
                  paddingTop: "20px",
                  backgroundColor: null
                }}
              >
                <img
                  style={{
                    border: "none",
                    height: "180px",
                    display: "block",
                    margin: "auto"
                  }}
                  src={picture}
                />
              </Col>
              <Col
                lg={12}
                style={{
                  paddingTop: "30px",
                  backgroundColor: null,
                  color: "grey"
                }}
              >
                <div>
                  <span style={{ fontSize: "20px", color: "grey" }}>
                    {this.props.rank}. {this.props.player.name}
                  </span>

                  <span style={{ paddingLeft: "3px" }}>
                    {" "}
                    {this.props.player.position}
                  </span>
                  <span style={{ fontSize: "20px", float: "right" }}>
                    {this.props.player.year}
                  </span>
                </div>
                <hr style={{ marginTop: "0px" }} />
              </Col>
              <Col
                lg={8}
                style={{
                  backgroundColor: null,
                  color: "grey"
                }}
              >
                <div style={{ fontSize: "14px" }}>
                  <div>Height: {this.props.player.height}</div>
                  <div>Weight: {this.props.player.weight}</div>
                  <div>Age: {this.props.player.age}</div>
                  <div>Experience: {this.props.player.experience}</div>
                  <div>Team: {this.props.player.team}</div>
                </div>
              </Col>
              <Col lg={4} style={{ backgroundColor: null }}>
                {this.renderLogo()}
              </Col>
              <Col lg={12}>
                <hr style={{ marginTop: "0px" }} />
              </Col>
              <Col lg={12}>
                <PlayerPolColComp player={this.props.player} />
              </Col>
              {/*<Col lg={12}>
                <div
                  style={{
                    textDecoration: "underline",
                    color: "#d00000",
                    textAlign: "center",
                    cursor: "pointer",
                    paddingBottom: "10px"
                  }}
                  onClick={this.handleAdvancedClick}
                >
                  Advanced Stats &#9660;
                </div>
              </Col>
                {this.renderAdvanced()}*/}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
