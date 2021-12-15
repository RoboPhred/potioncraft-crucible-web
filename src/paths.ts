export function extname(path: string): string {
  const idx = path.lastIndexOf(".");
  return idx === -1 || idx + 1 == path.length ? "" : path.substring(idx + 1);
}
