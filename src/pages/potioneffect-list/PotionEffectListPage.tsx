import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import history from "@/history";

import { packageIdObjectNew } from "@/actions/packages/package-idobject-new";

import { useSelector } from "@/hooks/use-selector";

import Page from "@/components/Page";
import Flow from "@/components/Flow";
import Button from "@/components/Button";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";

import { packageIdObjectIdsSelector } from "@/services/package/selectors/package";

import Modal from "@/components/Modal";
import TextBox from "@/components/TextBox";

import PotionEffectListItem from "./components/PotionEffectListItem/PotionEffectListItem";

const PotionEffectsPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const potionEffectIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionEffects")
  );

  const [newEffectId, setNewEffectId] = React.useState<string | null>(null);

  const onRequestNewEffect = React.useCallback(() => {
    setNewEffectId("");
  }, []);
  const onCancelNewEffect = React.useCallback(() => {
    setNewEffectId(null);
  }, []);
  const onNewPotionEffect = React.useCallback(() => {
    setNewEffectId(null);
    if (newEffectId != null && newEffectId.length > 0) {
      dispatch(packageIdObjectNew("potionEffects", newEffectId));
      history.push(`/potion-effects/${newEffectId}`);
    }
  }, [newEffectId]);

  return (
    <>
      <EnsurePackageLoaded />
      <Page>
        <Flow>
          <ul>
            {potionEffectIds.map((potionEffectId) => (
              <li key={potionEffectId}>
                <PotionEffectListItem potionEffectId={potionEffectId} />
              </li>
            ))}
          </ul>
          <Button variant="primary" onClick={onRequestNewEffect}>
            {t("potion_effect.new")}
          </Button>
          <Modal
            isOpen={newEffectId != null}
            onRequestClose={onCancelNewEffect}
          >
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
        </Flow>
      </Page>
    </>
  );
};

export default PotionEffectsPage;
