import { all } from "redux-saga/effects"

import repositoriesSagas from "./respositories"

export default function* rootSaga(): Generator {
  yield all([...repositoriesSagas])
}
