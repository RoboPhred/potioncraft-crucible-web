import { parse } from "yaml";

export function parseYaml(
  yaml: string,
  resolveImport: (resourcePath: string) => string
): any {
  // TODO: resolve imports
  return parse(yaml, { merge: true });
}
