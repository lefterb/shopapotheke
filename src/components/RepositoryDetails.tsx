import React, { ReactElement } from "react"
import styled from "styled-components"

// material-ui components
import { Box, Typography, Avatar, Link } from "@material-ui/core"

// type definitions
import { IRepository } from "../types"

interface RepositoryDetailsProps {
  data: IRepository
}

// secondary components
const OwnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
`

// main component
const RepositoryDetails = ({ data }: RepositoryDetailsProps): ReactElement => {
  return (
    <Box margin={1}>
      <Typography variant="h6" gutterBottom component="div">
        {data.name}
      </Typography>
      <OwnerContainer>
        <Avatar alt={data.owner} src={data.avatarURL} />
        <p>Owner: {data.owner}</p>
      </OwnerContainer>
      <Typography variant="body2" gutterBottom>
        Description: {data.description}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Language: <b>{data.language}</b>
      </Typography>
      <Typography variant="body2" gutterBottom>
        Stars: {data.stars}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Forks: {data.forks}
      </Typography>
      <Typography variant="body2" gutterBottom>
        Watchers: {data.watchers}
      </Typography>
      <Typography>
        <Link target="_blank" href={data.url}>
          {data.url}
        </Link>
      </Typography>
    </Box>
  )
}

export default RepositoryDetails
