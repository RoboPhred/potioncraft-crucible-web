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
import { CruciblePackage } from "../types";

export function usePotionBaseResource(
  potionBaseId: string,
  resourceKey: keyof ItemOf<CruciblePackage["potionBases"]>
): [
  Uint8Array | null,
  string | null,
  (image: Uint8Array, imageName: string) => void
] {
  const dispatch = useDispatch();
  const potionBase = useSelector((state) =>
    packageIdObjectDataSelector(state, "potionBases", potionBaseId)
  );

  return [
    useSelector(
      (state) =>
        packageIdObjectResourceSelector(
          state,
          "potionBases",
          potionBaseId,
          resourceKey
        ) as any
    ),
    potionBase?.name ?? null,
    React.useCallback(
      (image: Uint8Array, imageName: string) => {
        dispatch(
          packageResourceSetById(
            "potionBases",
            potionBaseId,
            resourceKey,
            `${potionBaseId}/${resourceKey}.${extname(imageName)}`,
            image
          )
        );
      },
      [potionBaseId]
    ),
  ];
}
