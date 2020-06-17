import React, { FunctionComponent } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import { Home, Records } from './pages';

export const App: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/date/:date">
        <Home />
      </Route>
      <Route path="/records">
        <Records />
      </Route>
    </Switch>
  </Router>
);
