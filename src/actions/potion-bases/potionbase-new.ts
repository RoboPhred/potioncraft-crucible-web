import { AnyAction } from "redux";

export const ACTION_POTIONBASE_NEW = "potionbase-new" as const;
export const potionBaseNew = () => ({
  type: ACTION_POTIONBASE_NEW,
});
export type PotionBaseNewAction = ReturnType<typeof potionBaseNew>;
export function isPotionBaseNewAction(
  action: AnyAction
): action is PotionBaseNewAction {
  return action.type === ACTION_POTIONBASE_NEW;
}
