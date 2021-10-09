import * as React from "react";

import { loadMapConfig } from "@/actions/load-map-config";
import { useDispatch, useSelector } from "react-redux";

import { loadingStatusSelector } from "../selectors/loading-status";

export interface UseLoadMapConfig {
  disabled: boolean;
  onLoadSave(file: File): void;
}

export default function useLoadMapConfig(): UseLoadMapConfig {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(loadingStatusSelector);
  const onLoadSave = React.useCallback(
    (file: File) => {
      dispatch(loadMapConfig(file));
    },
    [dispatch]
  );
  return {
    disabled: loadingStatus === "loading",
    onLoadSave,
  };
}
