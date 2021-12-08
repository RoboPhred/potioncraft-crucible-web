import * as React from "react";
import { useTranslation } from "react-i18next";

import { useClickAction } from "@/hooks/use-action";

import { potionBaseNew } from "@/actions/potion-bases/potionbase-new";

import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import Window from "@/components/Window";
import Button from "@/components/Button";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";

import styles from "./PotionBasesPage.module.css";

const PotionBasesPage = () => {
  const { t } = useTranslation();
  const onNewPotionBase = useClickAction(potionBaseNew);
  return (
    <>
      <EnsurePackageLoaded />
      <HorizontalPageFlow>
        <Window
          className={styles["potionbases-editor"]}
          title={t("potion_base.noun_titlecase_plural")}
        >
          <Button onClick={onNewPotionBase}>{t("potion_base.new")}</Button>
        </Window>
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBasesPage;
