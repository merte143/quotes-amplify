import Axios from 'axios'
import * as GLOBAL from '../modules/globals.js'

// API URL
const API_URL = GLOBAL.API_URL + '/random'

// Sync Action
export const fetchQuoteSuccess = (quote) => {
  const payload = {
    quote: quote
  }
  return (dispatch) => {
    dispatch({
      type: 'SET_QUOTE',
      payload
    })
  }
}

// Async Action
export const fetchQuote = () => {
  console.log('fetching quote')
  return async (dispatch) => {
    const response = await Axios.get(API_URL, { crossDomain: true })
    console.log (response)
    dispatch(fetchQuoteSuccess(response));
  }
}