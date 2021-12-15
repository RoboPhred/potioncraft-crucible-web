import * as React from "react";
import { useTranslation } from "react-i18next";

import { packageSave } from "@/actions/packages/package-save";
import { packageNew } from "@/actions/packages/package-new";

import { useAction } from "@/hooks/use-action";

import useLoadPackage from "@/services/package/hooks/use-load-package";

import Menu from "@/components/Menus/Menu";
import MenuItem from "@/components/Menus/MenuItem";
import { useMenuCloseContext } from "@/components/Menus/MenuCloseContext";
import AbstractFileLoadButton from "@/components/AbstractFileLoadButton";

import AutoPopper from "./AutoPopper";
import Button from "./Button";

const PackageMenuButton = () => {
  const { t } = useTranslation();

  return (
    <AutoPopper content={<PackageMenu />} placement="bottom-start">
      <Button variant="menu">{t("package.noun_titlecase")}</Button>
    </AutoPopper>
  );
};

const PackageMenu = () => {
  const { t } = useTranslation();
  const { loadStatus, onLoadPackage } = useLoadPackage();
  const requestMenuClose = useMenuCloseContext();
  const onNew = useAction(packageNew);
  const onSave = useAction(packageSave);
  return (
    <Menu>
      <MenuItem onClick={onNew}>{t("package.new")}</MenuItem>
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
