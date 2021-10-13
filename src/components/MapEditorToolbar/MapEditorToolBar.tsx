import * as React from "react";

import { useClickAction } from "@/hooks/use-action";
import { useSelector } from "@/hooks/use-selector";

import { editorToolSet } from "@/actions/editor-tool-set";

import { currentToolSelector } from "@/services/editor-mouse/selectors/tools";

import ToolBar from "../ToolBar/ToolBar";
import ToggleButton from "../ToolBar/ToggleButton";

const MapEditorToolBar = () => {
  const currentTool = useSelector(currentToolSelector);
  const onPointerClick = useClickAction(editorToolSet, "pointer");
  const onEraserClick = useClickAction(editorToolSet, "eraser");
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
    </ToolBar>
  );
};

export default MapEditorToolBar;
