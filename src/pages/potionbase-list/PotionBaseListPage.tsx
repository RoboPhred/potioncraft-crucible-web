import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { packageIdObjectNew } from "@/actions/packages/package-idobject-new";

import { useSelector } from "@/hooks/use-selector";

import Button from "@/components/Button";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";

import { packageIdObjectIdsSelector } from "@/services/package/selectors/package";

import Modal from "@/components/Modal";
import TextBox from "@/components/TextBox";

import SingleWindowPageFlow from "@/components/SingleWindowPageFlow";

const PotionBasesPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const potionBaseIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionBases")
  );

  const [newPotionId, setNewPotionId] = React.useState<string | null>(null);

  const onRequestNewPotionBase = React.useCallback(() => {
    setNewPotionId("");
  }, []);
  const onNewPotionBase = React.useCallback(() => {
    if (newPotionId != null && newPotionId.length > 0) {
      setNewPotionId(null);
      dispatch(packageIdObjectNew("potionBases", newPotionId));
    }
  }, [newPotionId]);

  return (
    <>
      <EnsurePackageLoaded />
      <SingleWindowPageFlow title={t("potion_base.noun_titlecase_plural")}>
        <ul>
          {potionBaseIds.map((potionBaseId) => (
            <li key={potionBaseId}>
              <Link to={`/potion-bases/${potionBaseId}`}>{potionBaseId}</Link>
            </li>
          ))}
        </ul>
        <Button onClick={onRequestNewPotionBase}>{t("potion_base.new")}</Button>
        <Modal isOpen={newPotionId != null}>
          <p>{t("potion_base.new_id_prompt")}</p>
          <div>
            <TextBox
              autoFocus
              value={newPotionId!}
              onChange={(e) => setNewPotionId(e.target.value)}
            />
          </div>
          <div>
            <Button
              disabled={newPotionId == null || newPotionId == ""}
              onClick={onNewPotionBase}
            >
              {t("potion_base.new")}
            </Button>
          </div>
        </Modal>
      </SingleWindowPageFlow>
    </>
  );
};

export default PotionBasesPage;
