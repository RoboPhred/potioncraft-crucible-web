import * as React from "react";

import { PotionEffectMapEntity } from "@/services/map-config/entities";

export interface PotionEffectProps extends PotionEffectMapEntity {}

const PotionEffect: React.FC<PotionEffectProps> = (props) => {
  return <circle fill="red" r={0.5} cx={props.x} cy={props.y} />;
};

export default PotionEffect;
