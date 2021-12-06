import { parse, CST, Document } from "yaml";

export function parseYaml(
  yaml: string,
  resolveImport: (resourcePath: string) => string
): any {
  // Frustratingly, the Tag interface is not exported from yaml.
  const importTag = {
    identify: (value: any) => false,
    tag: "!import",
    resolve: (doc: Document, cst: CST.Node) => {
      const resourcePath = (cst as CST.PlainValue).strValue;
      if (!resourcePath) {
        throw new Error("Invalid import path");
      }
      const imported = resolveImport(resourcePath);
      return parse(imported, { merge: true, customTags: [importTag] });
    },
  };
  return parse(yaml, { merge: true, customTags: [importTag] });
}
