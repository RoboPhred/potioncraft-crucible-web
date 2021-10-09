import * as React from "react";
import { Trans } from "react-i18next";

import AbstractLoadButton from "./AbstractLoadButton";

export const LoadButton = () => (
  <AbstractLoadButton>
    {({ disabled, onClick }) => (
      <button disabled={disabled} onClick={onClick}>
        <Trans i18nKey="load_potioncraft_map" />
      </button>
    )}
  </AbstractLoadButton>
);
