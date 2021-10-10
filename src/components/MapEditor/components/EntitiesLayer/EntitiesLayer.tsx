import * as React from "react";

import { useSelector } from "@/hooks/use-selector";

import { entitityKeysSelector } from "@/services/map-config/selectors/entities";
import { isDraggingSelector } from "@/services/editor-drag/selectors/drag";

import MapCoordinateSpace from "../MapCoordinateSpace";

import Entity from "./components/Entity";
import PotionOrigin from "./components/PotionOrigin";
import { entityKeysInViewSelector } from "@/services/editor-view/selectors/entities";

const EntitiesLayer = () => {
  const entityKeys = useSelector(entityKeysInViewSelector);
  const isDragging = useSelector(isDraggingSelector);

  const entityComponents = React.useMemo(
    () => entityKeys.map((key) => <Entity key={key} entityId={key} />),
    [entityKeys]
  );

  console.log("EntitiesLayer render", entityKeys.length);

  return (
    <MapCoordinateSpace>
      <g style={{ pointerEvents: isDragging ? "none" : undefined }}>
        <PotionOrigin />
        {entityComponents}
      </g>
    </MapCoordinateSpace>
  );
};

export default EntitiesLayer;
