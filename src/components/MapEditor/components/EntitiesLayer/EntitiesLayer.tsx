import * as React from "react";

import { useSelector } from "@/hooks/use-selector";

import { entitityKeysSelector } from "@/services/map-config/selectors/entities";

import MapCoordinateSpace from "../MapCoordinateSpace";

import Entity from "./components/Entity";
import PotionOrigin from "./components/PotionOrigin";
import MouseCatcher from "../MouseCatcher";

export interface EntitiesLayerProps {
  className: string;
}

const EntitiesLayer = ({ className }: EntitiesLayerProps) => {
  const entitiyKeys = useSelector(entitityKeysSelector);

  const entityComponents = React.useMemo(
    () => entitiyKeys.map((key) => <Entity key={key} entityId={key} />),
    [entitiyKeys]
  );

  return (
    <svg className={className}>
      <MouseCatcher />
      <MapCoordinateSpace>
        <PotionOrigin />
        {entityComponents}
      </MapCoordinateSpace>
    </svg>
  );
};

export default EntitiesLayer;
