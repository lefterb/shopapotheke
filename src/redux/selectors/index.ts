import { IAppState, IRepository } from "../../types"

export const getRepositories = (state: IAppState): Array<IRepository> =>
  state.repositories.repositories || []

export const getStaredRepositories = (state: IAppState): Array<IRepository> =>
  state.repositories.staredRepositories || []

export const getStaredRepositoriesIds = (state: IAppState): Array<number> => {
  const staredRepositories = getStaredRepositories(state)
  return staredRepositories.map((repo) => repo.id)
}

export const getTotalRepositories = (state: IAppState): number => {
  return state.repositories.totalItems || 0
}
