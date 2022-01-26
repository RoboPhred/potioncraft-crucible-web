import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import history from "@/history";

import { packageIdObjectNew } from "@/actions/packages/package-idobject-new";

import { useSelector } from "@/hooks/use-selector";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import Page from "@/components/Page";
import Flow from "@/components/Flow";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import TextBox from "@/components/TextBox";

import { packageIdObjectIdsSelector } from "@/services/package/selectors/package";

const IngredientsListPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const bottleIds = useSelector((state) =>
    packageIdObjectIdsSelector(state, "potionBottles")
  );

  const [newBottleId, setNewBottleId] = React.useState<string | null>(null);

  const onRequestNewIngredient = React.useCallback(() => {
    setNewBottleId("");
  }, []);
  const onNewBottle = React.useCallback(() => {
    if (newBottleId != null && newBottleId.length > 0) {
      setNewBottleId(null);
      dispatch(packageIdObjectNew("potionBottles", newBottleId));
      history.push(`/potion-bottles/${newBottleId}`);
    }
  }, [newBottleId]);

  return (
    <>
      <EnsurePackageLoaded />
      <Page>
        <Flow>
          <ul>
            {bottleIds.map((potionBaseId) => (
              <li key={potionBaseId}>
                <Link to={`/potion-bottles/${potionBaseId}`}>
                  {potionBaseId}
                </Link>
              </li>
            ))}
          </ul>
          <Button variant="primary" onClick={onRequestNewIngredient}>
            {t("potion_bottle.new")}
          </Button>
          <Modal isOpen={newBottleId != null}>
            <p>{t("potion_bottle.new_id_prompt")}</p>
            <div>
              <TextBox
                autoFocus
                value={newBottleId!}
                onChange={(e) => setNewBottleId(e.target.value)}
              />
            </div>
            <div>
              <Button
                disabled={newBottleId == null || newBottleId == ""}
                onClick={onNewBottle}
              >
                {t("potion_bottle.new")}
              </Button>
            </div>
          </Modal>
        </Flow>
      </Page>
    </>
  );
};

export default IngredientsListPage;
