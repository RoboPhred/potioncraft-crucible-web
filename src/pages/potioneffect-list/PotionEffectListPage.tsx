import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { packageIdObjectNew } from "@/actions/packages/package-idobject-new";

import { useSelector } from "@/hooks/use-selector";

import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import Window from "@/components/Window";
import Button from "@/components/Button";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";

import { packageIdObjectIdsSelector } from "@/services/package/selectors/package";

import Modal from "@/components/Modal";
import TextBox from "@/components/TextBox";

import styles from "./PotionBaseListPage.module.css";

const PotionEffectsPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const potionEffectIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionEffects")
  );

  const [newEffectId, setNewEffectId] = React.useState<string | null>(null);

  const onRequestNewPotionEffect = React.useCallback(() => {
    setNewEffectId("");
  }, []);
  const onNewPotionEffect = React.useCallback(() => {
    if (newEffectId != null && newEffectId.length > 0) {
      dispatch(packageIdObjectNew("potionEffects", newEffectId));
    }
  }, [newEffectId]);

  return (
    <>
      <EnsurePackageLoaded />
      <HorizontalPageFlow>
        <Window
          className={styles["potioneffects-list"]}
          title={t("potion_effect.noun_titlecase_plural")}
        >
          <ul>
            {potionEffectIds.map((potionBaseId) => (
              <li key={potionBaseId}>
                <Link to={`/potion-effects/${potionBaseId}`}>
                  {potionBaseId}
                </Link>
              </li>
            ))}
          </ul>
          <Button onClick={onRequestNewPotionEffect}>
            {t("potion_effect.new")}
          </Button>
          <Modal isOpen={newEffectId != null}>
            <p>{t("potion_effect.new_id_prompt")}</p>
            <div>
              <TextBox
                autoFocus
                value={newEffectId!}
                onChange={(e) => setNewEffectId(e.target.value)}
              />
            </div>
            <div>
              <Button
                disabled={newEffectId == null || newEffectId == ""}
                onClick={onNewPotionEffect}
              >
                {t("potion_effect.new")}
              </Button>
            </div>
          </Modal>
        </Window>
      </HorizontalPageFlow>
    </>
  );
};

export default PotionEffectsPage;
