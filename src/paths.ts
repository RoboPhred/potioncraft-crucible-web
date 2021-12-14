export function extname(path: string): string {
  const idx = path.lastIndexOf(".");
  return idx === -1 ? "" : path.substring(idx);
}
