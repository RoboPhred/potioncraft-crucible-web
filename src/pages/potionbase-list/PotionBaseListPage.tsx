import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useClickAction } from "@/hooks/use-action";

import { potionBaseNew } from "@/actions/potion-bases/potionbase-new";

import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import Window from "@/components/Window";
import Button from "@/components/Button";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";

import { potionBaseIdsSelector } from "@/services/package/selectors/potion-bases";

import styles from "./PotionBaseListPage.module.css";

const PotionBasesPage = () => {
  const { t } = useTranslation();
  const onNewPotionBase = useClickAction(potionBaseNew);
  const potionBaseIds = useSelector(potionBaseIdsSelector);

  return (
    <>
      <EnsurePackageLoaded />
      <HorizontalPageFlow>
        <Window
          className={styles["potionbases-editor"]}
          title={t("potion_base.noun_titlecase_plural")}
        >
          <ul>
            {potionBaseIds.map((potionBaseId) => (
              <li key={potionBaseId}>
                <Link to={`/potion-bases/${potionBaseId}`}>{potionBaseId}</Link>
              </li>
            ))}
          </ul>
          <Button onClick={onNewPotionBase}>{t("potion_base.new")}</Button>
        </Window>
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBasesPage;
