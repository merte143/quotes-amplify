import Axios from 'axios'
import * as GLOBAL from '../modules/globals.js'

// API URL
const API_URL = GLOBAL.API_URL + '/message'

// Sync Action
export const fetchMessageSuccess = (answer) => {
  const body = answer['body-json']
  const payload = {
    content: body,
    key: 'chat',
    sender: 0
  }
  return (dispatch) => {
    dispatch({
      type: 'APPEND_TO_CHAT',
      payload
    })
    // clear and show only the server response
    dispatch({
      type: 'INCREASE_AND_SET_CHAT_POSITION'
    })
  }
}

// Async Action
export const fetchMessage = (message) => {
  return (dispatch) => {
    const data = {
      uuid: '12345',
      message: message
    }
    return Axios.post(API_URL, data, { 
        crossDomain: true,
        headers: {
          'Content-Type': 'application/json',
        }   
      })
      .then(response => {
        dispatch(fetchMessageSuccess(response.data))
      })
      .catch(error => {
        throw (error)
      })
  }
}