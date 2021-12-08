import * as React from "react";
import { useTranslation } from "react-i18next";

import { useClickAction } from "@/hooks/use-action";

import Menu from "@/components/Menus/Menu";
import MenuItem from "@/components/Menus/MenuItem";
import SubMenuItem from "@/components/Menus/SubMenuItem";
import DividerMenuItem from "@/components/Menus/DividerMenuItem";
import AutoPopover from "@/components/AutoPopover";
import Button from "@/components/Button";

import { mapEditorMapClear } from "@/actions/map-editor/map-clear";
import { mapEditorMapImportTemplate } from "@/actions/map-editor/map-import-template";

const MapMenuButton = () => {
  const { t } = useTranslation();
  return (
    <AutoPopover content={<MapMenu />} placement="bottom-start">
      <Button variant="menu">{t("map.toolbar_menu_item")}</Button>
    </AutoPopover>
  );
};

export default MapMenuButton;

const MapMenu = () => {
  const { t } = useTranslation();
  const onMapClear = useClickAction(mapEditorMapClear);
  return (
    <Menu>
      <SubMenuItem content={<MapImportMenu />}>{t("map.import")}</SubMenuItem>
      <DividerMenuItem />
      <MenuItem onClick={onMapClear}>{t("map.clear")}</MenuItem>
    </Menu>
  );
};

const MapImportMenu = () => {
  const { t } = useTranslation();
  return (
    <Menu>
      <SubMenuItem content={<MapImportTemplateMenu />}>
        {t("map.import_template")}
      </SubMenuItem>
      <MenuItem disabled={true}>{t("map.import_file")}</MenuItem>
    </Menu>
  );
};

const MapImportTemplateMenu = () => {
  const { t } = useTranslation();
  const onNewWaterMap = useClickAction(mapEditorMapImportTemplate, "water");
  const onNewOilMap = useClickAction(mapEditorMapImportTemplate, "oil");
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
