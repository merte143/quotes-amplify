// Sync Action
export const appendToChat = (message) => {
  const payload = {
    content: message,
    key: 'chat',
    sender: 1
  }
  return (dispatch) => {
    dispatch({
      type: 'APPEND_TO_CHAT',
      payload
    })
    // update the chat position
    dispatch({
      type: 'APPEND_CHAT_POSITION'
    })
  }
}