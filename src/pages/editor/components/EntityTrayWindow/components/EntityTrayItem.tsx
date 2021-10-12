import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";

import { EntityDefsByType } from "@/entities";

import {
  DRAGOBJECT_NEW_ENTITY,
  newEntityDragObject,
} from "@/drag-items/new-entity";

import { EntityTrayItemData } from "../types";

import styles from "../EntityTrayWindow.module.css";

export interface DraggableEntityProps {
  entity: EntityTrayItemData;
}

const EntityTrayItem = ({ entity }: DraggableEntityProps) => {
  const { entityType, i18nKey } = entity;
  const { t } = useTranslation();
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [, dragRef] = useDrag({
    type: DRAGOBJECT_NEW_ENTITY,
    item: newEntityDragObject(entity),
  });

  React.useLayoutEffect(() => {
    const type = EntityDefsByType[entityType];
    const canvas = canvasRef.current;
    if (!canvas || !type) {
      return;
    }

    const ctx = canvas.getContext("2d")!;
    ctx.scale(15, 15);
    ctx.translate(0.7, 0.7);
    ctx.scale(1, -1);
    type.render(ctx, entity, () => {});
  }, [entityType]);

  return (
    <li ref={dragRef} className={styles["entity-tray-item"]}>
      <span className={styles["entity-tray-item-preview"]}>
        <canvas ref={canvasRef} width={30} height={30} />
      </span>
      <span className={styles["entity-tray-item-text"]}>{t(i18nKey)}</span>
    </li>
  );
};

export default EntityTrayItem;
