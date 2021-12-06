import { concatReducers } from "@/reducer/utils";

import editorDamageReducer from "../damage/reducer";
import editorEntitiesReducer from "../entities/reducer";
import editorMouseReducer from "../mouse/reducer";
import editorSelectionReducer from "../selection/reducer";
import editorViewReducer from "../view/reducer";

export default concatReducers(
  editorDamageReducer,
  editorEntitiesReducer,
  editorMouseReducer,
  editorSelectionReducer,
  editorViewReducer
);
