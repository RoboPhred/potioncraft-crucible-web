import * as React from "react";
import omit from "lodash/omit";
import { useDrag } from "react-dnd";
import { useTranslation } from "react-i18next";

import {
  DRAGOBJECT_NEW_ENTITY,
  newEntityDragObject,
} from "@/drag-items/new-entity";

import { EntityDefsByType } from "@/entities";

import { useBooleanSetState } from "@/hooks/use-boolean-state";

import { SpawnableEntityPrototype } from "@/services/map-editor/entities/types";
import { renderResourcesSelector } from "@/services/map-editor/entities/selectors/render-resources";

import Tooltip from "@/components/Tooltip/Tooltip";

import styles from "./EntitiesDropButton.module.css";
import { useSelector } from "@/hooks/use-selector";

export interface EntitiesDropListProps {
  entityPrototypes: SpawnableEntityPrototype[];
}

const PotionEffectDragList = ({ entityPrototypes }: EntitiesDropListProps) => {
  return (
    <ul className={styles["entities-drop-list"]}>
      {entityPrototypes.map((entityPrototype, i) => (
        <PotionEffectDraggableItem key={i} entityPrototype={entityPrototype} />
      ))}
    </ul>
  );
};

export default PotionEffectDragList;

interface EntityDropListItemProps {
  entityPrototype: SpawnableEntityPrototype;
}

const PotionEffectDraggableItem = ({
  entityPrototype,
}: EntityDropListItemProps) => {
  const [selfRef, setSelfRef] = React.useState<HTMLLIElement | null>(null);
  const { entityType, i18nKey, displayName } = entityPrototype;
  const { t } = useTranslation();
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [, dragRef] = useDrag({
    type: DRAGOBJECT_NEW_ENTITY,
    item: newEntityDragObject(
      omit(entityPrototype, ["i18nKey", "displayName"])
    ),
  });
  const [isShowingTooltip, showTooltip, hideTooltip] = useBooleanSetState();
  const renderResources = useSelector(renderResourcesSelector);

  React.useLayoutEffect(() => {
    const type = EntityDefsByType[entityType];
    const canvas = canvasRef.current;
    if (!canvas || !type) {
      return;
    }

    const ctx = canvas.getContext("2d")!;
    ctx.scale(30, 30);
    ctx.translate(0.5, 0.55);
    ctx.scale(1, -1);
    type.render(ctx, entityPrototype, () => {}, renderResources);
  }, [entityType, renderResources]);

  return (
    <li
      className={styles["entities-drop-list-item"]}
      ref={(ref) => {
        dragRef(ref);
        setSelfRef(ref);
      }}
      onMouseOut={hideTooltip}
      onClick={showTooltip}
    >
      <span>
        <canvas ref={canvasRef} width={30} height={30} />
      </span>
      <span>{i18nKey ? t(i18nKey) : displayName}</span>
      <Tooltip anchorEl={selfRef} isOpen={isShowingTooltip}>
        {t("entities.message_click_drag_create")}
      </Tooltip>
    </li>
  );
};
