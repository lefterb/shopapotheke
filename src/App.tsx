import React, { Fragment, ReactElement, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components";

// actions
import {
  requestingGetRepositories as requestingGetRepositoriesAction,
  getStaredRepositories as getStaredRepositoriesAction,
  updateSettings as updateSettingsAction
} from "./redux/actions"

// selectors
import {
  getRepositories as getRepositoriesSelector,
  getStaredRepositories as getStarredRepositoriesSelector,
  getStaredRepositoriesIds as getStaredRepositoriesIdsSelector,
  getTotalRepositories as getTotalRepositoriesSelector
} from "./redux/selectors"

// components
import Header from "./components/Header"
import Table from "./components/Table"
import TabsWrapper from "./components/TabsWrapper"
// import Filter from "./components/Filter";

// type definitions
import { SettingsData } from "./types/index"

const SectionWrapper = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;


const App = (): ReactElement => {
  const dispatch = useDispatch()

  const repositories = useSelector(getRepositoriesSelector)
  const totalRepositories = useSelector(getTotalRepositoriesSelector)
  const staredRepositories = useSelector(getStarredRepositoriesSelector)
  const staredRepositoriesIds = useSelector(getStaredRepositoriesIdsSelector)

  useEffect(() => {
    dispatch(getStaredRepositoriesAction())
    dispatch(requestingGetRepositoriesAction())
  }, [])

  const onSettingsChange = (newSettings: SettingsData): void => {
    dispatch(updateSettingsAction(newSettings))
  }

  return (
    <Fragment>
      <Header />
      <SectionWrapper>
        <TabsWrapper>
          <Table
            tableType="fetched"
            tabName="Popular Repositories"
            repositories={repositories}
            staredRepositoriesIds={staredRepositoriesIds}
            totalItems={totalRepositories}
            onSettingsChange={onSettingsChange}
          />
          <Table
            tableType="stared"
            tabName="Stared Repositories"
            repositories={staredRepositories}
            staredRepositoriesIds={staredRepositoriesIds}
            totalItems={staredRepositories.length}
          />
        </TabsWrapper>
      </SectionWrapper>
    </Fragment>
  )
}

export default App
