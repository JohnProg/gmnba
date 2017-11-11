import React from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </main>
);

export default Main;
