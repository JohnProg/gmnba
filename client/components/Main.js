import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
//import TeamPage from "./TeamPage";
import PlayerPage from "./PlayerPage";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={PlayerPage} />
      <Route path="/team" component={LandingPage} />
    </Switch>
  </main>
);

export default Main;
// <Route exact path="/team/:id" component={TeamPage} />
// <Route exact path="/player/:id" component={PlayerPage} />
