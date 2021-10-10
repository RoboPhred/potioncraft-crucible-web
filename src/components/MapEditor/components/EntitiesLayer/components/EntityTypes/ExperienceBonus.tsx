import * as React from "react";

import { ExperienceBonusMapEntity } from "@/services/map-config/entities";

export interface ExperienceBonusProps extends ExperienceBonusMapEntity {}

const ExperienceBonus: React.FC<ExperienceBonusProps> = (props) => {
  return <circle fill="green" r={0.3} cx={props.x} cy={props.y} />;
};

export default ExperienceBonus;
