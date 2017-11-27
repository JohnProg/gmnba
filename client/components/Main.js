import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
//import TeamPage from "./TeamPage";
import PlayerPage from "./PlayerPage";
import ScoutingPage from "./ScoutingPage";

const Main = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={PlayerPage} />
      <Route path="/team/:id" component={LandingPage} />
      <Route path="/player/:id" component={PlayerPage} />
      <Route path="/scouting" component={ScoutingPage} />
    </Switch>
  </BrowserRouter>
);

export default Main;
// <Route exact path="/team/:id" component={TeamPage} />
// <Route exact path="/player/:id" component={PlayerPage} />
