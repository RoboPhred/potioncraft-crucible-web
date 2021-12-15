import { takeEvery } from "redux-saga/effects";

import {
  ACTION_POTIONBASE_NEW,
  PotionBaseNewAction,
} from "@/actions/potion-bases/potionbase-new";

import history from "@/history";

export default function* potionBaseNewSaga() {
  yield takeEvery(ACTION_POTIONBASE_NEW, handlePotionBaseNew);
}

function* handlePotionBaseNew(action: PotionBaseNewAction) {
  const { potionBaseId } = action.payload;
  history.push(`/potion-bases/${potionBaseId}`);
}
