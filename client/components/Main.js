import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
//import TeamPage from "./TeamPage";
import PlayerPage from "./PlayerPage";
import ScoutingPage from "./ScoutingPage";
import CollegeScoutingPage from "./CollegeScoutingPage";
import CollegePlayerPage from "./College/CollegePlayerPage";
import CollegeTeamPage from "./College/CollegeTeamPage";

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={PlayerPage} />
      <Route path="/team/:id" component={LandingPage} />
      <Route path="/player/:id" component={PlayerPage} />
      <Route path="/scouting" component={ScoutingPage} />
      <Route path="/college-scouting" component={CollegeScoutingPage} />
      <Route path="/college-player/:id" component={CollegePlayerPage} />
      <Route path="/college-team/:id" component={CollegeTeamPage} />
    </Switch>
  </BrowserRouter>
);

export default Main;
// <Route exact path="/team/:id" component={TeamPage} />
// <Route exact path="/player/:id" component={PlayerPage} />
