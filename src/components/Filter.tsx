import "date-fns"
import React, { ReactElement, useState } from "react"
import styled from "styled-components"
import DateFnsUtils from "@date-io/date-fns"

// utils
import { getLastWeek } from "../libs/utils"

// material-ui components
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core"

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers"

// helpers
import githubLanguages from "../libs/languages"

// type definition
import { SettingsData } from "../types"

interface FilterProps {
  onSettingsChange?: (settings: SettingsData) => void
}

// secondary components
const Container = styled(Paper)`
  font-size: 16px;
  margin-bottom: 10px;
  padding-top: 15px;
  padding-bottom: 15px;
`

// main component
const Filter = ({ onSettingsChange }: FilterProps): ReactElement => {
  const [selectedDate, setSelectedDate] = useState(getLastWeek())
  const [language, setLanguage] = useState(githubLanguages[0])

  const handleDateChange = (date: Date | null) => {
    if (!date) {
      if (onSettingsChange && typeof onSettingsChange === "function") {
        onSettingsChange({
          date: selectedDate
        })
      }
      return
    }

    setSelectedDate(date)

    if (onSettingsChange && typeof onSettingsChange === "function") {
      onSettingsChange({
        date
      })
    }
  }

  const handleLanguageChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newLanguage = event.target.value as string
    setLanguage(newLanguage)
    if (onSettingsChange && typeof onSettingsChange === "function") {
      onSettingsChange({
        language: newLanguage
      })
    }
  }

  return (
    <Container elevation={0}>
      <Grid container alignItems="center" justifyContent="space-between">
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">
            Language
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={language}
            onChange={handleLanguageChange}
            label="Language"
          >
            {githubLanguages.map((gitLanguage) => (
              <MenuItem key={gitLanguage} value={gitLanguage}>
                {gitLanguage}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            id="date-picker-dialog"
            label="Date created"
            format="yyyy-MM-dd"
            inputVariant="outlined"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Container>
  )
}

export default Filter
