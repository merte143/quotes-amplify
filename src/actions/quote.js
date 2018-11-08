import Axios from 'axios'
import * as GLOBAL from '../modules/globals.js'
// @TODO: Refactor above and remove if not needed
// add db access
import { API } from 'aws-amplify';

// API URL
const API_URL = GLOBAL.API_URL + '/random'

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
export const postQuote = (quote, author) => {
  console.log('posting quote')
  return async (dispatch) => {
    console.log('calling api');
    const options = {
      body: {
        category: 'quote',
        text: quote,
        author: author
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
  console.log('getting quote with sortId ' + id)    

  return async (dispatch) => {
    console.log('calling api');
    const response = await API.get('quoteapi', '/quotes/object/quote/' + id);
    console.log(JSON.stringify(response, null, 2));
    dispatch(getQuoteSuccess(response))
  }
}

/* GET Random Quote */

// Sync Action
export const getRandomQuoteSuccess = (quote) => {
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
export const getRandomQuote = () => {
  console.log('getting random quote..')    

  return async (dispatch) => {
    console.log('calling api');
    // last url part = type / hashKey in table
    const response = await API.get('quoteapi', '/quotes/random/quote');
    console.log(JSON.stringify(response, null, 2));
    dispatch(getRandomQuoteSuccess(response))
  }
}

// @TODO: Get all quotes
// list = async () => {
//   console.log('calling api');
//   const response = await API.get('quoteapi', '/quotes/1');
//   alert(JSON.stringify(response, null, 2));
// }