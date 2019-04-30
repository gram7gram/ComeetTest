import axios from 'axios'
import {LOAD_WEATHER_BEFORE, LOAD_WEATHER_FAILURE, LOAD_WEATHER_SUCCESS} from '../actions'

const parseResults = (data, temp, humidity) => {

  const bestMatches = data.list.filter(item =>
    Math.ceil(item.main.temp) === temp
    &&
    Math.ceil(item.main.humidity) === humidity
  )

  bestMatches.sort((a, b) => {
    if (a.main.temp > b.main.temp) return -1
    if (a.main.temp < b.main.temp) return 1
    return 0
  })

  const bestMatch = bestMatches.pop() || null

  let relevantMatches = data.list.filter(item =>
    temp - 5 < item.main.temp && item.main.temp < temp + 5
    &&
    humidity - 5 < item.main.humidity && item.main.humidity < humidity + 5
  )

  relevantMatches = bestMatches.concat(relevantMatches)

  relevantMatches.sort((a, b) => {
    if (a.main.temp > b.main.temp) return 1
    if (a.main.temp < b.main.temp) return -1
    return 0
  })

  if (bestMatch) {
    relevantMatches = relevantMatches.filter(item => bestMatch && bestMatch.id !== item.id)
  }

  relevantMatches = relevantMatches.slice(0, 10)

  return {
    bestMatch,
    bestMatches,
    relevantMatches
  }
}

export default filters => dispatch => {


  const query = [
    'APPID=a3711a53c8810ffe022e4c4663109722',
    'cluster=no',
    'units=metric',
    'bbox=-180,-90,180,90,10',
  ]

  const temp = filters.sex === 'male' ? 21 : 22
  const humidity = 50

  dispatch({
    type: LOAD_WEATHER_BEFORE,
    payload: {
      temp,
      humidity
    }
  })

  axios.get('https://api.openweathermap.org/data/2.5/box/city' + (query.length > 0 ? '?' + query.join('&') : ''))
    .then(({data}) => {

      dispatch({
        type: LOAD_WEATHER_SUCCESS,
        payload: parseResults(data, temp, humidity)
      })

    })
    .catch(e => {
      if (!e.response) {
        console.log(e);
        return
      }

      dispatch({
        type: LOAD_WEATHER_FAILURE,
        payload: e.message
      })
    })
}