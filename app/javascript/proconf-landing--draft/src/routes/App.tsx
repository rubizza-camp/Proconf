import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthRoutes } from "./auth";
import { PublicRoutes } from "./public";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/auth' component={AuthRoutes} />
        <Route path='/' component={PublicRoutes} />
      </Switch>
    </Router>
  );
};
