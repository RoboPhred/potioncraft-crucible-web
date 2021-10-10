import React from "react";
import { Group } from "react-konva";

import { entityFromKeySelector } from "@/services/map-config/selectors/entities";
import { MapEntity } from "@/services/map-config/entities";
import { isEntitySelectedSelector } from "@/services/editor-selection/selectors/selection";

import { useSelector } from "@/hooks/use-selector";

import { selectEntity } from "@/actions/select-entity";

import PotionEffect from "./EntityTypes/PotionEffect";
import Vortex from "./EntityTypes/Vortex";
import DangerZonePart from "./EntityTypes/DangerZonePart";
import ExperienceBonus from "./EntityTypes/ExperienceBonus";
import { useDispatch } from "react-redux";

export interface EntityProps {
  entityId: string;
}

const Entity = React.memo(({ entityId }: EntityProps) => {
  const dispatch = useDispatch();
  const entity = useSelector((state) => entityFromKeySelector(state, entityId));
  const isSelected = useSelector((state) =>
    isEntitySelectedSelector(state, entityId)
  );
  const onClick = React.useCallback(() => {
    dispatch(selectEntity(entityId));
  }, [entityId]);

  if (!entity) {
    return null;
  }

  const component = entityToComponent(entity);
  return <Group onClick={onClick}>{component}</Group>;
});

function entityToComponent(entity: MapEntity) {
  switch (entity.entityType) {
    case "PotionEffect":
      return <PotionEffect {...entity} />;
    case "Vortex":
      return <Vortex {...entity} />;
    case "DangerZonePart":
      return <DangerZonePart {...entity} />;
    case "ExperienceBonus":
      return <ExperienceBonus {...entity} />;
  }

  return null;
}

export default Entity;
