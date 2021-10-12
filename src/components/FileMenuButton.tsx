import * as React from "react";
import { useTranslation } from "react-i18next";

import AutoPopover from "./AutoPopover";
import Button from "./Button";
import FileMenu from "./FileMenu";

const FileMenuButton = () => {
  const { t } = useTranslation();

  return (
    <AutoPopover content={<FileMenu />} placement="bottom-start">
      <Button variant="menu">{t("menus.file.name")}</Button>
    </AutoPopover>
  );
};

export default FileMenuButton;
