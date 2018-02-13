import React from "react";
import Autosuggest from "react-autosuggest";
var parse = require("autosuggest-highlight/parse");
var match = require("autosuggest-highlight/match");
import {
  Col,
  Button,
  Well,
  Row,
  Grid,
  Nav,
  NavItem,
  Image,
  Thumbnail,
  DropdownButton,
  MenuItem
} from "react-bootstrap";
import PlayerPolarColumn2 from "./PlayerPolarColumn2";
import CompPlayerOffBarRatings from "./CompPlayerOffBarRatings";
import CompPlayerDefBarRatings from "./CompPlayerDefBarRatings";
import CompPlayerOvrBarRatings from "./CompPlayerOvrBarRating";

export default class AddPlayerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      players: [],
      player: {},
      renderPlayer: false,
      renderAdvanced: false,
      advancedCat: "Advanced Offense"
    };
    this.escapeRegexCharacters = this.escapeRegexCharacters.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.getSuggestionValue = this.getSuggestionValue.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.handleClick = this.handleClick.bind(this);
    this.renderPlayer = this.renderPlayer.bind(this);
    //this.handleChange = this.handleChange.bind(this);
    this.handleAdvancedClick = this.handleAdvancedClick.bind(this);
    this.renderAdvanced = this.renderAdvanced.bind(this);
    this.getGrade = this.getGrade.bind(this);
    this.selectAdvancedCat = this.selectAdvancedCat.bind(this);
    this.renderBarRatings = this.renderBarRatings.bind(this);
  }

  componentDidMount() {}

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("\\b" + escapedValue, "i");

    return this.props.list.filter(player =>
      regex.test(this.getSuggestionValue(player))
    );
  }

  getSuggestionValue(suggestion) {
    if (suggestion.team) {
      return `${suggestion.name} ${suggestion.team}`;
    } else {
      return `${suggestion.name}`;
    }
  }

  handleAdvancedClick() {
    this.setState({ renderAdvanced: !this.state.renderAdvanced });
  }

  renderSuggestion(suggestion, { query }) {
    var suggestionText;
    if (suggestion.team) {
      suggestionText = `${suggestion.name} ${suggestion.team}`;
    } else {
      suggestionText = `${suggestion.name}`;
    }
    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);
    var tag;
    if (suggestion.league === "nba") {
      if (suggestion.team) {
        tag = `/player/${suggestion.id}`;
      } else {
        tag = `/team/${suggestion.id}`;
      }
    }
    if (suggestion.league === "ncaa") {
      if (suggestion.team) {
        tag = `/college-player/${suggestion.id}`;
      } else {
        tag = `/college-team/${suggestion.id}`;
      }
    }

    return (
      <span className={"suggestion-content " + suggestion.league}>
        <a href={tag}>
          <span className="name">
            {parts.map((part, index) => {
              const className = part.highlight ? "highlight" : null;

              return (
                <span className={className} key={index}>
                  {part.text}
                </span>
              );
            })}
          </span>
        </a>
      </span>
    );
  }

  onChange(event, { newValue, method }) {
    this.setState({
      value: newValue
    });
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  handleClick(event) {
    event.preventDefault();
    var value = this.state.value.split(" ");
    var name = value[0] + " " + value[1];
    var player = {};
    for (var i = 0; i < this.props.list.length; i++) {
      if (this.props.list[i].name === name) {
        player = this.props.list[i];
      }
    }
    this.setState({ player: player }, () => {
      console.log(this.state.player);
      this.setState({ renderPlayer: true });
    });
  }

  renderPlayer() {
    if (this.state.renderPlayer) {
      console.log("Render!!");
      return (
        <div
          className="card"
          style={{
            backgroundColor: "white",
            height: "620px",
            overflow: "scroll"
          }}
        >
          <Col lg={6} style={{ paddingTop: "20px" }}>
            <Thumbnail
              style={{ border: "none" }}
              src="https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443"
            />
          </Col>
          <Col lg={6} style={{ paddingTop: "30px" }}>
            <div>
              <span style={{ fontSize: "22px" }}>{this.state.player.name}</span>
              <span style={{ paddingLeft: "3px" }}>
                {" "}
                {this.state.player.position}
              </span>
            </div>
            <hr style={{ marginTop: "0px" }} />
            <div>Height: {this.state.player.height}</div>
            <div>Weight: {this.state.player.weight}</div>
            <div>Age: {this.state.player.age}</div>
            <div>Experience: {this.state.player.experience}</div>
            <div>Team: {this.state.player.team}</div>
          </Col>
          <Col lg={12}>
            <hr style={{ marginTop: "0px" }} />
          </Col>
          <Col lg={12}>
            <PlayerPolarColumn3 player={this.state.player} />
          </Col>
          <Col lg={12}>
            <div
              style={{
                textDecoration: "underline",
                color: "#d00000",
                textAlign: "center",
                cursor: "pointer"
              }}
            >
              Advanced Stats &#9660;
            </div>
          </Col>
        </div>
      );
    }
  }

  selectAdvancedCat(evt, eventKey) {
    this.setState({ advancedCat: eventKey.target.innerHTML });
  }

  renderAdvanced() {
    if (this.state.renderAdvanced) {
      return (
        <div>
          <Col lg={12}>
            <hr />
            <div>
              <DropdownButton
                title={this.state.advancedCat}
                className="card"
                style={{ border: "none", fontSize: "16px" }}
                onSelect={this.selectAdvancedCat}
              >
                <MenuItem eventKey="1">Advanced Offense</MenuItem>
                <MenuItem eventKey="2">Advanced Defense</MenuItem>
                <MenuItem eventKey="3">Advanced Overall</MenuItem>
              </DropdownButton>
            </div>
          </Col>
          <Col lg={12}>{this.renderBarRatings()}</Col>
        </div>
      );
    }
  }

  renderBarRatings() {
    if (this.state.advancedCat === "Advanced Overall") {
      var category = "Advanced Overall";
      return <CompPlayerOvrBarRatings player={this.props.list} />;
    }
    if (this.state.advancedCat === "Advanced Offense") {
      var category = "Advanced Offense";
      return <CompPlayerOffBarRatings player={this.props.list} />;
    }
    if (this.state.advancedCat === "Advanced Defense") {
      var category = "Advanced Defense";
      return <CompPlayerDefBarRatings player={this.props.list} />;
    }
  }

  getGrade(high, actual, min) {
    var playerGrade = {};
    var gradeSlots = 13;
    var adjusted = high - min;
    var gradeScale = adjusted / gradeSlots;

    var eighty = high - gradeScale;
    var sevenFive = eighty - gradeScale;
    var seventy = sevenFive - gradeScale;
    var sixFive = seventy - gradeScale;
    var sixty = sixFive - gradeScale;
    var fiveFive = sixty - gradeScale;
    var fifty = fiveFive - gradeScale;
    var fourFive = fifty - gradeScale;
    var fourty = fourFive - gradeScale;
    var threeFive = fourty - gradeScale;
    var thirty = threeFive - gradeScale;
    var twoFive = thirty - gradeScale;

    if (actual >= eighty) {
      playerGrade["Grade"] = 80;
      playerGrade["Color"] = "#1abded";
    } else if (actual >= sevenFive) {
      playerGrade["Grade"] = 75;
      playerGrade["Color"] = "#00a3c4";
    } else if (actual >= seventy) {
      playerGrade["Grade"] = 70;
      playerGrade["Color"] = "#00c7a2";
    } else if (actual >= sixFive) {
      playerGrade["Grade"] = 65;
      playerGrade["Color"] = "#56ce00";
    } else if (actual >= sixty) {
      playerGrade["Grade"] = 60;
      playerGrade["Color"] = "#b4d800";
    } else if (actual >= fiveFive) {
      playerGrade["Grade"] = 55;
      playerGrade["Color"] = "#b3d800";
    } else if (actual >= fifty) {
      playerGrade["Grade"] = 50;
      playerGrade["Color"] = "#ffdc00";
    } else if (actual >= fourFive) {
      playerGrade["Grade"] = 45;
      playerGrade["Color"] = "#fac600";
    } else if (actual >= fourty) {
      playerGrade["Grade"] = 40;
      playerGrade["Color"] = "#f0780d";
    } else if (actual >= threeFive) {
      playerGrade["Grade"] = 35;
      playerGrade["Color"] = "#f53300";
    } else if (actual >= thirty) {
      playerGrade["Grade"] = 30;
      playerGrade["Color"] = "#da000b";
    } else if (actual >= twoFive) {
      playerGrade["Grade"] = 25;
      playerGrade["Color"] = "#da000c";
    } else {
      playerGrade["Grade"] = 20;
      playerGrade["Color"] = "#b8000b";
    }
    return playerGrade;
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for Player...",
      value,
      onChange: this.onChange,
      type: "search"
    };
    var buttonStyle = {
      width: "100%",
      height: "40px",
      backgroundColor: this.props.colors.Color_Main,
      color: this.props.colors.Color_Sec
    };

    return (
      <div>
        <Col lg={10} style={{ paddingLeft: "0px" }}>
          <div className="card" style={{ display: "none" }}>
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
          </div>
        </Col>
        <Col lg={2} style={{ paddingLeft: "0px" }} />
        <Col lg={12} style={{ paddingLeft: "0px", paddingTop: "60px" }}>
          <div
            className="card"
            style={{
              backgroundColor: "white",
              height: "620px",
              overflow: "scroll"
            }}
          >
            <Col lg={6} style={{ paddingTop: "20px" }}>
              <Thumbnail
                style={{ border: "none" }}
                src="https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443"
              />
            </Col>
            <Col lg={6} style={{ paddingTop: "30px" }}>
              <div>
                <a href={`/player/${this.props.list.id}`}>
                  <span style={{ fontSize: "22px" }}>
                    {this.props.list.name}
                  </span>
                </a>
                <span style={{ paddingLeft: "3px" }}>
                  {" "}
                  {this.props.list.position}
                </span>
              </div>
              <hr style={{ marginTop: "0px" }} />
              <div style={{ fontSize: "16px" }}>
                <div>Height: {this.props.list.height}</div>
                <div>Weight: {this.props.list.weight}</div>
                <div>Age: {this.props.list.age}</div>
                <div>Experience: {this.props.list.experience}</div>
                <div>Team: {this.props.list.team}</div>
              </div>
            </Col>
            <Col lg={12}>
              <hr style={{ marginTop: "0px" }} />
            </Col>
            <Col lg={12}>
              <PlayerPolarColumn2 player={this.props.list} />
            </Col>
            <Col lg={12}>
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
            {this.renderAdvanced()}
          </div>
        </Col>
      </div>
    );
  }
}
