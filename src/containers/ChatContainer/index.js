import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchMessage } from '../../actions/message'
import { appendToChat } from '../../actions/chat'
import { 
  setChatPosition,
  nextChatPosition,
  prevChatPosition
} from '../../actions/chatPosition'
import MessageElement from '../../components/MessageElement'
import MultipleMessages from '../../components/MultipleMessages'
import { animateScroll } from 'react-scroll'
import * as GLOBALS from '../../modules/globals'
import './ChatContainer.css'
import ActionContainer from '../ActionContainer';

class ChatContainer extends Component {

  componentDidMount() {
    const { fetchMessage, id } = this.props
    switch (id) {
      case 'chat':
        fetchMessage('Hola Timo')
        break
      default:
        break
    }
  }

  componentDidUpdate(prevProps) {
    const { id, chat } = this.props
    const currentChatLength = chat && chat[id] && chat[id].length
    const prevChatLength = prevProps.chat && prevProps.chat[id] && prevProps.chat[id].length
    if (prevChatLength < currentChatLength) {
      // make sure that display scrolls to bottom when new message arrived
      animateScroll.scrollToBottom({
        duration: 0
      })
    }
  }

  render() {
    const { chat, id, chatPosition } = this.props

    // choose the chat based on the id
    const activeChat = chat[id]

    // show only the active part of the chat
    const partChat = activeChat.slice(chatPosition.start, chatPosition.end)

    // get latest message and response card data
    const latestMessage = activeChat.length > 0 && activeChat[activeChat.length - 1]
    const { slotToElicit, responseCard } = latestMessage && latestMessage.content
    const genericAttachments = responseCard && responseCard.genericAttachments
    const responseButtons = genericAttachments && genericAttachments[0].buttons
    
    // set animation time
    const renderTimeAllMessages = GLOBALS.ANIMATION_INTERVALL

    return (
      <div className='chat-container'>

        <div className='bot-profile'>
          <img src={ GLOBALS.ASSETS_URL + 'author/timo.jpg' } alt='bot' />
        </div>

        <div className='wrapper'>
          <div className='chat'>
            { partChat && partChat.length > 0 && partChat.map((chatElement, i) => {

              // multiMessages is null if its a simple message
              let multiMessages = this.secureParseJSON(chatElement.content.message)
              if(multiMessages !== null) {
                return (
                  <MultipleMessages
                    key={ i + chatPosition.start }
                    messages={ multiMessages.messages }
                  />
                )
              } else {
                return (
                  <MessageElement
                    key={ i }
                    text={ chatElement.content.message }
                    sender={ chatElement.sender }
                    animationDelay={ 0 }
                    animationLength={ GLOBALS.ANIMATION_INTERVALL }
                  />
                )
              }
            }) }
          </div>    
        </div>

        <ActionContainer
          slotToElicit={ slotToElicit }
          sendAnswer={ (input) => this.sendAnswer(input) }
          showChat={ () => this.showChat(2,4) }
          nextChat={ () => this.nextChat() }
          prevChat={ () => this.prevChat() }
          responseButtons={ responseButtons }
          animationDelay={ renderTimeAllMessages }
        />

      </div>
    )
  }

  secureParseJSON(stringObject) {
    try {
      const jsonObject = JSON.parse(stringObject)
      return jsonObject
    } catch (error) {
      return null
    }
  }

  showChat(start, end) {
    const { setChatPosition } = this.props
    setChatPosition(start, end)
  }

  nextChat() {
    const { nextChatPosition } = this.props
    nextChatPosition()
  }

  prevChat() {
    const { prevChatPosition } = this.props
    prevChatPosition()
  }

  sendAnswer(answer) {
    const { fetchMessage, fetchRandom, appendToChat, id } = this.props
    switch (id) {
      case 'chat':
        appendToChat({'message': answer}, id, 1)
        setTimeout(() => {
          fetchMessage(answer)
        }, 1000)
        break
      default:
        break
    }
    
  }
}

const mapStateToProps = state => ({
  message: state.message,
  chat: state.chat,
  chatPosition: state.chatPosition
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMessage,
  appendToChat,
  setChatPosition,
  nextChatPosition,
  prevChatPosition
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
