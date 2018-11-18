export default (state = '', action) => {
  switch (action.type) {
    case 'SET_API_STATUS':
      return action.payload
    default:
      return state
  }
}