import React, { ReactElement } from "react"
import styled from "styled-components"

// utils
import responsiveStyling from "../libs/responsive"

// secondary components
const HeaderWrapper = styled.header`
  width: 100%;
  margin: 0;
`

const HeaderElement = styled.h1`
  width: 100%;
  display: block;
  text-align: center;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;

  ${responsiveStyling({
    ">1024": `
      padding: 30px;
    `
  })}
`

// main component
export const Header = (): ReactElement => (
  <HeaderWrapper>
    <HeaderElement>GitHub Repositories</HeaderElement>
  </HeaderWrapper>
)

export default Header
