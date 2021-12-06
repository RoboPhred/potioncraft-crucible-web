import * as React from "react";

import { useClickAction } from "@/hooks/use-action";
import { useSelector } from "@/hooks/use-selector";

import { mapEditorToolSet } from "@/actions/potionbase-map-editor/tool-set";

import {
  currentToolSelector,
  toolRadiusSelector,
} from "@/services/map-editor/mouse/selectors/tools";

import ToolBar from "../ToolBar/ToolBar";
import ToggleButton from "../ToolBar/ToggleButton";
import { mapEditorToolRadiusSet } from "@/actions/potionbase-map-editor/tool-radius-set";

const MapEditorToolBar = () => {
  const toolSize = useSelector(toolRadiusSelector);
  const currentTool = useSelector(currentToolSelector);
  const onIncreaseToolSize = useClickAction(
    mapEditorToolRadiusSet,
    toolSize + 0.2
  );
  const onDecreaseToolSize = useClickAction(
    mapEditorToolRadiusSet,
    toolSize - 0.2
  );
  const onPointerClick = useClickAction(mapEditorToolSet, "pointer");
  const onEraserClick = useClickAction(mapEditorToolSet, "eraser");
  const onBonesClick = useClickAction(mapEditorToolSet, "paint-danger-zone");
  return (
    <ToolBar>
      <ToggleButton
        isPressed={currentTool === "pointer"}
        onClick={onPointerClick}
      >
        Pointer
      </ToggleButton>
      <ToggleButton
        isPressed={currentTool === "eraser"}
        onClick={onEraserClick}
      >
        Eraser
      </ToggleButton>
      <ToggleButton
        isPressed={currentTool === "paint-danger-zone"}
        onClick={onBonesClick}
      >
        Bones
      </ToggleButton>
      Brush Size:
      <button onClick={onDecreaseToolSize}>-</button>
      {toolSize.toFixed(1)}
      <button onClick={onIncreaseToolSize}>+</button>
    </ToolBar>
  );
};

export default MapEditorToolBar;
