import React, { Fragment, useState, ChangeEvent, ReactElement } from "react"

// material-ui components
import { Paper, Tabs, Tab } from "@material-ui/core"

// custom components
import TabPanel from "./TabPanel"

// type definitions
interface TabsProps {
  children: Array<ReactElement>
}

type HandleChangeEvent = ChangeEvent<Record<string, unknown>>

// main component
const TabsWrapper = ({ children }: TabsProps): ReactElement => {
  const [value, setValue] = useState(0)

  const handleChange = (event: HandleChangeEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Paper elevation={0}>
      {!children && <h1>No tab content</h1>}

      {children && children.length > 0 && (
        <Fragment>
          {/* dynamically built tabs */}
          <Tabs value={value} onChange={handleChange} centered={true}>
            {children.map(
              (child: ReactElement, index: number): ReactElement => {
                const id = `simple-tab-${index}`
                const label = child.props.tabName || `Tab ${index}`

                return <Tab key={id} label={label} id={id} />
              }
            )}
          </Tabs>

          {/* dynamically built containers for the tabs above */}
          {children.map(
            (child: ReactElement, index: number): ReactElement => (
              <TabPanel key={index} value={value} index={index}>
                {child}
              </TabPanel>
            )
          )}
        </Fragment>
      )}
    </Paper>
  )
}

export default TabsWrapper
