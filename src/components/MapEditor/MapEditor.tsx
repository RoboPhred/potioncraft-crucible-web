import * as React from "react";
import classNames from "classnames";
import { AnyAction } from "redux";
import { HotKeys, ComponentProps } from "react-hotkeys";
import { useDispatch } from "react-redux";

import { selectionDelete } from "@/actions/selection-delete";

import PanZoomHandler from "./components/PanZoomHandler";
import MapCanvas from "./components/MapCanvas";
import MapWidgets from "./components/MapWidgets";

import keymap, { HotkeyHandler, KeymapHandler, KEYMAP_DELETE } from "./keymap";

import styles from "./MapEditor.module.css";

export interface MapEditorProps {
  className?: string;
}
const MapEditor = ({ className }: MapEditorProps) => {
  const dispatch = useDispatch();
  const keyHandlers = React.useMemo(() => {
    function createEventDispatcher(action: AnyAction): HotkeyHandler {
      return (e?: KeyboardEvent) => {
        if (e) {
          if (e.defaultPrevented) {
            return;
          }
          e.preventDefault();
        }
        dispatch(action);
      };
    }
    const keyHandlers: KeymapHandler = {
      [KEYMAP_DELETE]: createEventDispatcher(selectionDelete()),
    };
    return keyHandlers;
  }, []);

  return (
    <div className={classNames(className, "map-editor", styles["map-editor"])}>
      <HotKeys
        keyMap={keymap}
        handlers={keyHandlers}
        component={HotkeysContainer}
      >
        <PanZoomHandler className={styles["map-editor-container"]}>
          <MapCanvas className={styles["map-editor-item"]} />
          <MapWidgets className={styles["map-editor-item"]} />
        </PanZoomHandler>
      </HotKeys>
    </div>
  );
};

const HotkeysContainer: React.FC<ComponentProps> = ({ children, ...props }) => {
  return (
    // Mask ref type.  It is compatible, but HotKey typings are wonky.
    <div {...(props as any)} className={styles["hotkeys-container"]}>
      {children}
    </div>
  );
};

export default MapEditor;
