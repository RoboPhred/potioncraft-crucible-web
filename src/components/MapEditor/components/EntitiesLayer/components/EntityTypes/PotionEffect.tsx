import * as React from "react";
import { Circle } from "react-konva";

import { PotionEffectMapEntity } from "@/services/map-config/entities";

export interface PotionEffectProps extends PotionEffectMapEntity {}

const PotionEffect: React.FC<PotionEffectProps> = (props) => {
  return <Circle fill="red" radius={0.5} x={props.x} y={props.y} />;
};

export default PotionEffect;
