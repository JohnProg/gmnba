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
import PlPolTest from "./TimelineCharts/PlPolTest";
// import CarPolAdvOff from "./CarouselCharts/CarPolAdvOff";
// import CarPolOff from "./CarouselCharts/CarPolOff";
// import CarPolDef from "./CarouselCharts/CarPolDef";
// import CarPolOvr from "./CarouselCharts/CarPolOvr";
import axios from "axios";

export default class TimelineItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      statCat: "Basic",
      team: {}
    };
    this.checkLoad = this.checkLoad.bind(this);
    this.selectStatCat = this.selectStatCat.bind(this);
  }

  checkLoad() {
    const { ...props } = this.props;
    var name = "container" + this.props.index;
    console.log(name);
    if (JSON.stringify(this.props.player) != "{}") {
      if (this.state.statCat === "Basic") {
        return (
          <div {...props}>
            <PlPolTest player={this.props.player} name={name} />
          </div>
        );
      } else if (this.state.statCat === "Advanced Off") {
        return (
          <div>
            <CarPolAdvOff player={this.props.player} name={name} />
          </div>
        );
      } else if (this.state.statCat === "Offense") {
        return (
          <div>
            <CarPolOff player={this.props.player} name={name} />
          </div>
        );
      } else if (this.state.statCat === "Defense") {
        return (
          <div>
            <CarPolDef player={this.props.player} name={name} />
          </div>
        );
      } else if (this.state.statCat === "Overall") {
        return (
          <div>
            <CarPolOvr player={this.props.player} name={name} />
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

  render() {
    console.log("ITEM PROPS: ", this.props);
    var picture =
      "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
    if (this.props.player.picture) {
      picture = this.props.player.picture;
    }
    return (
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)"
        }}
      >
        <Row>
          <Col lg={10} lgOffset={1}>
            <div>{this.checkLoad()}</div>
          </Col>
        </Row>
      </div>
    );
  }
}
