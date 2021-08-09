import React, { ReactElement } from "react"
import styled from "styled-components"

// material-ui components
import { Box } from "@material-ui/core"

// type definitions
interface TabPanelProps {
  value: number
  index: number
  children: ReactElement | Array<ReactElement>
}

// secondary components
const StyledBox = styled(Box)`
  padding: 24px;
`

// main component
const TabPanel = ({ value, index, children }: TabPanelProps): ReactElement => {
  return (
    <div
      key={index}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <StyledBox>{children}</StyledBox>}
    </div>
  )
}

export default TabPanel
