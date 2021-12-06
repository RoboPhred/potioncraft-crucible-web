import { entries } from "lodash";
import { loadAsync } from "jszip";
import { call, put, takeLatest } from "@redux-saga/core/effects";
import { SagaIterator } from "@redux-saga/types";

import {
  ACTION_PACKAGE_LOAD_FILE,
  PackageLoadFileAction,
} from "@/actions/packages/package-load-file";
import { packageLoadError } from "@/actions/packages/package-load-error";
import { packageReceive } from "@/actions/packages/package-receive";

export default function* packageLoadFileSaga() {
  yield takeLatest(ACTION_PACKAGE_LOAD_FILE, handlePackageLoadFile);
}

function* handlePackageLoadFile(action: PackageLoadFileAction): SagaIterator {
  const { file } = action.payload;

  try {
    if (!file.name.endsWith(".zip")) {
      throw new Error("Only zipped Crucible packages are supported.");
    }

    const packageId = file.name.replace(/\.zip$/, "");
    const buffer: ArrayBuffer = yield call(() => file.arrayBuffer());

    // jszip typings don't actually export the value returned by loadAsync...
    const zip: Awaited<ReturnType<typeof loadAsync>> = yield call(() =>
      loadAsync(buffer)
    );

    const resources: Record<string, Uint8Array> = {};
    yield call(() =>
      Promise.all(
        entries(zip.files).map(([resourcePath, resource]) => {
          return resource.async("uint8array").then((data) => {
            resources[resourcePath] = data;
          });
        })
      )
    );

    if (resources["package.yml"] == null) {
      throw new Error("Package does not contain a package.yml file.");
    }

    yield put(packageReceive(packageId, resources));
  } catch (e: any) {
    yield put(packageLoadError(e.message ?? String(e)));
  }
}
