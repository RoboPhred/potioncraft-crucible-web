import * as React from "react";
import { Layer } from "react-konva";

import { useSelector } from "@/hooks/use-selector";

import { entityIdsInViewSelector } from "@/services/editor-view/selectors/entities";
import { isDraggingSelector } from "@/services/editor-drag/selectors/drag";

import MapCoordinateSpace from "../MapCoordinateSpace";

import Entity from "./components/Entity";
import PotionOrigin from "./components/PotionOrigin";

const EntitiesLayer = () => {
  const entityKeys = useSelector(entityIdsInViewSelector);
  const isDragging = useSelector(isDraggingSelector);

  const entityComponents = React.useMemo(
    () => entityKeys.map((key) => <Entity key={key} entityId={key} />),
    [entityKeys]
  );

  console.log("EntitiesLayer render", entityKeys.length);

  return (
    <Layer listening={!isDragging}>
      <MapCoordinateSpace>
        <PotionOrigin />
        {entityComponents}
      </MapCoordinateSpace>
    </Layer>
  );
};

export default EntitiesLayer;
