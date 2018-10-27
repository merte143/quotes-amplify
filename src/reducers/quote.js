export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_QUOTE':
      return action.payload.quote
    default:
      return state
  }
}