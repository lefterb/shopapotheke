import React, { Fragment, ReactElement, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

// guidelines
import colors from "../guidelines/colors"

// material-ui components
import { TableRow, TableCell, IconButton, Collapse } from "@material-ui/core"

import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  Delete as DeleteIcon,
  StarOutline as StarOutlineIcon
} from "@material-ui/icons"

// components
import RepositoryDetails from "./RepositoryDetails"

// actions
import {
  removeStaredRepository as removeStaredRepositoryAction,
  starRepository as starRepositoryAction
} from "../redux/actions"

// type definitions
import { IRepository, RowProps } from "../types"

interface StyledRowProps {
  $backgroundColor: string
}

// local helpers
const updateRepoStarCount = (
  repoData: IRepository,
  isStared: boolean
): IRepository => {
  return {
    ...repoData,
    stars: isStared ? repoData.stars + 1 : repoData.stars
  }
}

// secondary components
const StyledStarIcon = styled(StarIcon)`
  color: ${colors.dandelionYellow};
`

const StyledRow = styled(TableRow)<StyledRowProps>`
  ${({ $backgroundColor }) =>
    $backgroundColor && `background-color: ${$backgroundColor};`}
`

// main component
const Row = ({
  stared,
  rowType,
  isOdd = false,
  repoData
}: RowProps): ReactElement => {
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const [isStared, setIsStared] = useState(false)

  useEffect(() => {
    if (stared) {
      setIsStared(true)
    }
  }, [])

  const onToggleStarRepository = (value: boolean) => {
    setIsStared(value)

    if (!isStared) {
      const repositoryData = {
        ...repoData,
        stars: repoData.stars + 1
      }

      dispatch(starRepositoryAction(repositoryData))
      return
    }

    dispatch(removeStaredRepositoryAction(repoData.id))
  }

  const removeStaredRepository = () => {
    dispatch(removeStaredRepositoryAction(repoData.id))
  }

  return (
    <Fragment>
      {/* the main row displaying the minimum data of the repository */}
      <StyledRow $backgroundColor={isOdd ? colors.white : colors.cultured}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <ExpandLessIcon style={{ color: colors.folly }} />
            ) : (
              <ExpandMoreIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{repoData.name}</TableCell>
        <TableCell align="right">
          {isStared ? repoData.stars + 1 : repoData.stars}
        </TableCell>
        <TableCell align="right">
          {rowType === "fetched" && (
            <IconButton
              aria-label="star repository"
              size="small"
              onClick={() => onToggleStarRepository(!isStared)}
            >
              {isStared ? <StyledStarIcon /> : <StarOutlineIcon />}
            </IconButton>
          )}

          {rowType === "stared" && (
            <IconButton
              aria-label="remove repository"
              size="small"
              onClick={() => removeStaredRepository()}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </TableCell>
      </StyledRow>

      {/* the detailed row which expands from a click within main row */}
      <StyledRow $backgroundColor={isOdd ? colors.white : colors.cultured}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <RepositoryDetails data={updateRepoStarCount(repoData, isStared)} />
          </Collapse>
        </TableCell>
      </StyledRow>
    </Fragment>
  )
}

export default Row
