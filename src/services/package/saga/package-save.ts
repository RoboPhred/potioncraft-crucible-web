import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { saveAs } from "file-saver";
import JSZip from "jszip";

import { ACTION_PACKAGE_SAVE } from "@/actions/packages/package-save";
import { editorCommit } from "@/actions/editors/commit";

import { packageResourcesSelector } from "../selectors/resources";
import { packageIdSelector } from "../selectors/package";

export default function* projectSaveSaga() {
  yield takeEvery(ACTION_PACKAGE_SAVE, savePackage);
}

function* savePackage() {
  const packageId: string | null = yield select(packageIdSelector);
  if (!packageId) {
    return;
  }

  yield put(editorCommit());

  const zipData: Uint8Array = yield call(buildZip);
  try {
    if (window.showSaveFilePicker) {
      yield call(saveNativeFileApi, zipData, packageId);
    } else {
      yield call(saveLegacy, zipData, packageId);
    }
  } catch (e) {
    // TODO: Report error
    console.warn("Failed to save project", e);
  }
}

function* buildZip(): SagaIterator<Uint8Array> {
  const resources: Record<string, Uint8Array> = yield select(
    packageResourcesSelector
  );

  const zip = new JSZip();
  for (const key of Object.keys(resources)) {
    const resource = resources[key];
    zip.file(key, resource, { binary: true });
  }

  const result = yield call(() =>
    zip.generateAsync({ type: "uint8array", compression: "DEFLATE" })
  );

  return result;
}

function* saveNativeFileApi(
  zipData: Uint8Array,
  packageId: string
): SagaIterator {
  const fileHandle: FileHandle | null = yield call(window.showSaveFilePicker!, {
    // This isn't official yet, even with the not-official showSaveFilePicker
    // https://github.com/WICG/file-system-access/blob/main/SuggestedNameAndDir.md#specifying-suggested-file-name-to-save-as
    // It's so new, chrome does not yet support it, but it will:
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1145102
    suggestedName: packageId,
    types: [
      {
        description: "Crucible Packages",
        accept: {
          "application/zip": [".zip"],
        },
      },
    ],
  });

  if (!fileHandle) {
    return;
  }

  const writable: FileSystemWritableStream = yield call(
    fileHandle.createWritable.bind(fileHandle)
  );
  yield call(writable.write.bind(writable), zipData);
  yield call(writable.close.bind(writable));
}

function* saveLegacy(zipData: Uint8Array, packageId: string): SagaIterator {
  const blob = new Blob([zipData], {
    type: "application/zip",
  });

  saveAs(blob, `${packageId}.zip`);
}
