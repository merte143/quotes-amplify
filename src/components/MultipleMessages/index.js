import * as React from 'react'
import { Component } from 'react'
import './MultipleMessages.css'
import * as classnames from 'classnames'

export default class MultipleMessages extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    
  }

  render () {
    const { messages } = this.props
    return (
      <div className='MultipleMessages'>
        { JSON.stringify(messages) }
      </div>
    )
    
  }

}
