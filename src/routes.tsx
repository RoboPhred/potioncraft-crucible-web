import * as React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import EditorPage from "./pages/editor/EditorPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/editor" exact component={EditorPage} />
    <Redirect to="/editor" />
  </Switch>
);

export default Routes;
