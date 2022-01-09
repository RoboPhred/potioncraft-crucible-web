import * as React from "react";
import { useTranslation } from "react-i18next";

import { useSelector } from "@/hooks/use-selector";

import { potionEffectEntityPrototypesSelector } from "@/services/map-entitiy-prototypes/selectors/potion-effects";

import EntitiesDropButton from "./EntitiesDropButton";

const PotionEffectsDropButton = () => {
  const effects = useSelector(potionEffectEntityPrototypesSelector);
  const { t } = useTranslation();
  return (
    <EntitiesDropButton entityPrototypes={effects}>
      {t("potion_effects.noun_titlecase_plural")}
    </EntitiesDropButton>
  );
};

export default PotionEffectsDropButton;