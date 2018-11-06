import * as React from 'react'
import { Component } from 'react'
import './MessageElement.css'
import * as classnames from 'classnames'

export default class MessageElement extends Component {

  constructor(props) {
    super(props)
    this.state = {
      animateBubble: 0,
      timerId1: -1,
      timerId2: -1
    }
  }

  componentDidMount() {
    this.setState( {animateBubble: 2 } )
  }

  render () {
    const { sender, text } = this.props
    const { animateBubble } = this.state
    if ( sender === 0 ) {
      return (
        <div className={ classnames('message-element') }>
          { animateBubble === 0 ? (
            <span/>
          ) : animateBubble === 1 ? (
            <div className={ classnames('message') }>
              <div className="chat-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          ) : (
            <div className={ classnames('message') }>
              <p dangerouslySetInnerHTML={ this.createMarkup(text) } />
            </div>
          ) }
        </div>
      )
    } else {
      return (
        <div className={ classnames('message-element', 'answer') }>
          <div className={ classnames('message') }>
            <p dangerouslySetInnerHTML={ this.createMarkup(text) } />
          </div>
        </div>
      )
    }
    
  }

  createMarkup(html) {
    return {__html: html}
  }

}
