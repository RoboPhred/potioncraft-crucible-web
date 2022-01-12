import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import CommitTextBox from "@/components/CommitTextBox";

export interface PotionEffectNameProps {
  potionEffectId: string;
}

const PotionEffectName = ({ potionEffectId }: PotionEffectNameProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const potionEffect = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionEffects", potionEffectId)
  );

  const onSetName = React.useCallback(
    (name: string) => {
      dispatch(
        packageDataSetById("potionEffects", potionEffectId, "name", name)
      );
    },
    [potionEffectId]
  );

  if (!potionEffect) {
    return null;
  }

  return (
    <CommitTextBox
      value={potionEffect?.name ?? ""}
      placeholder={t("potion_effect.name")}
      onCommit={onSetName}
    />
  );
};

export default PotionEffectName;
