import Axios from 'axios'
import * as GLOBAL from '../modules/globals.js'
// @TODO: Refactor above and remove if not needed
// add db access
import { API } from 'aws-amplify';

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

// @TODO: Remove above code and remove the old static api

/* POST Quote */

// Sync Action
export const postQuoteSuccess = (quote) => {
  const payload = {
    message: 'success'
  }
  return (dispatch) => {
    dispatch({
      type: 'SET_API_STATUS',
      payload
    })
  }
}

// Async Action
export const postQuote = (quote) => {
  console.log('posting quote')
  return async (dispatch) => {
    console.log('calling api');
    const options = {
      body: {
        id: '1',
        text: quote,
        author: 'timo'
      }
    }
    const response = await API.post('quoteapi', '/quotes', options);
    console.log(JSON.stringify(response, null, 2));
    dispatch(postQuoteSuccess(response))
  }
}

/* GET Quote */

// Sync Action
export const getQuoteSuccess = (quote) => {
  const payload = {
    quote
  }
  return (dispatch) => {
    dispatch({
      type: 'SET_QUOTE',
      payload
    })
  }
}

// Async Action
export const getQuote = (id) => {
  console.log('getting quote with id ' + id)    

  return async (dispatch) => {
    console.log('calling api');
    const response = await API.get('quoteapi', '/quotes/object/' + id);
    console.log(JSON.stringify(response, null, 2));
    dispatch(getQuoteSuccess(response))
  }
}

// @TODO: Get all quotes
// list = async () => {
//   console.log('calling api');
//   const response = await API.get('quoteapi', '/quotes/1');
//   alert(JSON.stringify(response, null, 2));
// }