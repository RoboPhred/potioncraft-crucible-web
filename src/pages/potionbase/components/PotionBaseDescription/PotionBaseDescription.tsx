import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import { useSelector } from "@/hooks/use-selector";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import CommitTextArea from "@/components/CommitTextArea";

import styles from "./PotionBaseDescription.module.css";

export interface PotionBaseDescriptionProps {
  className?: string;
  potionBaseId: string;
}

const PotionBaseDescription = ({
  className,
  potionBaseId,
}: PotionBaseDescriptionProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const potionBase = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionBases", potionBaseId)
  );

  const onSetDescription = React.useCallback(
    (description: string) => {
      if (potionBase == null) {
        return;
      }
      dispatch(
        packageDataSetById(
          "potionBases",
          potionBaseId,
          "description",
          description
        )
      );
    },
    [potionBaseId]
  );

  if (!potionBase) {
    return null;
  }

  return (
    <div className={classNames(styles["potionbasedescription"], className)}>
      <CommitTextArea
        className={styles["potionbasedescription-input"]}
        placeholder={t("potion_base.description")}
        minRows={10}
        defaultValue={potionBase.description ?? ""}
        onCommit={onSetDescription}
      />
    </div>
  );
};

export default PotionBaseDescription;
