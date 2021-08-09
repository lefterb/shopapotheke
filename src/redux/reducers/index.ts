import { combineReducers } from "redux"

import repositoriesReducers, {
  initialState as repositoriesState
} from "./repositories"

export const initialState = {
  ...repositoriesState
}

const rootReducer = combineReducers({
  repositories: repositoriesReducers
})

export default rootReducer
