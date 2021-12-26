import * as React from "react";
import { RouteComponentProps } from "react-router";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { useSelector } from "@/hooks/use-selector";

import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import { packageDataSetById } from "@/actions/packages/package-data-set-byid";

import Window from "@/components/Window";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import CommitTextBox from "@/components/CommitTextBox";

import styles from "./PotionEffectPage.module.css";

interface PotionEffectPageParams {
  potionEffectId: string;
}

const PotionEffectPage = ({
  match: {
    params: { potionEffectId },
  },
}: RouteComponentProps<PotionEffectPageParams>) => {
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

  return (
    <>
      <EnsurePackageLoaded />
      <HorizontalPageFlow>
        <Window
          className={styles["potioneffect-editor"]}
          title="Potion Effects"
        >
          <CommitTextBox
            value={potionEffect?.name}
            placeholder="Effect Name"
            onCommit={onSetName}
          />
        </Window>
      </HorizontalPageFlow>
    </>
  );
};

export default PotionEffectPage;
