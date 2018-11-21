export default (state = true, action) => {
  switch (action.type) {
    case 'SET_ONBOARDING_STATUS':
      return action.payload
    default:
      return state
  }
}