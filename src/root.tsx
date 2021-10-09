import * as React from "react";

import { Router } from "react-router-dom";

import I18NProvider from "@/services/i18n/components/I18NProvider";

import StoreProvider from "@/store/components/StoreProvider";

import history from "@/history";
import Routes from "@/routes";

const Root: React.FC = () => (
  <I18NProvider>
    <StoreProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </StoreProvider>
  </I18NProvider>
);

export default Root;
