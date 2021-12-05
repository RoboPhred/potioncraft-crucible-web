import * as React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import EditorPage from "./pages/editor";
import HomePage from "./pages/home";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/map-editor" exact component={EditorPage} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
