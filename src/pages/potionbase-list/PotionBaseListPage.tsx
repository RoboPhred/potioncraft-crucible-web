import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";

import { potionBaseNew } from "@/actions/potion-bases/potionbase-new";

import HorizontalPageFlow from "@/components/HorizontalPageFlow";
import Window from "@/components/Window";
import Button from "@/components/Button";
import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";

import { potionBaseIdsSelector } from "@/services/package/selectors/potion-bases";

import styles from "./PotionBaseListPage.module.css";
import Modal from "@/components/Modal/Modal";
import TextBox from "@/components/TextBox";

const PotionBasesPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const potionBaseIds = useSelector(potionBaseIdsSelector);

  const [newPotionId, setNewPotionId] = React.useState<string | null>(null);

  const onRequestNewPotionBase = React.useCallback(() => {
    setNewPotionId("");
  }, []);
  const onNewPotionBase = React.useCallback(() => {
    if (newPotionId != null) {
      dispatch(potionBaseNew(newPotionId));
    }
  }, [newPotionId]);

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
          <Button onClick={onRequestNewPotionBase}>
            {t("potion_base.new")}
          </Button>
          <Modal isOpen={newPotionId != null}>
            <p>
              Choose the new potion base id. This must be unique among all
              potion bases added by this package. Once an id is chosen, it
              cannot be changed.
            </p>
            <div>
              <TextBox
                value={newPotionId!}
                onChange={(e) => setNewPotionId(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={onNewPotionBase}>Create potion base</Button>
            </div>
          </Modal>
        </Window>
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBasesPage;
