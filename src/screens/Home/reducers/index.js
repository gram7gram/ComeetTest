import {combineReducers} from 'redux';
import * as Actions from "../actions";

const isLoading = (prev = false, action) => {
  switch (action.type) {
    case Actions.LOAD_WEATHER_BEFORE:
      return true
    case Actions.LOAD_WEATHER_SUCCESS:
    case Actions.LOAD_WEATHER_FAILURE:
      return false
    default:
      return prev
  }
}

const currentSex = (prev = 'male', action) => {
  switch (action.type) {
    case Actions.CHANGE_SEX:
      return action.payload
    default:
      return prev
  }
}

const bestMatch = (prev = null, action) => {
  switch (action.type) {
    case Actions.LOAD_WEATHER_SUCCESS:
      if (action.payload.bestMatch !== undefined) {
        return action.payload.bestMatch
      }
      return null
    default:
      return prev
  }
}

const relevantMatches = (prev = [], action) => {
  switch (action.type) {
    case Actions.LOAD_WEATHER_SUCCESS:
      if (action.payload.relevantMatches !== undefined) {
        return action.payload.relevantMatches
      }
      return []
    default:
      return prev
  }
}

export default combineReducers({
  isLoading,
  currentSex,
  bestMatch,
  relevantMatches,
});
