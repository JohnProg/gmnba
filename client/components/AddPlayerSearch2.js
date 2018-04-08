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
import PlayerPolarColumn3 from "./PlayerPolarColumn3";
import CompPlayerOffBarRatings2 from "./CompPlayerOffBarRating2";
import CompPlayerDefBarRatings2 from "./CompPlayerDefBarRating2";
import CompPlayerOvrBarRatings2 from "./CompPlayerOvrBarRating2";

export default class AddPlayerSearch2 extends React.Component {
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
      this.setState({ renderPlayer: true });
    });
  }

  renderPlayer() {
    var picture;
    if (this.state.player.picture) {
      picture = this.state.player.picture;
    } else {
      picture =
        "https://vignette.wikia.nocookie.net/charmscrp/images/a/ac/Generic_Avatar.png/revision/latest?cb=20140819033443";
    }
    if (this.state.renderPlayer) {
      return (
        <div
          className="card"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            minheight: "600px",
            overflowY: "auto"
          }}
        >
          <Col lg={6} style={{ paddingTop: "20px" }}>
            <img style={{ border: "none", height: "180px" }} src={picture} />
          </Col>
          <Col lg={6} style={{ paddingTop: "30px" }}>
            <div>
              <a href={`/player/${this.state.player.id}`}>
                <span style={{ fontSize: "22px", color: "white" }}>
                  {this.state.player.name}
                </span>
              </a>
              <span style={{ paddingLeft: "3px", color: "white" }}>
                {" "}
                {this.state.player.position}
              </span>
            </div>
            <div style={{ fontSize: "16px", color: "white" }}>
              <hr style={{ marginTop: "0px" }} />
              <div>Height: {this.state.player.height}</div>
              <div>Weight: {this.state.player.weight}</div>
              <div>Age: {this.state.player.age}</div>
              <div>Experience: {this.state.player.experience}</div>
              <div>Team: {this.state.player.team}</div>
            </div>
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
      );
    }
  }

  renderBarRatings() {
    if (this.state.advancedCat === "Advanced Overall") {
      var category = "Advanced Overall";
      return <CompPlayerOvrBarRatings2 player={this.state.player} />;
    }
    if (this.state.advancedCat === "Advanced Offense") {
      var category = "Advanced Offense";
      return <CompPlayerOffBarRatings2 player={this.state.player} />;
    }
    if (this.state.advancedCat === "Advanced Defense") {
      var category = "Advanced Defense";
      return <CompPlayerDefBarRatings2 player={this.state.player} />;
    }
  }

  handleAdvancedClick() {
    this.setState({ renderAdvanced: !this.state.renderAdvanced });
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
                style={{
                  border: "none",
                  fontSize: "16px",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  color: "white"
                }}
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
        <Col lg={9} lgOffset={1} xs={10} style={{ paddingLeft: "32px" }}>
          <div className="card">
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
        <Col lg={2} xs={2} style={{ paddingLeft: "0px" }}>
          <div>
            <button onClick={this.handleClick} style={buttonStyle}>
              Add
            </button>
          </div>
        </Col>
        <Col lg={12} xs={12} style={{ paddingLeft: "0px", paddingTop: "20px" }}>
          {this.renderPlayer()}
        </Col>
      </div>
    );
  }
}
