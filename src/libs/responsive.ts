interface Breakpoints {
  [key: string]: string
}

const breakpoints: Breakpoints = {
  ">320": "320px",
  ">480": "481px",
  ">768": "769px",
  ">1024": "1025px",
  ">1200": "1201px",
  ">1400": "1401px"
}

const responsiveStyling = (incomingBreakpoints: Breakpoints = {}): string => {
  let mediaQueryOutput = ""

  Object.keys(incomingBreakpoints).map((key) => {
    mediaQueryOutput += `
      @media screen and (min-width: ${breakpoints[key] || key}) {
        ${incomingBreakpoints[key]}
      }
    `
  })

  return mediaQueryOutput
}

export default responsiveStyling
