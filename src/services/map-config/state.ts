export interface MapConfigState {
  loadingStatus: "idle" | "loading" | "loaded" | "error";
  errorMessage: string | null;
}

const _defaultMapConfigState: MapConfigState = {
  loadingStatus: "idle",
  errorMessage: null,
};

export const defaultMapConfigState = Object.freeze(_defaultMapConfigState);
