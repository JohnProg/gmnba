import React from "react";
import { Col, Button, Well, Row, Grid, Nav, NavItem } from "react-bootstrap";
import UpcomingFAListEntry from "./UpcomingFAListEntry";
import axios from "axios";

export default class UpcomingFAs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expiring: []
    };
    this.renderPlayers = this.renderPlayers.bind(this);
    this.getExpiring = this.getExpiring.bind(this);
    //this.getPlayer = this.getPlayer.bind(this);
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
        <UpcomingFAListEntry player={player} key={i} />
      ));
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
            player.current = contracts[i].yearOne;
            player.type = "Restricted";
          } else if (contracts[i].yearTwoOption === "Player") {
            player.name = contracts[i].name;
            player.current = contracts[i].yearOne;
            player.type = "Player Option";
          } else {
            player.name = contracts[i].name;
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
        </Row>
        <Row style={{ paddingTop: "20px" }}>
          <Col lg={10} lgOffset={1} md={4}>
            {this.renderPlayers()}
          </Col>
        </Row>
      </div>
    );
  }
}
