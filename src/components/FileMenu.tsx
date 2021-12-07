import React from "react";
import { useTranslation } from "react-i18next";

import { loadingStatusSelector } from "@/services/map-config/selectors/loading-status";

import { mapConfigLoadBlank } from "@/actions/map-config-load-blank";
import { mapConfigLoadTemplate } from "@/actions/map-config-load-template";
import { mapConfigSave } from "@/actions/map-config-save";
import { packageSave } from "@/actions/packages/package-save";

import { useAction, useClickAction } from "@/hooks/use-action";
import { useSelector } from "@/hooks/use-selector";

import useLoadMapConfig from "@/services/map-config/hooks/use-load-map-file";
import useLoadPackage from "@/services/package/hooks/use-load-package";

import Menu from "@/components/Menus/Menu";
import MenuItem from "@/components/Menus/MenuItem";
import DividerMenuItem from "@/components/Menus/DividerMenuItem";
import SubMenuItem from "@/components/Menus/SubMenuItem";
import { useMenuCloseContext } from "@/components/Menus/MenuCloseContext";
import AbstractFileLoadButton from "@/components/AbstractFileLoadButton";

const FileMenu = () => {
  const { t } = useTranslation();
  const { loadStatus, onLoadPackage } = useLoadPackage();
  const requestMenuClose = useMenuCloseContext();
  const onSave = useAction(packageSave);
  return (
    <Menu>
      <AbstractFileLoadButton
        disabled={loadStatus == "loading"}
        accept=".zip"
        onFileLoaded={onLoadPackage}
        onInteractionComplete={requestMenuClose}
      >
        {({ disabled, onClick }) => (
          <MenuItem
            autoDismissMenu={false}
            disabled={disabled}
            onClick={onClick}
          >
            {t("package.load")}
          </MenuItem>
        )}
      </AbstractFileLoadButton>
      <MenuItem onClick={onSave}>{t("package.save")}</MenuItem>
      <DividerMenuItem />
      <SubMenuItem content={<LegacyMapMenu />}>Legacy Map Editor</SubMenuItem>
    </Menu>
  );
};

const LegacyMapMenu = () => {
  const { t } = useTranslation();
  const loadingStatus = useSelector(loadingStatusSelector);
  const onNewBlankMap = useClickAction(mapConfigLoadBlank);
  const onSaveMap = useClickAction(mapConfigSave);
  const requestMenuClose = useMenuCloseContext();
  const { disabled, onLoadSave } = useLoadMapConfig();
  return (
    <Menu>
      <MenuItem onClick={onNewBlankMap}>{t("map.new.blank")}</MenuItem>
      <SubMenuItem content={<MapFromTemplateMenu />}>
        {t("map.new.template")}
      </SubMenuItem>
      <DividerMenuItem />
      <AbstractFileLoadButton
        disabled={disabled}
        accept={".json"}
        onFileLoaded={onLoadSave}
        onInteractionComplete={requestMenuClose}
      >
        {({ disabled, onClick }) => (
          <MenuItem
            autoDismissMenu={false}
            disabled={disabled}
            onClick={onClick}
          >
            Load Map
          </MenuItem>
        )}
      </AbstractFileLoadButton>
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
