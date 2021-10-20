import { concatReducers } from "@/reducer/utils";

import editorRenderedReducer from "./editor-rendered";
import editorViewportReducer from "./editor-viewport";
import entityDeleteReducer from "./entity-delete";
import entityInsertReducer from "./entity-insert";
import entityOffsetReducer from "./entity-offset";
import entityPrototypeInstantiateReducer from "./entity-prototype-instantiate";
import mapConfigReceiveReducer from "./map-config-receive";

export default concatReducers(
  editorRenderedReducer,
  editorViewportReducer,
  entityDeleteReducer,
  entityInsertReducer,
  entityOffsetReducer,
  entityPrototypeInstantiateReducer,
  mapConfigReceiveReducer
);
