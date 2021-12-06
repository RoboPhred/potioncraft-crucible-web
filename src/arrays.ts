export type MaybeArray<T> = T | T[];
export type ItemOf<T> = T extends Array<infer U> ? U : T;

export function asArray<T>(x: MaybeArray<T>): T[] {
  return Array.isArray(x) ? x : [x];
}

const _emptyArray = Object.freeze([] as any[]);
export function emptyFrozenArray<T>(): T[] {
  return _emptyArray as T[];
}
