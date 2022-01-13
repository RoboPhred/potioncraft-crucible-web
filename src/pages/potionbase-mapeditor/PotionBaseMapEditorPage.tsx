import * as React from "react";
import { RouteChildrenProps } from "react-router";
import { useDispatch } from "react-redux";

import history from "@/history";

import { potionBaseMapEdit } from "@/actions/potion-bases/map-edit";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import Page from "@/components/Page";

import MapWindow from "./components/MapWindow";
import MapMenuButton from "./components/MapMenuButton";

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
      <Page titlebarContent={<MapMenuButton />}>
        <MapWindow />
      </Page>
    </>
  );
};

export default PotionBaseMapEditorPage;
