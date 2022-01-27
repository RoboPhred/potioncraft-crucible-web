import * as React from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faFileUpload } from "@fortawesome/free-solid-svg-icons";

import { extname } from "@/paths";
import { merge, StringKeysOf } from "@/object-utils";

import { useSelector } from "@/hooks/use-selector";
import {
  CruciblePackageSectionItem,
  CruciblePackageSectionKey,
} from "@/services/package/types";
import { packageIdObjectDataSelector } from "@/services/package/selectors/package";

import { packageResourceSetById } from "@/actions/packages/package-resource-set-byid";

import AbstractFileLoadButton from "../AbstractFileLoadButton";
import Button from "../Button";

export interface IdObjectResourceFieldProps<
  TKey extends CruciblePackageSectionKey = any
> {
  sectionKey: TKey;
  objectId: string;
  resourceKey: StringKeysOf<CruciblePackageSectionItem<TKey>>;
  accept: string;
  resourceName: string;
  children?: React.ReactNode;
}

const IdObjectResourceField = ({
  sectionKey,
  objectId,
  resourceKey,
  accept,
  resourceName,
  children,
}: IdObjectResourceFieldProps) => {
  const dispatch = useDispatch();
  const obj = useSelector((state) =>
    packageIdObjectDataSelector(state, sectionKey, objectId)
  );

  const onFileLoaded = React.useCallback(
    (file: File) => {
      file.arrayBuffer().then((buffer) => {
        dispatch(
          packageResourceSetById(
            sectionKey,
            objectId,
            resourceKey,
            `${resourceName}.${extname(file.name)}`,
            new Uint8Array(buffer)
          )
        );
      });
    },
    [sectionKey, objectId, resourceKey, resourceName]
  );

  if (!obj) {
    return null;
  }

  const hasResource = obj[resourceKey] != null;

  return (
    <div>
      {hasResource && <FontAwesomeIcon fixedWidth icon={faCheck} />}
      {children && <span>{children}</span>}
      <AbstractFileLoadButton accept={accept} onFileLoaded={onFileLoaded}>
        {(props) => (
          <Button {...props}>
            <FontAwesomeIcon color="inherit" icon={faFileUpload} />
          </Button>
        )}
      </AbstractFileLoadButton>
    </div>
  );
};

export default merge(IdObjectResourceField, {
  ofType:
    <TKey extends CruciblePackageSectionKey>(sectionKey: TKey) =>
    (props: Omit<IdObjectResourceFieldProps<TKey>, "sectionKey">) =>
      <IdObjectResourceField {...(props as any)} sectionKey={sectionKey} />,
});
