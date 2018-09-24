// Set Chat
export const setChatPosition = (start, end) => {
  const position = {
    'start': start,
    'end': end
  }
  return {
    type: 'SET_CHAT_POSITION',
    position
  }
}

// Next Chat
export const nextChatPosition = () => {
  return {
    type: 'NEXT_CHAT_POSITION'
  }
}

// Prev Chat
export const prevChatPosition = () => {
  return {
    type: 'PREV_CHAT_POSITION'
  }
}

// Append to Chat
export const appendChatPosition = () => {
  return {
    type: 'APPEND_CHAT_POSITION'
  }
}