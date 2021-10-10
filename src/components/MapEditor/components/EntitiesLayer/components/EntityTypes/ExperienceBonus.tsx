import * as React from "react";
import { Circle } from "react-konva";

import { ExperienceBonusMapEntity } from "@/services/map-config/entities";

export interface ExperienceBonusProps extends ExperienceBonusMapEntity {}

const ExperienceBonus: React.FC<ExperienceBonusProps> = (props) => {
  return <Circle fill="green" radius={0.3} x={props.x} y={props.y} />;
};

export default ExperienceBonus;
