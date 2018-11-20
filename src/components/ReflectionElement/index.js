import * as React from 'react'
import { Component } from 'react'
import './ReflectionElement.css'
import * as classnames from 'classnames'

export default class ReflectionElement extends Component {

  render () {
    const { reflection } = this.props
    return (
      <div className={ classnames('reflection-element') }>
        <div className={ classnames('message') }>
          <p>{ reflection }</p>
        </div>
      </div>
    )
  }

  createMarkup(html) {
    return {__html: html}
  }

}
