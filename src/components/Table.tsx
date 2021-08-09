import React, { ReactElement, Fragment, useState } from "react"
import styled from "styled-components"

// guidelines
import colors from "../guidelines/colors"

// material-ui components
import {
  Paper,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Grid
} from "@material-ui/core"

// custom components
import Row from "./Row"
import Filter from "./Filter"

// type definitions
import { IRepository, TableProps } from "../types"

interface TableContainerProps {
  component: typeof Paper
}

// secondary components
const TableData = styled(Paper)`
  font-size: 16px;
  margin-bottom: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
`

const StyledTableContainer = styled(TableContainer)<TableContainerProps>`
  overflow-x: initial;

  &.MuiTableContainer-root {
    overflow-x: initial;
  }
`

const StyledTableCell = styled(TableCell)`
  background-color: ${colors.black};
  color: ${colors.white};

  &.MuiTableCell-head {
    color: ${colors.white};
  }
`

const StyledTable = styled(Table)`
  .MuiTableCell-stickyHeader {
    background-color: ${colors.black}
  }
`

// main component
const RepositoriesTable = ({
  repositories,
  staredRepositoriesIds,
  tableType,
  totalItems,
  itemsPerPage = 10,
  currentPage = 0,
  onSettingsChange
}: TableProps): ReactElement => {
  const [page, setPage] = useState(currentPage)
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
    if (onSettingsChange && typeof onSettingsChange === "function") {
      onSettingsChange({
        currentPage: newPage
      })
    }
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newItemsPerPage = +event.target.value
    setRowsPerPage(newItemsPerPage)
    setPage(0)

    if (onSettingsChange && typeof onSettingsChange === "function") {
      onSettingsChange({
        currentPage: 0,
        itemsPerPage: newItemsPerPage
      })
    }
  }

  return (
    <Fragment>
      {tableType === "fetched" && (
        <Filter onSettingsChange={onSettingsChange} />
      )}

      {tableType === "stared" && (
        <TableData elevation={0}>
          Total found: <Chip size="small" label={repositories.length} />
        </TableData>
      )}

      {repositories.length > 0 && (
        <Fragment>
          {/* pagination */}
          {tableType === "fetched" && (
            <Grid container alignItems="center" justifyContent="space-between">
              <div>
                Total found: <Chip size="small" label={totalItems} />
              </div>
              <TablePagination
                rowsPerPageOptions={[10, 30, 100]}
                component="div"
                count={totalItems || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          )}

          <StyledTableContainer component={Paper}>
            <StyledTable
              stickyHeader={rowsPerPage > 10}
              aria-label="repositories table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell />
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Stars</StyledTableCell>
                  <StyledTableCell key="star action" />
                </TableRow>
              </TableHead>
              <TableBody>
                {repositories.map(
                  (repo: IRepository, index: number): ReactElement => {
                    let stared = false
                    if (tableType === "fetched" && staredRepositoriesIds) {
                      stared = staredRepositoriesIds.includes(repo.id)
                    }
                    return (
                      <Row
                        key={repo.id}
                        rowType={tableType}
                        isOdd={index % 2 === 0}
                        stared={stared}
                        repoData={repo}
                      />
                    )
                  }
                )}
              </TableBody>
            </StyledTable>
          </StyledTableContainer>

          {/* pagination */}
          {tableType === "fetched" && (
            <TablePagination
              rowsPerPageOptions={[10, 30, 100]}
              component="div"
              count={totalItems}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  )
}

export default RepositoriesTable
