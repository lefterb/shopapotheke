// npm i --save-dev jest-fetch-mock
// npm install --save-dev redux-saga-test-plan

import {
  getRepositories,
  getStaredRepositories,
  getStaredRepositoriesIds,
  getTotalRepositories
} from "./index"
import { IAppState, IRepository } from "../../types"

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
  }
]

// getRepositories()
describe("getRepositories selector", () => {
  let state: IAppState

  beforeEach(() => {
    state = {
      repositories: {
        repositories: [],
        totalItems: 0,
        settings: {},
        staredRepositories: [],
        helpers: {}
      }
    }
  })

  it("should return an empty list of repositories", () => {
    const repositories = getRepositories(state)
    expect(repositories.length).toEqual(0)
  })

  it("should return the repositories available in the state", () => {
    state.repositories.repositories = mockedRepositories
    const repositories = getRepositories(state)
    expect(repositories.length).toEqual(mockedRepositories.length)
  })
})

// getStaredRepositories()
describe("getStaredRepositories selector", () => {
  let state: IAppState

  beforeEach(() => {
    state = {
      repositories: {
        repositories: [],
        totalItems: 0,
        settings: {},
        staredRepositories: [],
        helpers: {}
      }
    }
  })

  it("should return an empty list of stared repositories", () => {
    const repositories = getStaredRepositories(state)
    expect(repositories.length).toEqual(0)
  })

  it("should return the stared repositories available in the state", () => {
    const mockedStaredRepositories = [
      ...mockedRepositories,
      mockedRepositories[0]
    ]
    state.repositories.staredRepositories = mockedStaredRepositories
    const repositories = getStaredRepositories(state)

    expect(repositories.length).toEqual(mockedStaredRepositories.length)
  })
})

// getStaredRepositoriesIds()
describe("getStaredRepositoriesIds selector", () => {
  let state: IAppState

  beforeEach(() => {
    state = {
      repositories: {
        repositories: [],
        totalItems: 0,
        settings: {},
        staredRepositories: [],
        helpers: {}
      }
    }
  })

  it("should return an empty list of stared repositories ids", () => {
    const repositoriesIds = getStaredRepositoriesIds(state)
    expect(repositoriesIds.length).toEqual(0)
  })

  it("should return a list of the available stared repository ids", () => {
    const mockedStaredRepositories = [...mockedRepositories]
    state.repositories.staredRepositories = mockedStaredRepositories

    const repositoriesIds = getStaredRepositoriesIds(state)

    expect(repositoriesIds.length).toEqual(mockedStaredRepositories.length)
    expect(repositoriesIds[0]).toEqual(mockedStaredRepositories[0].id)
  })
})

// getTotalRepositories()
describe("getTotalRepositories selector", () => {
  let state: IAppState

  beforeEach(() => {
    state = {
      repositories: {
        repositories: [],
        totalItems: 0,
        settings: {},
        staredRepositories: [],
        helpers: {}
      }
    }
  })

  test("returns 0 total items", () => {
    expect(getTotalRepositories(state)).toEqual(0)
  })

  test("returns the totalItems value ", () => {
    const mockedTotalItems = 20
    state.repositories.totalItems = mockedTotalItems

    expect(getTotalRepositories(state)).toEqual(mockedTotalItems)
  })
})
