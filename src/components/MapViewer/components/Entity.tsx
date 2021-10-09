import React from "react";

import { entityByKeySelector } from "@/services/map-config/selectors/entities";
import { MapEntity } from "@/services/map-config/entities";

import { useSelector } from "@/hooks/use-selector";

import PotionEffect from "./PotionEffect";
import Vortex from "./Vortex";
import DangerZonePart from "./DangerZonePart";

export interface EntityProps {
  entityKey: string;
}

const Entity = ({ entityKey }: EntityProps) => {
  const entity = useSelector((state) => entityByKeySelector(state, entityKey));

  if (!entity) {
    return null;
  }

  return entityToComponent(entity);
};

function entityToComponent(entity: MapEntity) {
  switch (entity.entityType) {
    case "PotionEffect":
      return <PotionEffect {...entity} />;
    case "Vortex":
      return <Vortex {...entity} />;
    case "DangerZonePart":
      return <DangerZonePart {...entity} />;
  }

  return null;
}

export default Entity;
