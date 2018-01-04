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
  Thumbnail
} from "react-bootstrap";
import PlayerPolarColumn2 from "../NBAscouting/PlayerPolarColumn2";

export default class AddCPlayerSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      players: [],
      player: {},
      renderPlayer: false
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
            <PlayerPolarColumn2 player={this.state.player} />
          </Col>
          <Col lg={12}>
            <div
              style={{
                textDecoration: "underline",
                color: "#0055bf",
                textAlign: "center",
                cursor: "pointer"
              }}
            >
              Advanced Stats
            </div>
          </Col>
        </div>
      );
    }
  }

  // handleChange(event) {
  //   this.setState({ player: event.target.value });
  // }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for Player...",
      value,
      onChange: this.onChange,
      type: "search"
    };

    return (
      <div>
        <Col lg={10} style={{ paddingLeft: "0px" }}>
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
        <Col lg={2} style={{ paddingLeft: "0px" }}>
          <div>
            <button
              onClick={this.handleClick}
              style={{
                width: "100%",
                height: "40px",
                backgroundColor: "#0055bf",
                color: "white"
              }}
            >
              Add
            </button>
          </div>
        </Col>
        <Col lg={12} style={{ paddingLeft: "0px", paddingTop: "20px" }}>
          {this.renderPlayer()}
        </Col>
      </div>
    );
  }
}
