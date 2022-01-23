import { forEach } from "lodash";

export type StringKeysOf<T> = {
  [K in keyof T]: T[K] extends string | undefined ? K : never;
}[keyof T];

export function merge<TObj, TExtra extends Record<string, any>>(
  obj: TObj,
  extra: TExtra
): TObj & TExtra {
  for (const key in extra) {
    (obj as any)[key] = extra[key];
  }
  return obj as any;
}
