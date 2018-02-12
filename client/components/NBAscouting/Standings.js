import React from "react";
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  TabContainer,
  TabContent,
  TabPane,
  Tab,
  Checkbox,
  FormGroup
} from "react-bootstrap";
import ConferenceStandings from "./ConferenceStandings";
import LeagueStandings from "./LeagueStandings";

export default class Standings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderConference: true,
      renderLeague: false,
      westArr: [],
      eastArr: []
    };
    this.handleConferenceButton = this.handleConferenceButton.bind(this);
    this.handleLeagueButton = this.handleLeagueButton.bind(this);
    this.renderStandings = this.renderStandings.bind(this);
  }

  componentDidMount() {
    var west = [
      "Oklahoma City Thunder",
      "Denver Nuggets",
      "Golden State Warriors",
      "Los Angeles Clippers",
      "Los Angeles Lakers",
      "Memphis Grizzlies",
      "San Antonio Spurs",
      "Phoenix Suns",
      "Utah Jazz",
      "Portland Trail Blazers",
      "Sacramento Kings",
      "Dallas Mavericks",
      "Houston Rockets",
      "Minnesota Timberwolves",
      "New Orleans Pelicans"
    ];
    var westArr = [];
    var eastArr = [];
    for (var i = 0; i < this.props.teams.length; i++) {
      if (west.includes(this.props.teams[i].Name)) {
        // var wins = this.props.teams[i].W;
        // var total = this.props.teams[i].W + this.props.teams[i].L;
        // console.log(total);
        var winPct =
          parseInt(this.props.teams[i].W) /
          (parseInt(this.props.teams[i].W) + parseInt(this.props.teams[i].L));
        this.props.teams[i].winPct = winPct;
        westArr.push(this.props.teams[i]);
      } else {
        var winPct =
          parseInt(this.props.teams[i].W) /
          (parseInt(this.props.teams[i].W) + parseInt(this.props.teams[i].L));
        this.props.teams[i].winPct = winPct;
        eastArr.push(this.props.teams[i]);
      }
    }
    this.setState({ westArr: westArr, eastArr: eastArr }, () => {
      //console.log(this.state);
    });
  }

  handleConferenceButton() {
    this.setState({ renderConference: true, renderLeague: false }, () => {
      //console.log(this.state);
    });
  }

  handleLeagueButton() {
    this.setState({ renderLeague: true, renderConference: false }, () => {
      //console.log(this.state);
    });
  }

  renderStandings() {
    var headerStyle = {
      backgroundColor: "#d00000",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    if (this.state.renderConference) {
      return (
        <div>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                Western Conference
              </div>
            </Col>
            <Col lg={3} lgOffset={2}>
              <div className="card" style={headerStyle}>
                Eastern Conference
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "30px" }}>
            <Col lg={10} lgOffset={1}>
              <ConferenceStandings
                west={this.state.westArr}
                east={this.state.eastArr}
              />
            </Col>
          </Row>
        </div>
      );
    } else {
      //var teams = this.state.westArr.concat(this.state.eastArr);
      return (
        <div>
          <Row style={{ paddingTop: "20px" }}>
            <Col lg={3} lgOffset={1}>
              <div className="card" style={headerStyle}>
                League Standings
              </div>
            </Col>
          </Row>
          <Row style={{ paddingTop: "20px" }}>
            <Col lg={10} lgOffset={1}>
              <LeagueStandings teams={this.props.teams} />
            </Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    var headerStyle = {
      backgroundColor: "#d00000",
      height: "45px",
      lineHeight: "45px",
      fontSize: "20px",
      paddingLeft: "20px",
      color: "#fff"
    };
    var selectedStatButton = {
      borderRadius: "10px 0px 0px 10px",
      backgroundColor: "#d00000",
      color: "white",
      width: "100px",
      fontWeight: "bold"
    };
    var unSelectedStatButton = {
      borderRadius: "10px 0px 0px 10px",
      backgroundColor: "#fff",
      color: "#d00000",
      width: "100px"
    };
    var selectedRatingButton = {
      borderRadius: "0px 10px 10px 0px",
      backgroundColor: "#d00000",
      color: "white",
      width: "100px",
      fontWeight: "bold"
    };
    var unSelectedRatingButton = {
      borderRadius: "0px 10px 10px 0px",
      backgroundColor: "#fff",
      color: "#d00000",
      width: "100px"
    };
    var statStyle;
    var ratingStyle;
    if (this.state.renderConference) {
      statStyle = selectedStatButton;
    } else {
      statStyle = unSelectedStatButton;
    }
    if (this.state.renderLeague) {
      ratingStyle = selectedRatingButton;
    } else {
      ratingStyle = unSelectedRatingButton;
    }
    return (
      <div>
        <Row style={{ paddingTop: "40px" }}>
          <Col lg={3} lgOffset={1}>
            <span>
              <Button onClick={this.handleConferenceButton} style={statStyle}>
                Conference
              </Button>
            </span>
            <span>
              <Button onClick={this.handleLeagueButton} style={ratingStyle}>
                League
              </Button>
            </span>
          </Col>
        </Row>
        {this.renderStandings()}
      </div>
    );
  }
}
