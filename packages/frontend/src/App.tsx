import React, { FunctionComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Home } from './pages';

export const App: FunctionComponent = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/date/:date">
        <Home />
      </Route>
    </Switch>
  </Router>
);
