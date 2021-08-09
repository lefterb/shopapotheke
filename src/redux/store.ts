import { applyMiddleware, createStore, compose, Store } from "redux"
import createSagaMiddleware from "redux-saga"
import { composeWithDevTools } from "redux-devtools-extension"

import rootReducer from "./reducers"
import rootSaga from "./sagas"

const rootState = {}

// setup the middleware to watch Reducers and Actions interractions
const sagaMiddleware = createSagaMiddleware()

const composeSetup =
  process.env.NODE_ENV !== "production" && typeof window === "object"
    ? composeWithDevTools({})
    : compose()
const enhancer = composeSetup(applyMiddleware(sagaMiddleware)) // allows redux devtools to watch sagas

export default function configureStore(): Store {
  const store = createStore(rootReducer, rootState, enhancer)
  sagaMiddleware.run(rootSaga)
  return store
}
