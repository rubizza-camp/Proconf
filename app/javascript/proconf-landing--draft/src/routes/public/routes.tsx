import React from "react";
import { Route } from "react-router-dom";

import { Home } from "./routes/Home";
import { Page } from "../../components";
import { EpisodeDetails } from "./routes/EpisodeDetails";
import { About } from "./routes/About";
import { Donate } from "./routes/Donate";
import { Switch } from "react-router";
import { NotFound } from "./routes/NotFound";

export default () => {
  return (
    <Page>
      <Page.Header>
        <Page.Header.Logo />
        <Page.Header.Navbar />
        <Page.Header.Social />
      </Page.Header>
      <Switch>
        <Route path='/episodes/:id' component={EpisodeDetails} />
        <Route path='/episodes/:id/list/:type' component={EpisodeDetails} />
        <Route path='/page/:page' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/donate' component={Donate} />
        <Route exact path='/' component={Home} />
        <Route path='/' component={NotFound} />
      </Switch>
      <Page.Footer>
        <Page.Content>
          <Page.Header.Logo />
          <Page.Header.Navbar />
          <Page.Footer.Details />
        </Page.Content>
      </Page.Footer>
    </Page>
  );
};
