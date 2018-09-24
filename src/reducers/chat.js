export default (state = {'chat': [], 'random': []}, action) => {
  switch (action.type) {
    case 'APPEND_TO_CHAT':
      const messageElement = {
        content: action.payload.content,
        sender: action.payload.sender
      }
      return {
        ...state,
        [action.payload.key]: [...state[action.payload.key], messageElement]
      }
    default:
      return state
  }
}