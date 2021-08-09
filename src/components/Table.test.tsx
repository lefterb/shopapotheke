import { shallow, mount } from "enzyme"
import React from "react"

import Table from "./Table"
import Row from "./Row"
import { TableProps } from "../types"

const mockedRepositories = [
  {
    id: 1,
    name: "mock1",
    stars: 300,
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
    name: "mock2",
    stars: 500,
    forks: 2,
    watchers: 3,
    description: "mocked description",
    owner: "mockedOwner",
    avatarURL: "randomurlexample",
    language: "javascript",
    url: "randomurl"
  }
]

describe("Table component tests", () => {
  const mockedProps: TableProps = {
    repositories: [],
    staredRepositoriesIds: [],
    tableType: "fetched",
    totalItems: 0,
    itemsPerPage: 10,
    currentPage: 0,
    onSettingsChange: jest.fn()
  }

  it("renders without crashing", () => {
    shallow(<Table {...mockedProps} />)
  })

  it("accepts props", () => {
    const wrapper = mount(<Table {...mockedProps} />)
    expect(wrapper.props().itemsPerPage).toEqual(mockedProps.itemsPerPage)
  })

  it("renders a table with 2 rows (repositories)", () => {
    const updatedMockedProps = {
      ...mockedProps,
      repositories: mockedRepositories,
      totalItems: 1
    }
    const wrapper = shallow(<Table {...updatedMockedProps} />)
    const renderedRows = wrapper.find(Row)

    expect(renderedRows.length).toEqual(updatedMockedProps.repositories.length)
  })
})
