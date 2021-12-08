import * as React from "react";
import { RouteChildrenProps } from "react-router";
import { useDispatch } from "react-redux";

import history from "@/history";

import { potionBaseMapEdit } from "@/actions/potion-bases/map-edit";

import EnsurePackageLoaded from "@/components/EnsurePackageLoaded";
import HorizontalPageFlow from "@/components/HorizontalPageFlow";

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
    } else {
      history.push("/");
    }
  }, [potionBaseId]);

  return (
    <>
      <EnsurePackageLoaded />
      <HorizontalPageFlow>
        <MapWindow />
        <EntitiesWindow />
      </HorizontalPageFlow>
    </>
  );
};

export default PotionBaseMapEditorPage;
