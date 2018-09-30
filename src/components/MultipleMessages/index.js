import * as React from 'react'
import { Component } from 'react'
import './MultipleMessages.css'
import * as classnames from 'classnames'
import MessageElement from '../MessageElement'
import GLOBALS from '../../modules/globals'

export default class MultipleMessages extends Component {

  constructor(props) {
    super(props)
    this.state = {
      renderingList: [],
      intervalId: -1,
      currentCount: 0
    }
  }

  componentDidMount() {
    const { messages } = this.props
    const { renderingList } = this.state
    const intervalId = setInterval(() => {
      renderingList.push(messages[this.state.currentCount])
      this.setState({ currentCount: this.state.currentCount + 1 })
      // clear interval once all messages are rendered
      if (this.state.currentCount >= messages.length) {
        clearInterval(this.state.intervalId)
      }
    }, 1000)
    this.setState({intervalId: intervalId})
    // this parent component should run a timer and every x seconds it should add 
    // the next item to an array that is used for rendering the elements
  }

  componentWillUnmount() {
    // make sure that interval is cleared
    clearInterval(this.state.intervalId)
  }

  render () {
    const { renderingList } = this.state
    return (
      <div className='MultipleMessages'>
        { renderingList && renderingList.map((message, i) => { 
          return (
            <MessageElement
              key={ i }
              text={ message.value }
              sender={ 0 }
              animationDelay={ i * GLOBALS.ANIMATION_INTERVALL + (i * 1500) }
              animationLength={ GLOBALS.ANIMATION_INTERVALL }
            />
          )
        })
      }
      </div>
    )
    
  }

}
