import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./LandingPage";
//import TeamPage from "./TeamPage";
import PlayerPage from "./PlayerPage";
import ScoutingPage from "./ScoutingPage";
import CollegeScoutingPage from "./CollegeScoutingPage";
import GLeagueScoutingPage from "./GLeagueScoutingPage";
import CollegePlayerPage from "./College/CollegePlayerPage";
import CollegeTeamPage from "./College/CollegeTeamPage";
import IntTeamPage from "./International/IntTeamPage";
import GTeamPage from "./GLeague/GTeamPage";
import GPlayerPage from "./GLeague/GPlayerPage";

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/team/:id" component={LandingPage} />
      <Route path="/player/:id" component={PlayerPage} />
      <Route path="/scouting" component={ScoutingPage} />
      <Route path="/college-scouting" component={CollegeScoutingPage} />
      <Route path="/gleague-scouting" component={GLeagueScoutingPage} />
      <Route path="/college-player/:id" component={CollegePlayerPage} />
      <Route path="/college-team/:id" component={CollegeTeamPage} />
      <Route path="/gleague-team/:id" component={GTeamPage} />
      <Route path="/gleague-player/:id" component={GPlayerPage} />
      <Route path="/int-team/:id" component={IntTeamPage} />
      <Redirect from="/" to="/team/24" />
    </Switch>
  </BrowserRouter>
);

export default Main;
// <Route exact path="/team/:id" component={TeamPage} />
// <Route exact path="/player/:id" component={PlayerPage} />
