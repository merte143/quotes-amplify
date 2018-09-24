import Axios from 'axios'
import * as GLOBAL from '../modules/globals.js'

// API URL
const API_URL = GLOBAL.API_URL + '/random'

// Sync Action
export const fetchRandomSuccess = (quote) => {
  const payload = {
    message: quote,
    key: 'random',
    sender: 0
  }
  return (dispatch) => {
    dispatch({
      type: 'APPEND_TO_CHAT',
      payload
    })
  }
}

// Async Action
export const fetchRandom = () => {
  return (dispatch) => {
    return Axios.get(API_URL, { crossDomain: true })
      .then(response => {
        // pick a random quote
        const item = response.data[Math.floor(Math.random()*response.data.length)]
        dispatch(fetchRandomSuccess(item.message))
      })
      .catch(error => {
        throw (error)
      })
  }
}