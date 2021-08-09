import { mount } from "enzyme"
import React, { ReactElement } from "react"
import { Provider } from "react-redux"

import configureStore from "../redux/store"

import Row from "./Row"
import { RowProps } from "../types"

interface RowWrapperProps {
  children: ReactElement | Array<ReactElement>
}

const RowWrapper = ({ children }: RowWrapperProps) => (
  <table>
    <tbody>{children}</tbody>
  </table>
)

describe("Row component tests", () => {
  beforeAll(() => {
    jest.mock("react-redux", () => {
      const { Provider, useSelector } = jest.requireActual("react-redux")

      return {
        useDispatch: jest.fn(),
        // we ensure that these are original
        useSelector,
        Provider
      }
    })
  })

  const mockedRepo = {
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
  }

  const mockedProps: RowProps = {
    rowType: "fetched",
    isOdd: false,
    stared: false,
    repoData: mockedRepo
  }

  it("renders without crashing", () => {
    mount(
      <RowWrapper>
        <Row {...mockedProps} />
      </RowWrapper>,
      {
        wrappingComponent: Provider,
        wrappingComponentProps: { store: configureStore() }
      }
    )
  })

  it("accepts props", () => {
    const wrapper = mount(
      <RowWrapper>
        <Row {...mockedProps} />
      </RowWrapper>,
      {
        wrappingComponent: Provider,
        wrappingComponentProps: { store: configureStore() }
      }
    )

    const RowElement = wrapper.find(Row)

    expect(RowElement.props().rowType).toEqual(mockedProps.rowType)
    expect(RowElement.props().repoData.id).toEqual(mockedProps.repoData.id)
  })

  it("renders a row with repository data", () => {
    const wrapper = mount(
      <RowWrapper>
        <Row {...mockedProps} />
      </RowWrapper>,
      {
        wrappingComponent: Provider,
        wrappingComponentProps: { store: configureStore() }
      }
    )

    const tdElements = wrapper.find("td")

    const normalCellsAmount = 4
    const detailedCell = 1

    expect(tdElements.length).toEqual(normalCellsAmount + detailedCell)
    expect(tdElements.get(1).props.children).toEqual(mockedRepo.name)
    expect(tdElements.get(2).props.children).toEqual(mockedRepo.stars)
  })

  afterAll(() => {
    jest.clearAllMocks()
  })
})
