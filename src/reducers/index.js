import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import chat from './chat'
import quote from './quote'
import user from './user'
import api from './api'
import onboarding from './onboarding'
import chatPosition from './chatPosition'

export default combineReducers({
  routing: routerReducer,
  chat,
  chatPosition,
  quote,
  user,
  onboarding,
  api
})