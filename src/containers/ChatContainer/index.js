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
import { fetchRandom } from '../../actions/random'
import MessageElement from '../../components/MessageElement'
import MultipleMessages from '../../components/MultipleMessages'
import { animateScroll } from 'react-scroll'
import * as GLOBALS from '../../modules/globals'
import './ChatContainer.css'
import ActionContainer from '../ActionContainer';

class ChatContainer extends Component {

  componentDidMount() {
    const { fetchMessage, fetchRandom, id } = this.props
    switch (id) {
      case 'chat':
        fetchMessage('Hola Timo')
        break
      case 'random':
        fetchRandom()
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
    const activeChat = chat[id]
    // show only the active part of the chat
    const partChat = activeChat.slice(chatPosition.start, chatPosition.end)
    // make buttons dynamic
    const latestMessage = activeChat.length > 0 && activeChat[activeChat.length - 1]
    const { slotToElicit, responseCard } = latestMessage && latestMessage.content
    // use 'prop' in obj to check whether obj has own or inherited property
    const genericAttachments = responseCard && responseCard.genericAttachments

    const responseButtons = genericAttachments && genericAttachments[0].buttons
    // check for multiple elements
    // TODO: Find a better way to get that info
    let multiMessages = ''
    try {
      multiMessages = JSON.parse(partChat[0].content.message)
    } catch (error) {
      console.log(error)
    }
    const hasMultipleElements = typeof multiMessages === 'object'
    const renderTimeAllMessages = hasMultipleElements 
        ? (GLOBALS.ANIMATION_INTERVALL + 1000) * multiMessages.messages.length
        : GLOBALS.ANIMATION_INTERVALL

    return (
      <div className='chat-container'>
        <div className='bot-profile'>
          <img src={ GLOBALS.ASSETS_URL + 'author/timo.jpg' } alt='bot' />
        </div>
        <div className='wrapper'>
          <div className='chat'>
            { partChat && partChat.length > 0 && partChat.map((chatElement, i) => {
              // if message contains more elements, render accordingly
              let multiMessages = ''
              try {
                multiMessages = JSON.parse(chatElement.content.message)
              } catch (error) {
                console.log(error)
              }
              if(typeof multiMessages === 'object') {
                // @TODO: Need to unmount the <messages> components after user actions
                return (
                  <MultipleMessages
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
                    animationLength={ GLOBALS.ANIMATION_INTERVALL /* * chatElement.content.message.length */ }
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
        // @TODO: Unmount messages components here?
        appendToChat({'message': answer}, id, 1)
        setTimeout(() => {
          fetchMessage(answer)
        }, 1000)
        break
      case 'random':
        fetchRandom()
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
  fetchRandom,
  setChatPosition,
  nextChatPosition,
  prevChatPosition
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer)
