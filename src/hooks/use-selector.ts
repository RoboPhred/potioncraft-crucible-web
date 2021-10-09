import { AppState } from "@/state";
import { useSelector as realUseSelector } from "react-redux";

export function useSelector<T>(selector: (state: AppState) => T) {
  return realUseSelector((state) => selector(state as AppState));
}
