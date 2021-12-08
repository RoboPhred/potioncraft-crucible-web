import * as React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";
import PotionBaseMapEditorPage from "./pages/potionbase-mapeditor";
import PotionBasesPage from "./pages/potionbases";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />

    <Route path="/potion-bases" exact component={PotionBasesPage} />
    <Route
      path="/potion-bases/:potionBaseId/map-editor"
      exact
      component={PotionBaseMapEditorPage}
    />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
