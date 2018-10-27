import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import chat from './chat'
import quote from './quote'
import chatPosition from './chatPosition'

export default combineReducers({
  routing: routerReducer,
  chat,
  chatPosition,
  quote
})