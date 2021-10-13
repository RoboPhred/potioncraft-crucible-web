import * as React from "react";

import { useClickAction } from "@/hooks/use-action";
import { useSelector } from "@/hooks/use-selector";

import { editorToolSet } from "@/actions/editor-tool-set";

import {
  currentToolSelector,
  toolRadiusSelector,
} from "@/services/editor-mouse/selectors/tools";

import ToolBar from "../ToolBar/ToolBar";
import ToggleButton from "../ToolBar/ToggleButton";
import { editorToolRadiusSet } from "@/actions/editor-tool-radius-set";

const MapEditorToolBar = () => {
  const toolSize = useSelector(toolRadiusSelector);
  const currentTool = useSelector(currentToolSelector);
  const onIncreaseToolSize = useClickAction(
    editorToolRadiusSet,
    toolSize + 0.2
  );
  const onDecreaseToolSize = useClickAction(
    editorToolRadiusSet,
    toolSize - 0.2
  );
  const onPointerClick = useClickAction(editorToolSet, "pointer");
  const onEraserClick = useClickAction(editorToolSet, "eraser");
  const onBonesClick = useClickAction(editorToolSet, "paint-danger-zone");
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
