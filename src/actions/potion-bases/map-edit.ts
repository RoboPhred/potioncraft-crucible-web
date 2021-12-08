import { AnyAction } from "redux";

export const ACTION_POTIONBASE_MAP_EDIT = "potionbase-map-edit" as const;
export const potionBaseMapEdit = (potionBaseId: string) => ({
  type: ACTION_POTIONBASE_MAP_EDIT,
  payload: { potionBaseId },
});
export type PotionBaseMapEditAction = ReturnType<typeof potionBaseMapEdit>;
export function isPotionBaseMapEditAction(
  action: AnyAction
): action is PotionBaseMapEditAction {
  return action.type === ACTION_POTIONBASE_MAP_EDIT;
}
