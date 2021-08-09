import { ReactNode } from "react"

export type IReactChildren = ReactNode | Array<ReactNode>

export interface IAppState {
  repositories: IRepositoriesState
}
export interface ISagaAPIResponse {
  success: boolean
  error?: Record<string, string>
  data?: Data
}

export interface Data {
  repositories?: Array<IRepository>
  totalItems: number
}
export interface QuerySettings {
  date?: string
  language?: string
  currentPage: number
  itemsPerPage: number
}

export interface SettingsData {
  currentPage?: number
  itemsPerPage?: number
  language?: string
  date?: Date
}
export interface IRepositoriesState {
  repositories: Array<IRepository>
  totalItems: number
  settings: SettingsData
  staredRepositories: Array<IRepository>
  helpers: Record<string, string | boolean>
}

export interface IRepository {
  id: number
  name: string
  stars: number
  forks: number
  watchers: number
  description: string
  owner: string
  avatarURL: string
  language: string
  url: string
  stared?: boolean
}

export interface TableProps {
  tabName?: string
  repositories: Array<IRepository>
  staredRepositoriesIds?: Array<number>
  tableType: "fetched" | "stared"
  totalItems: number
  itemsPerPage?: number
  currentPage?: number
  onSettingsChange?: (settingsData: SettingsData) => void
  onItemsPerRowChange?: (currentPage: number, newItemsPerPage: number) => void
}

export interface RowProps {
  rowType: "fetched" | "stared"
  isOdd: boolean
  stared: boolean
  repoData: IRepository
}
