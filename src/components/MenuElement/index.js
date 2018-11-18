import * as React from 'react'
import { Component } from 'react'
import './MenuElement.css'
import { Link } from "react-router-dom";

export default class MenuElement extends Component {

  render () {
    const { onLinkClick, title, to } = this.props
    return (
      <div className='menu-element'>
        <div className='wrapper'>
          <Link onClick={ () => onLinkClick() } to={ to } className="menu-item">
            <div className='icon'>
              <img src={ 'https://via.placeholder.com/150.jpg' } alt={ title } />
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
