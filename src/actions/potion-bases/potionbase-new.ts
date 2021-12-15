import { AnyAction } from "redux";

export const ACTION_POTIONBASE_NEW = "potionbase-new" as const;
export const potionBaseNew = (potionBaseId: string) => ({
  type: ACTION_POTIONBASE_NEW,
  payload: { potionBaseId },
});
export type PotionBaseNewAction = ReturnType<typeof potionBaseNew>;
export function isPotionBaseNewAction(
  action: AnyAction
): action is PotionBaseNewAction {
  return action.type === ACTION_POTIONBASE_NEW;
}
