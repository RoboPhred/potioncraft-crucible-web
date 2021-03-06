import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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

const PotionBaseListPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const potionBaseIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionBases")
  );

  const [newPotionId, setNewPotionId] = React.useState<string | null>(null);

  const onRequestNewPotionBase = React.useCallback(() => {
    setNewPotionId("");
  }, []);
  const onCancelNewPotionBase = React.useCallback(() => {
    setNewPotionId(null);
  }, []);
  const onNewPotionBase = React.useCallback(() => {
    if (newPotionId != null && newPotionId.length > 0) {
      setNewPotionId(null);
      dispatch(packageIdObjectNew("potionBases", newPotionId));
      history.push(`/potion-bases/${newPotionId}`);
    }
  }, [newPotionId]);

  return (
    <>
      <EnsurePackageLoaded />
      <Page>
        <Flow>
          <ul>
            {potionBaseIds.map((potionBaseId) => (
              <li key={potionBaseId}>
                <Link to={`/potion-bases/${potionBaseId}`}>{potionBaseId}</Link>
              </li>
            ))}
          </ul>
          <Button variant="primary" onClick={onRequestNewPotionBase}>
            {t("potion_base.new")}
          </Button>
          <Modal
            isOpen={newPotionId != null}
            onRequestClose={onCancelNewPotionBase}
          >
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
        </Flow>
      </Page>
    </>
  );
};

export default PotionBaseListPage;
