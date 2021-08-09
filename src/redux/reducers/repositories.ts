import { Reducer } from "redux"
import {
  GET_REPOSITORIES,
  REQUESTING_GET_REPOSITORIES,
  ERROR_GET_REPOSITORIES,
  GET_STARED_REPOSITORIES,
  REMOVE_STAR_REPOSITORY,
  STAR_REPOSITORY,
  UPDATE_TOTAL_ITEMS,
  UPDATE_SETTINGS
} from "../constants"

import { getLastWeek } from "../../libs/utils"

import { IRepositoriesState } from "../../types/index"
import { ERROR_UPDATE_SETTINGS } from "../constants"

import {
  getStoredRepositories as getStoredRepositoriesHelper,
  removeRepositoryFromStorage as removeRepositoryFromStorageHelper,
  saveRepositoriesToStorage as saveRepositoriesToStorageHelper
} from "../../libs/localStorage"

export const initialState: IRepositoriesState = {
  repositories: [],
  totalItems: 0,
  staredRepositories: [],
  settings: {
    itemsPerPage: 10,
    currentPage: 0,
    language: "",
    date: getLastWeek()
  },
  helpers: {
    requesting: false,
    success: false,
    error: false
  }
}

const RepositoriesReducer: Reducer<IRepositoriesState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case REQUESTING_GET_REPOSITORIES:
      return {
        ...state,
        helpers: {
          ...state.helpers,
          success: false,
          requesting: true,
          error: false
        }
      }

    case GET_REPOSITORIES: {
      return {
        ...state,
        helpers: {
          ...state.helpers,
          requesting: false,
          success: true
        },
        repositories: [...action.payload]
      }
    }

    case ERROR_GET_REPOSITORIES:
      return {
        ...state,
        helpers: {
          ...state.helpers,
          requesting: false,
          error: true
        }
      }

    case GET_STARED_REPOSITORIES: {
      const staredRepositories = getStoredRepositoriesHelper()
      return {
        ...state,
        staredRepositories
      }
    }

    case REMOVE_STAR_REPOSITORY: {
      removeRepositoryFromStorageHelper(action.payload)
      const staredRepositories = getStoredRepositoriesHelper()
      return {
        ...state,
        staredRepositories
      }
    }

    case STAR_REPOSITORY: {
      saveRepositoriesToStorageHelper(action.payload)
      const staredRepositories = getStoredRepositoriesHelper()
      return {
        ...state,
        staredRepositories
      }
    }

    case UPDATE_TOTAL_ITEMS: {
      return {
        ...state,
        totalItems: action.payload
      }
    }

    case UPDATE_SETTINGS: {
      const updatedSettings = {
        ...state.settings,
        ...action.payload
      }

      return {
        ...state,
        settings: updatedSettings
      }
    }

    case ERROR_UPDATE_SETTINGS: {
      return {
        ...state,
        helpers: {
          ...state.helpers,
          error: true,
          requesting: false
        }
      }
    }

    default:
      return state
  }
}

export default RepositoriesReducer
