import * as React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import HomePage from "./pages/home";
import IngredientsListPage from "./pages/ingredient-list";
import PotionBaseMapEditorPage from "./pages/potionbase-mapeditor";
import PotionBaseListPage from "./pages/potionbase-list";
import PotionBasePage from "./pages/potionbase";
import PotionEffectPage from "./pages/potioneffect";
import PotionEffectListPage from "./pages/potioneffect-list";
import PotionBottleListPage from "./pages/potionbottle-list";
import PotionBottlePage from "./pages/potionbottle";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />

    <Route path="/ingredients" exact component={IngredientsListPage} />

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

    <Route path="/potion-effects" exact component={PotionEffectListPage} />
    <Route
      path="/potion-effects/:potionEffectId"
      exact
      component={PotionEffectPage}
    />

    <Route path="/potion-bottles" exact component={PotionBottleListPage} />
    <Route
      path="/potion-bottles/:potionBottleId"
      exact
      component={PotionBottlePage}
    />

    <Redirect to="/" />
  </Switch>
);

export default Routes;
