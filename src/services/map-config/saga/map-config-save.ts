import { SagaIterator } from "redux-saga";
import { call, select, takeEvery } from "redux-saga/effects";
import { saveAs } from "file-saver";

import { AppState } from "@/state";

import { ACTION_MAPCONFIG_SAVE } from "@/actions/map-config-save";
import { mapFileSelector } from "../selectors/mapfile";

export default function* projectSaveSaga() {
  yield takeEvery(ACTION_MAPCONFIG_SAVE, saveProject);
}

function* saveProject() {
  const state: AppState = yield select();

  const projectName = "potioncraft map";

  try {
    if (window.showSaveFilePicker) {
      yield call(saveNativeFileApi, state, projectName);
    } else {
      yield call(saveLegacy, state, projectName);
    }
  } catch (e) {
    // TODO: Report error
    console.warn("Failed to save project", e);
  }
}

function* saveNativeFileApi(
  state: AppState,
  projectName: string
): SagaIterator {
  const fileHandle: FileHandle | null = yield call(window.showSaveFilePicker!, {
    // This isn't official yet, even with the not-official showSaveFilePicker
    // https://github.com/WICG/file-system-access/blob/main/SuggestedNameAndDir.md#specifying-suggested-file-name-to-save-as
    // It's so new, chrome does not yet support it, but it will:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1145102
    suggestedName: projectName,
    types: [
      {
        description: "PotionCraft Maps",
        accept: {
          "application/json": [".json"],
        },
      },
    ],
  });

  if (!fileHandle) {
    return;
  }

  // Some confusion over how to get the name of the file...
  // fileHandle.name appears in the debugger for chrome, but does not
  // seem to be documented.
  // getFile().name is documented by mozilla, but gives me undefined.
  let name = fileHandle.name;
  if (!name) {
    name = fileHandle.getFile().name;
  }
  if (name) {
    name = name.substr(0, name.lastIndexOf(".json"));
  }

  const save = mapFileSelector(state);

  const writable: FileSystemWritableStream = yield call(
    fileHandle.createWritable.bind(fileHandle)
  );
  yield call(writable.write.bind(writable), JSON.stringify(save, null, 2));
  yield call(writable.close.bind(writable));
}

function* saveLegacy(state: AppState, projectName: string): SagaIterator {
  const save = mapFileSelector(state);
  const blob = new Blob([JSON.stringify(save, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  saveAs(blob, `${projectName}.json`);
}
