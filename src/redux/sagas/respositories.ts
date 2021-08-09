import { takeLatest, call, all, put, select } from "redux-saga/effects"

import apiCalls from "../api"

import { REQUESTING_GET_REPOSITORIES, UPDATE_SETTINGS } from "../constants"

import {
  getRepositories,
  updateTotalItems,
  errorGetRepositories,
  errorUpdateSettings,
  requestingGetRepositories
} from "../actions"
import { IAppState, SettingsData } from "../../types/index"

/* eslint-disable-next-line */
export function* requestingGetRepositoriesFlow(): any {
  try {
    const settings: SettingsData = yield select(
      (state: IAppState) => state.repositories.settings
    )

    const { success, data } = yield call(apiCalls.getRepositories, settings)

    if (!success) {
      yield put(
        errorGetRepositories("An error has occurred while fetching the data.")
      )
      return
    }

    const { repositories, totalItems } = data

    yield put(getRepositories(repositories))
    yield put(updateTotalItems(totalItems))
  } catch (error) {
    yield put(errorGetRepositories("An error occured !"))
  }
}

/* eslint-disable-next-line */
export function* updateSettingsFlow(): any {
  try {
    yield put(requestingGetRepositories())
  } catch (error) {
    yield put(errorUpdateSettings("An error occured !"))
  }
}

function* respositoriesWatcher(): Generator {
  yield all([
    takeLatest(REQUESTING_GET_REPOSITORIES, requestingGetRepositoriesFlow),
    takeLatest(UPDATE_SETTINGS, updateSettingsFlow)
  ])
}

export default [respositoriesWatcher()]
