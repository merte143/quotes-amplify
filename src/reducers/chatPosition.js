export default (state = {'start': 0, 'end': 0, 'chatLength': 1}, action) => {
  switch (action.type) {
    case 'SET_CHAT_POSITION':
      return {
        ...state,
        'start': action.position.start,
        'end': action.position.end
      }
    case 'NEXT_CHAT_POSITION':
      return {
        ...state,
        'start': state.start + 1,
        'end': state.end + 1
      }
    case 'PREV_CHAT_POSITION':
      return {
        ...state,
        'start': state.start - 1,
        'end': state.end - 1
      }
    case 'APPEND_CHAT_POSITION':
      return {
        ...state,
        'start': state.start,
        'end': state.end + 1,
        'chatLength': state.chatLength + 1
      }
    case 'INCREASE_AND_SET_CHAT_POSITION':
      return {
        ...state,
        'start': state.end,
        'end': state.end + 1,
        'chatLength': state.chatLength + 1
      }
    default:
      return state
  }
}