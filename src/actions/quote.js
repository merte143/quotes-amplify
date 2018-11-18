// add db access
import { API } from 'aws-amplify';
import { setApiStatus } from './api'

/* POST Quote */

// Sync Action
export const postQuoteSuccess = (quote) => {
  return (dispatch) => {
    dispatch(setApiStatus(''))
  }
}

// Async Action
export const postQuote = (quote, author) => {
  console.log('posting quote')
  return async (dispatch) => {
    // update api status
    dispatch(setApiStatus('loading'))
    console.log('calling api');
    const options = {
      body: {
        category: 'quote',
        text: quote,
        author: author
      }
    }
    const response = await API.post('quoteapi', '/quotes', options);
    if (response.error) {
      dispatch(setApiStatus(response.error))
    } else {
      dispatch(postQuoteSuccess(response))
      dispatch(setApiStatus(''))
    }
    
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
    }),
    dispatch(setApiStatus(''))
  }
}

// Async Action
export const getQuote = (id) => {
  console.log('getting quote with sortId ' + id)    
  return async (dispatch) => {
    dispatch(setApiStatus('loading'))
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
    }),
    dispatch(setApiStatus(''))
  }
}

// Async Action
export const getRandomQuote = () => {
  console.log('getting random quote..')    
  return async (dispatch) => {
    dispatch(setApiStatus('loading'))
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