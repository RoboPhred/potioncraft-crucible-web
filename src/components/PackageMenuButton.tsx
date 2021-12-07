import * as React from "react";
import { useTranslation } from "react-i18next";

import { packageSave } from "@/actions/packages/package-save";

import { useAction } from "@/hooks/use-action";

import useLoadPackage from "@/services/package/hooks/use-load-package";

import Menu from "@/components/Menus/Menu";
import MenuItem from "@/components/Menus/MenuItem";
import { useMenuCloseContext } from "@/components/Menus/MenuCloseContext";
import AbstractFileLoadButton from "@/components/AbstractFileLoadButton";

import AutoPopover from "./AutoPopover";
import Button from "./Button";

const PackageMenuButton = () => {
  const { t } = useTranslation();

  return (
    <AutoPopover content={<PackageMenu />} placement="bottom-start">
      <Button variant="menu">{t("package.toolbar_menu_item")}</Button>
    </AutoPopover>
  );
};

const PackageMenu = () => {
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
    </Menu>
  );
};

export default PackageMenuButton;
