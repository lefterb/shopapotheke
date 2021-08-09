import { IRepository } from "../types"

export const saveRepositoriesToStorage = (repository: IRepository): void => {
  removeRepositoryFromStorage(repository.id)

  const updatedRepositories = getStoredRepositories()
  updatedRepositories.push(repository)

  localStorage.setItem("repositories", JSON.stringify(updatedRepositories))
}

export const getStoredRepositories = (): Array<IRepository> =>
  JSON.parse(localStorage.getItem("repositories") || "[]")

export const getStoredRepositoriesIds = (): Array<number> => {
  const storedRepositories = getStoredRepositories()
  return storedRepositories.map((repo) => repo.id)
}

export const removeRepositoryFromStorage = (repositoryId: number): void => {
  const savedRepositories = getStoredRepositories()

  const updatedRepositories = savedRepositories.filter(
    (repo) => repo.id !== repositoryId
  )
  localStorage.setItem("repositories", JSON.stringify(updatedRepositories))
}
