export type MaybeArray<T> = T | T[];
export function asArray<T>(x: MaybeArray<T>): T[] {
  return Array.isArray(x) ? x : [x];
}
