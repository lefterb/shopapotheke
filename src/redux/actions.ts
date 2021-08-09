import { action, Action as IAction } from "typesafe-actions"

import { IRepository, SettingsData } from "../types"

import {
  REQUESTING_GET_REPOSITORIES,
  GET_REPOSITORIES,
  ERROR_GET_REPOSITORIES,
  STAR_REPOSITORY,
  GET_STARED_REPOSITORIES,
  REMOVE_STAR_REPOSITORY,
  UPDATE_TOTAL_ITEMS,
  UPDATE_SETTINGS,
  ERROR_UPDATE_SETTINGS
} from "./constants"

export const requestingGetRepositories = (): IAction =>
  action(REQUESTING_GET_REPOSITORIES)
export const getRepositories = (repositories: Array<IRepository>): IAction =>
  action(GET_REPOSITORIES, repositories)
export const errorGetRepositories = (message: string): IAction =>
  action(ERROR_GET_REPOSITORIES, message)

export const updateTotalItems = (totalItems: number): IAction =>
  action(UPDATE_TOTAL_ITEMS, totalItems)
export const updateSettings = (settingsData: SettingsData): IAction =>
  action(UPDATE_SETTINGS, settingsData)
export const errorUpdateSettings = (message: string): IAction =>
  action(ERROR_UPDATE_SETTINGS, message)

export const starRepository = (repositoryData: IRepository): IAction =>
  action(STAR_REPOSITORY, repositoryData)
export const removeStaredRepository = (repositoryId: number): IAction =>
  action(REMOVE_STAR_REPOSITORY, repositoryId)
export const getStaredRepositories = (): IAction =>
  action(GET_STARED_REPOSITORIES)
