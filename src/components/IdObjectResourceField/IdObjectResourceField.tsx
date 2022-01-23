import * as React from "react";
import { useDispatch } from "react-redux";

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
  resourceName?: string;
}

const IdObjectResourceField = ({
  sectionKey,
  objectId,
  resourceKey,
  accept,
  resourceName,
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
            resourceName ?? file.name,
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
      <span>{hasResource ? obj[resourceKey] : "<none>"}</span>
      <AbstractFileLoadButton accept={accept} onFileLoaded={onFileLoaded}>
        {(props) => (
          <Button {...props}>{hasResource ? "Change" : "Upload"}</Button>
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
