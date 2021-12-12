import * as React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";
import PotionBaseMapEditorPage from "./pages/potionbase-mapeditor";
import PotionBaseListPage from "./pages/potionbase-list";
import PotionBasePage from "./pages/potionbase";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />

    <Route path="/potion-bases" exact component={PotionBaseListPage} />
    <Route
      path="/potion-bases/:potionBaseId"
      exact
      component={PotionBasePage}
    />
    <Route
      path="/potion-bases/:potionBaseId/map-editor"
      exact
      component={PotionBaseMapEditorPage}
    />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
