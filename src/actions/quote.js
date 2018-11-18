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
  return async (dispatch) => {
    // update api status
    dispatch(setApiStatus('loading'))
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
  return (dispatch) => {
    dispatch({
      type: 'SET_QUOTE',
      payload: quote
    })
    dispatch(setApiStatus(''))
  }
}

// Async Action
export const getQuote = (id) => {
  return async (dispatch) => {
    dispatch(setApiStatus('loading'))
    const response = await API.get('quoteapi', '/quotes/object/quote/' + id);
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
    dispatch(setApiStatus(''))
  }
}

// Async Action
export const getRandomQuote = () => {
  return async (dispatch) => {
    dispatch(setApiStatus('loading'))
    // last url part = type / hashKey in table
    const response = await API.get('quoteapi', '/quotes/random/quote');
    dispatch(getRandomQuoteSuccess(response))
  }
}