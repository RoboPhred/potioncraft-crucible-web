export const KEYMAP_DELETE = "keymap:MapEditor/Delete" as const;

const keymap = {
  [KEYMAP_DELETE]: ["backspace", "del"],
};
export default keymap;

export type KeymapKeys = keyof typeof keymap;
export type HotkeyHandler = (keyEvent?: KeyboardEvent) => void;
export type KeymapHandler = Record<KeymapKeys, HotkeyHandler>;
