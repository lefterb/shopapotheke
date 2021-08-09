import { runSaga } from "redux-saga"

import {
  requestingGetRepositoriesFlow as requestingGetRepositoriesSaga,
  updateSettingsFlow as updateSettingsSaga
} from "./respositories"

import apiCalls from "../api"

import {
  requestingGetRepositories,
  getRepositories,
  updateTotalItems,
  errorGetRepositories
} from "../actions"

import { Action as IAction } from "typesafe-actions"
import { IRepository } from "../../types"

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

describe("requestingGetRepositoriesSaga", () => {
  it("should call github endpoint from express server and return found repositories", async () => {
    const requestGetRepositories: jest.SpyInstance = jest
      .spyOn(apiCalls, "getRepositories")
      .mockImplementation(() =>
        Promise.resolve({
          success: true,
          data: {
            totalItems: 10000,
            repositories: mockedRepositories
          }
        })
      )

    const dispatched: Array<IAction> = []

    const mockedStore = {
      getState: () => ({
        repositories: {
          settings: {
            currentPage: 0
          }
        }
      }),
      dispatch: (action: IAction) => dispatched.push(action)
    }

    await runSaga(mockedStore, requestingGetRepositoriesSaga)

    expect(requestGetRepositories).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([
      getRepositories(mockedRepositories),
      updateTotalItems(10000)
    ])

    requestGetRepositories.mockClear()
  })

  it("should call github endpoint from express server and fail", async () => {
    const requestGetRepositories: jest.SpyInstance = jest
      .spyOn(apiCalls, "getRepositories")
      .mockImplementation(() =>
        Promise.resolve({
          success: false,
          data: {
            totalItems: 10000,
            repositories: mockedRepositories
          }
        })
      )

    const dispatched: Array<IAction> = []

    const mockedStore = {
      getState: () => ({
        repositories: {
          settings: {
            currentPage: 0
          }
        }
      }),
      dispatch: (action: IAction) => dispatched.push(action)
    }

    await runSaga(mockedStore, requestingGetRepositoriesSaga)

    expect(requestGetRepositories).toHaveBeenCalledTimes(1)
    expect(dispatched).toEqual([
      errorGetRepositories("An error has occurred while fetching the data.")
    ])

    requestGetRepositories.mockClear()
  })

  it("should call github endpoint but fail before going to the server", async () => {
    const requestGetRepositories: jest.SpyInstance = jest
      .spyOn(apiCalls, "getRepositories")
      .mockImplementation(() =>
        Promise.resolve({
          success: false
        })
      )

    const dispatched: Array<IAction> = []

    const mockedStore = {
      getState: () => "missing state object",
      dispatch: (action: IAction) => dispatched.push(action)
    }

    await runSaga(mockedStore, requestingGetRepositoriesSaga)

    expect(requestGetRepositories).toHaveBeenCalledTimes(0)
    expect(dispatched).toEqual([errorGetRepositories("An error occured !")])

    requestGetRepositories.mockClear()
  })
})

describe("updateSettingsSaga", () => {
  it("should call the getting repositories from github saga", async () => {
    const dispatched: Array<IAction> = []
    const mockedStore = {
      dispatch: (action: IAction) => dispatched.push(action)
    }

    await runSaga(mockedStore, updateSettingsSaga)

    expect(dispatched).toEqual([requestingGetRepositories()])
  })
})
