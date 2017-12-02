import React from "react";
import axios from "axios";
import Autosuggest from "react-autosuggest";
var parse = require("autosuggest-highlight/parse");
var match = require("autosuggest-highlight/match");

const players = [
  {
    name: "De'Quon Lake",
    team: "Arizona State Sun Devils",
    league: "ncaa"
  },
  {
    name: "Brandon Ingram",
    team: "Los Angeles Lakers",
    league: "nba"
  },
  {
    name: "DeAndre Ayton",
    team: "Arizona Wildcats",
    league: "ncaa"
  }
];

export default class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: []
    };
    this.getNbaPlayers = this.getNbaPlayers.bind(this);
    this.getNbaTeams = this.getNbaTeams.bind(this);
    this.getCollegePlayers = this.getNbaPlayers.bind(this);
    this.getCollegeTeams = this.getNbaTeams.bind(this);
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
  }

  componentDidMount() {
    this.getNbaPlayers();
    this.getCollegePlayers();
    this.getNbaTeams();
    this.getCollegeTeams();
  }

  getNbaPlayers() {}
  getNbaTeams() {}
  getCollegePlayers() {}
  getCollegeTeams() {}

  escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  getSuggestions(value) {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") {
      return [];
    }

    const regex = new RegExp("\\b" + escapedValue, "i");

    return players.filter(player =>
      regex.test(this.getSuggestionValue(player))
    );
  }

  getSuggestionValue(suggestion) {
    return `${suggestion.name} \n${suggestion.team}`;
  }

  renderSuggestion(suggestion, { query }) {
    const suggestionText = `${suggestion.name} ${suggestion.team}`;
    const matches = match(suggestionText, query);
    const parts = parse(suggestionText, matches);

    return (
      <span className={"suggestion-content " + suggestion.league}>
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

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Search for Players, Teams, or Leagues",
      value,
      onChange: this.onChange,
      type: "search"
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
