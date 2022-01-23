import * as React from "react";
import { useDispatch } from "react-redux";

import { ItemOf } from "@/arrays";
import { extname } from "@/paths";

import { useSelector } from "@/hooks/use-selector";

import { packageResourceSetById } from "@/actions/packages/package-resource-set-byid";

import {
  packageIdObjectDataSelector,
  packageIdObjectResourceSelector,
} from "../selectors/package";
import {
  CruciblePackageSectionItem,
  CruciblePackageSectionKey,
} from "../types";

// TODO: Move to utilities.
export type StringKeysOf<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

export function useIdObjectResource<T extends CruciblePackageSectionKey>(
  objectType: T,
  objectId: string,
  resourceKey: StringKeysOf<CruciblePackageSectionItem<T>>
): [
  Uint8Array | null,
  string | null,
  (image: Uint8Array, imageName: string) => void
] {
  const dispatch = useDispatch();
  const idObject = useSelector((state) =>
    packageIdObjectDataSelector(state, objectType, objectId)
  );

  const currentValue = idObject != null ? idObject[resourceKey] : null;

  return [
    useSelector(
      (state) =>
        packageIdObjectResourceSelector(
          state,
          objectType,
          objectId,
          resourceKey
        ) as any
    ),
    currentValue as any,
    React.useCallback(
      (image: Uint8Array, imageName: string) => {
        dispatch(
          packageResourceSetById(
            objectType,
            objectId,
            resourceKey,
            `${objectId}/${resourceKey}.${extname(imageName)}`,
            image
          )
        );
      },
      [objectId]
    ),
  ];
}
