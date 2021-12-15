import * as React from "react";
import classNames from "classnames";

import { useClickAction } from "@/hooks/use-action";
import { useSelector } from "@/hooks/use-selector";

import { mapEditorToolSet } from "@/actions/map-editor/tool-set";

import {
  currentToolSelector,
  toolRadiusSelector,
} from "@/services/map-editor/mouse/selectors/tools";

import { mapEditorToolRadiusSet } from "@/actions/map-editor/tool-radius-set";

import Button from "../Button";

import PotionEffectsDropButton from "./components/PotionEffectsDropButton";
import BonesDropButton from "./components/BonesDropButton";

import styles from "./MapEditorToolbar.module.css";

export interface MapEditorToolBarProps {
  className?: string;
}
const MapEditorToolBar = ({ className }: MapEditorToolBarProps) => {
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
    <div className={classNames(styles["map-toolbar"], className)}>
      <Button
        variant={currentTool === "pointer" ? "primary" : "default"}
        onClick={onPointerClick}
      >
        Pointer
      </Button>
      <Button
        variant={currentTool === "eraser" ? "primary" : "default"}
        onClick={onEraserClick}
      >
        Eraser
      </Button>
      <Button
        variant={currentTool === "paint-danger-zone" ? "primary" : "default"}
        onClick={onBonesClick}
      >
        Bones
      </Button>
      Brush Size:
      <Button onClick={onDecreaseToolSize}>-</Button>
      {toolSize.toFixed(1)}
      <Button onClick={onIncreaseToolSize}>+</Button>
      <div className={styles["map-toolbar-entities"]}>
        <PotionEffectsDropButton />
        <BonesDropButton />
      </div>
    </div>
  );
};

export default MapEditorToolBar;
