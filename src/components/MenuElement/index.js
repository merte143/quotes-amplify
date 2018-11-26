import * as React from 'react'
import { Component } from 'react'
import './MenuElement.css'
import { Link } from "react-router-dom"
import * as classnames from 'classnames'

export default class MenuElement extends Component {

  render () {
    const { onLinkClick, title, to, iconClasses, color } = this.props
    return (
      <div className='menu-element'>
        <div className='wrapper'>
          <Link onClick={ () => onLinkClick() } to={ to } className="menu-item">
            <div className='icon-container'>
              <div className={ classnames('icon-wrapper', color) }>
                <div className='icon-center'>
                  <i className={ classnames(...iconClasses) } />
                </div>
              </div>
            </div>
            <div className='text'>
              { title }
            </div>
          </Link>
        </div>
      </div>
    )
  }

}
