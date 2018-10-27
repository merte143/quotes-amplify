import * as GLOBAL from '../modules/globals.js'
import Amplify, { Interactions } from 'aws-amplify';

// configure amplify
Amplify.configure({
  Auth: {
    // Use your Amazon Cognito Identity Pool Id
    identityPoolId: GLOBAL.COGNITO_ID,
    region: GLOBAL.AWS_REGION
  },
  Interactions: {
    bots: {
      'Quotes': {
        'name': GLOBAL.BOT_NAME,
        'alias': GLOBAL.BOT_ALIAS,
        'region': GLOBAL.AWS_REGION,
      },
    }
  }
});

// Sync Action
export const fetchMessageSuccess = (response) => {
  const payload = {
    content: response,
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
  return async (dispatch) => {
    const response =  await Interactions.send("Quotes", message);
    console.log (response);
    dispatch(fetchMessageSuccess(response));
  }
}