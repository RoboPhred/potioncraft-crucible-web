import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { packageLoadFile } from "@/actions/packages/package-load-file";

import {
  packageLoadErrorSelector,
  packageLoadStatusSelector,
} from "../selectors/package";

export interface UseLoadMapConfig {
  loadStatus: "idle" | "loading" | "loaded" | "error";
  loadError: string | null;
  onLoadPackage(file: File): void;
}

export default function useLoadPackage(): UseLoadMapConfig {
  const dispatch = useDispatch();
  const loadStatus = useSelector(packageLoadStatusSelector);
  const loadError = useSelector(packageLoadErrorSelector);
  const onLoadPackage = React.useCallback(
    (file: File) => {
      dispatch(packageLoadFile(file));
    },
    [dispatch]
  );
  return {
    loadStatus,
    loadError,
    onLoadPackage,
  };
}
