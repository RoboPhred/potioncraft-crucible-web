import * as React from "react";
import { Circle } from "react-konva";

import { DangerZonePartMapEntity } from "@/services/map-config/entities";

export interface DangerZonePartProps extends DangerZonePartMapEntity {}

const DangerZonePart: React.FC<DangerZonePartProps> = (props) => {
  return <Circle fill="black" radius={0.2} x={props.x} y={props.y} />;
};

export default DangerZonePart;
