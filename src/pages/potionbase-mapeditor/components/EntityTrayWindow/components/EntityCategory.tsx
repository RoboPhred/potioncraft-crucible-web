import * as React from "react";
import { useTranslation } from "react-i18next";

import { EntityTrayItemData } from "../types";

import styles from "../EntityTrayWindow.module.css";

import EntityTrayItem from "./EntityTrayItem";

export interface EntityCategoryProps {
  i18nKey: string;
  entities: EntityTrayItemData[];
}

const EntityCategory = ({ i18nKey, entities }: EntityCategoryProps) => {
  const { t } = useTranslation();
  return (
    <>
      <li className={styles["entity-tray-category"]}>{t(i18nKey)}</li>
      {entities.map((entity, i) => (
        <EntityTrayItem key={i} entity={entity} />
      ))}
    </>
  );
};

export default EntityCategory;
