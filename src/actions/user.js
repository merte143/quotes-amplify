// Set User
export const setUser = (user) => {
  return {
    type: 'SET_USER',
    payload: user
  }
}

// Logout User
export const unsetUser = () => {
  return {
    type: 'UNSET_USER'
  }
}