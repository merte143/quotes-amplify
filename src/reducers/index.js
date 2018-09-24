import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import chat from './chat'
import chatPosition from './chatPosition'

export default combineReducers({
  routing: routerReducer,
  chat,
  chatPosition
})