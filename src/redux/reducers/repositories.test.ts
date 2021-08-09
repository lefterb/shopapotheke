import reducer from "./repositories"
import { getLastWeek } from "../../libs/utils"

import {
  IRepositoriesState,
  IRepository,
  SettingsData
} from "../../types/index"

const mockedInitialState: IRepositoriesState = {
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

const mockedRepositories: Array<IRepository> = [
  {
    id: 1,
    name: "mock1",
    stars: 1,
    forks: 2,
    watchers: 3,
    description: "mocked description",
    owner: "mockedOwner",
    avatarURL: "randomurlexample",
    language: "javascript",
    url: "randomurl"
  },
  {
    id: 2,
    name: "mock1",
    stars: 1,
    forks: 2,
    watchers: 3,
    description: "mocked description",
    owner: "mockedOwner",
    avatarURL: "randomurlexample",
    language: "javascript",
    url: "randomurl"
  },
  {
    id: 3,
    name: "mock1",
    stars: 1,
    forks: 2,
    watchers: 3,
    description: "mocked description",
    owner: "mockedOwner",
    avatarURL: "randomurlexample",
    language: "javascript",
    url: "randomurl"
  }
]

describe("Repositories reducer", () => {
  const initialState = mockedInitialState

  it("returns the initial state", () => {
    expect(reducer(initialState, { type: "" })).toEqual(initialState)
  })

  it("should handle REQUESTING_GET_REPOSITORIES", () => {
    const newState = reducer(initialState, {
      type: "REQUESTING_GET_REPOSITORIES"
    })

    expect(newState.helpers.requesting).toEqual(true)
    expect(newState.helpers.success).toEqual(false)
    expect(newState.helpers.success).toEqual(false)
  })

  it("should handle GET_REPOSITORIES", () => {
    const actionPayload = mockedRepositories
    const newState = reducer(initialState, {
      type: "GET_REPOSITORIES",
      payload: actionPayload
    })

    expect(!newState.helpers.requesting && newState.helpers.success).toEqual(
      true
    )
    expect(newState.repositories).toEqual(actionPayload)
  })

  it("should handle ERROR_GET_REPOSITORIES", () => {
    const newState = reducer(initialState, { type: "ERROR_GET_REPOSITORIES" })

    expect(!newState.helpers.requesting && newState.helpers.error).toEqual(true)
  })

  it("should handle STAR_REPOSITORY", () => {
    const newState = reducer(initialState, {
      type: "STAR_REPOSITORY",
      payload: mockedRepositories[0]
    })
    expect(newState.staredRepositories).toEqual([mockedRepositories[0]])
  })

  it("should handle REMOVE_STAR_REPOSITORY", () => {
    let newState = reducer(initialState, {
      type: "STAR_REPOSITORY",
      payload: mockedRepositories[0]
    })
    newState = reducer(newState, {
      type: "STAR_REPOSITORY",
      payload: mockedRepositories[1]
    })
    newState = reducer(newState, {
      type: "STAR_REPOSITORY",
      payload: mockedRepositories[2]
    })

    newState = reducer(newState, {
      type: "REMOVE_STAR_REPOSITORY",
      payload: mockedRepositories[0].id
    })
    expect(newState.staredRepositories).toEqual([
      mockedRepositories[1],
      mockedRepositories[2]
    ])
  })

  it("should handle GET_STARED_REPOSITORIES", () => {
    let newState = reducer(initialState, {
      type: "STAR_REPOSITORY",
      payload: mockedRepositories[0]
    })
    newState = reducer(newState, {
      type: "STAR_REPOSITORY",
      payload: mockedRepositories[1]
    })
    newState = reducer(newState, {
      type: "STAR_REPOSITORY",
      payload: mockedRepositories[2]
    })

    newState = reducer(newState, { type: "GET_STARED_REPOSITORIES" })
    expect(newState.staredRepositories).toEqual([
      mockedRepositories[0],
      mockedRepositories[1],
      mockedRepositories[2]
    ])
  })

  it("should handle UPDATE_TOTAL_ITEMS", () => {
    const mockedTotalItems = 20000

    const newState = reducer(initialState, {
      type: "UPDATE_TOTAL_ITEMS",
      payload: mockedTotalItems
    })

    expect(newState.totalItems).toEqual(mockedTotalItems)
  })

  it("should handle UPDATE_SETTINGS", () => {
    const mockedSettings: SettingsData = {
      itemsPerPage: 30
    }

    const newState = reducer(initialState, {
      type: "UPDATE_SETTINGS",
      payload: mockedSettings
    })

    expect(newState.settings.itemsPerPage).toEqual(mockedSettings.itemsPerPage)
  })

  it("should handle ERROR_UPDATE_SETTINGS", () => {
    const newState = reducer(initialState, { type: "ERROR_UPDATE_SETTINGS" })

    expect(!newState.helpers.requesting && newState.helpers.error).toEqual(true)
  })
})
