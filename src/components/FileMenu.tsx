import React from "react";
import { useTranslation } from "react-i18next";

import { loadingStatusSelector } from "@/services/map-config/selectors/loading-status";

import { mapConfigLoadBlank } from "@/actions/map-config-load-blank";
import { mapConfigLoadTemplate } from "@/actions/map-config-load-template";
import { mapConfigSave } from "@/actions/map-config-save";

import { useClickAction } from "@/hooks/use-action";
import { useSelector } from "@/hooks/use-selector";

import Menu from "@/components/Menus/Menu";
import MenuItem from "@/components/Menus/MenuItem";
import DividerMenuItem from "@/components/Menus/DividerMenuItem";
import SubMenuItem from "@/components/Menus/SubMenuItem";

import AbstractLoadButton from "./AbstractLoadButton";

const FileMenu = () => {
  const { t } = useTranslation();
  const loadingStatus = useSelector(loadingStatusSelector);
  const onNewBlankMap = useClickAction(mapConfigLoadBlank);
  const onSaveMap = useClickAction(mapConfigSave);
  return (
    <Menu>
      <MenuItem onClick={onNewBlankMap}>{t("map.new.blank")}</MenuItem>
      <SubMenuItem content={<MapFromTemplateMenu />}>
        {t("map.new.template")}
      </SubMenuItem>
      <DividerMenuItem />
      <AbstractLoadButton>
        {({ disabled, onClick }) => (
          <MenuItem
            autoDismissMenu={false}
            disabled={disabled}
            onClick={onClick}
          >
            Load Map
          </MenuItem>
        )}
      </AbstractLoadButton>
      <DividerMenuItem />
      <MenuItem disabled={loadingStatus !== "loaded"} onClick={onSaveMap}>
        {t("map.save")}
      </MenuItem>
    </Menu>
  );
};

const MapFromTemplateMenu = () => {
  const { t } = useTranslation();
  const onNewWaterMap = useClickAction(mapConfigLoadTemplate, "water");
  const onNewOilMap = useClickAction(mapConfigLoadTemplate, "oil");
  return (
    <Menu>
      <MenuItem onClick={onNewWaterMap}>
        {t("potioncraft:bases.water_titlecase")}
      </MenuItem>
      <MenuItem onClick={onNewOilMap}>
        {t("potioncraft:bases.oil_titlecase")}
      </MenuItem>
    </Menu>
  );
};

export default FileMenu;
