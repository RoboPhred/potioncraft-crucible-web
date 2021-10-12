import * as React from "react";

import { EntityDefsByType } from "@/entities";

import styles from "../EntitiesWindow.module.css";
import { EntityPrototype } from "../types";

export interface DraggableEntityProps {
  entity: EntityPrototype;
}

const DraggableEntity = ({ entity }: DraggableEntityProps) => {
  const { entityType, displayName } = entity;
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
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
    <li className={styles["entity-item"]}>
      <span className={styles["entity-item-preview"]}>
        <canvas ref={canvasRef} width={30} height={30} />
      </span>
      <span className={styles["entity-item-text"]}>{displayName}</span>
    </li>
  );
};

export default DraggableEntity;
