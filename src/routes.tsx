import * as React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import EditorPage from "./pages/editor/EditorPage";
import LandingPage from "./pages/landing/LandingPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LandingPage} />
    <Route path="/editor" exact component={EditorPage} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
