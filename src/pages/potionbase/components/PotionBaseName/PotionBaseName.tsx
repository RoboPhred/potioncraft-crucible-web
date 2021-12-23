import * as React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";
import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import CommitTextBox from "@/components/CommitTextBox";

import styles from "./PotionBaseName.module.css";

export interface PotionBaseNameProps {
  potionBaseId: string;
}

const PotionBaseName = ({ potionBaseId }: PotionBaseNameProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const potionBase = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionBases", potionBaseId)
  );

  const onSetName = React.useCallback(
    (name: string) => {
      if (potionBase == null) {
        return;
      }
      dispatch(packageDataSetById("potionBases", potionBaseId, "name", name));
    },
    [potionBaseId]
  );

  if (!potionBase) {
    return null;
  }

  return (
    <div>
      <CommitTextBox
        className={styles["potionbasename-input"]}
        placeholder={t("potion_base.name")}
        value={potionBase.name ?? ""}
        onCommit={onSetName}
      />
    </div>
  );
};

export default PotionBaseName;
