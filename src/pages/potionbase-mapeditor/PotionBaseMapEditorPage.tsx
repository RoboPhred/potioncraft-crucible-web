import * as React from "react";
import { RouteChildrenProps } from "react-router";
import { useDispatch } from "react-redux";

import history from "@/history";

import { potionBaseMapEdit } from "@/actions/potion-bases/map-edit";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import TitleBar from "@/components/TitleBar";
import DefaultTitlebarContent from "@/components/DefaultTitlebarContent";
import PackageContentTree from "@/components/PackageContentTree";

import MapWindow from "./components/MapWindow";
import EntitiesWindow from "./components/EntityTrayWindow";
import MapMenuButton from "./components/MapMenuButton";

import styles from "./PotionBaseMapEditorPage.module.css";

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
    } else {
      history.push("/");
    }
  }, [potionBaseId]);

  return (
    <>
      <EnsurePackageLoaded />
      <div className={styles["editor-page"]}>
        <TitleBar>
          <DefaultTitlebarContent />
          <MapMenuButton />
        </TitleBar>
        <div className={styles["editor-page-content"]}>
          <PackageContentTree className={styles["package-content"]} />
          <MapWindow />
          <EntitiesWindow />
        </div>
      </div>
    </>
  );
};

export default PotionBaseMapEditorPage;
