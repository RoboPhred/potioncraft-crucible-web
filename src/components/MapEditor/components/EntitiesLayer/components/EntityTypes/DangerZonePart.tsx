import * as React from "react";

import { DangerZonePartMapEntity } from "@/services/map-config/entities";

export interface DangerZonePartProps extends DangerZonePartMapEntity {}

const DangerZonePart: React.FC<DangerZonePartProps> = (props) => {
  return <circle fill="black" r={0.2} cx={props.x} cy={props.y} />;
};

export default DangerZonePart;
