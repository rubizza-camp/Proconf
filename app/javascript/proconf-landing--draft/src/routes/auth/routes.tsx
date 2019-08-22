import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Login } from "./routes/Login";

export default () => {
  return (
    <Router>
      <Route exact path='/auth' component={Login} />
    </Router>
  );
};
