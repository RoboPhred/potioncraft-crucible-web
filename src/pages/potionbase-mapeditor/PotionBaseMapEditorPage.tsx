import * as React from "react";
import { RouteChildrenProps } from "react-router";
import { useDispatch } from "react-redux";

import { potionBaseMapEdit } from "@/actions/potionbase-edit-map";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import TitleBar from "@/components/TitleBar";
import DefaultTitlebarContent from "@/components/DefaultTitlebarContent";

import styles from "./PotionBaseMapEditorPage.module.css";
import MapWindow from "./components/MapWindow";
import EntitiesWindow from "./components/EntityTrayWindow";

export interface PotionBaseMapEditorPageParams {
  potionBaseId: string;
}

const PotionBaseMapEditorPage: React.FC<
  RouteChildrenProps<PotionBaseMapEditorPageParams>
> = ({ match }) => {
  const dispatch = useDispatch();
  const { potionBaseId } = match?.params ?? {};

  React.useEffect(() => {
    if (potionBaseId) {
      dispatch(potionBaseMapEdit(potionBaseId));
    }
  }, [potionBaseId]);

  return (
    <>
      <EnsurePackageLoaded />
      <div className={styles["editor-page"]}>
        <TitleBar>
          <DefaultTitlebarContent />
        </TitleBar>
        <div className={styles["editor-page-content"]}>
          <MapWindow />
          <EntitiesWindow />
        </div>
      </div>
    </>
  );
};

export default PotionBaseMapEditorPage;
