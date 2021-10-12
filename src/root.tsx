import * as React from "react";

import { Router } from "react-router-dom";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import I18NProvider from "@/services/i18n/components/I18NProvider";

import StoreProvider from "@/store/components/StoreProvider";

import history from "@/history";
import Routes from "@/routes";

const Root: React.FC = () => (
  <I18NProvider>
    <StoreProvider>
      <Router history={history}>
        <DndProvider backend={HTML5Backend}>
          <Routes />
        </DndProvider>
      </Router>
    </StoreProvider>
  </I18NProvider>
);

export default Root;
