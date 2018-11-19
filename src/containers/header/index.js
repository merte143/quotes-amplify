import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { slide as Menu } from 'react-burger-menu'
import MenuElement from '../../components/MenuElement'
import './Header.css'

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
  }

  render() {
    const isMobile = window.matchMedia('only screen and (max-width: 767px)')
    return (
      <div>
        <Menu
          isOpen={ this.state.isMenuOpen }
          onStateChange={ (status) => this.setState({ isMenuOpen: status.isOpen }) }
          className='hamburger-menu'
          width={ isMobile.matches ? '300px' : '600px' }
        >
          <h1>What do you want to do?</h1>
          <div className='menu-elements-wrapper'>
            <MenuElement
              onLinkClick={ () => this.closeMenu() }
              to={ '/' }
              title={ 'Check a random quote' }
              iconClasses={ ['icon', 'icon-quote', 'icon-white'] }
              color={ 'color-green' }
            />
            <MenuElement
              onLinkClick={ () => this.closeMenu() }
              to={ '/member' }
              title={ 'Submit a quote' }
              iconClasses={ ['icon', 'icon-send', 'icon-white'] }
              color={ 'color-orange' }
            />
            <MenuElement
              onLinkClick={ () => this.closeMenu() }
              to={ '/about-us' }
              title={ 'Learn about this project' }
              iconClasses={ ['icon', 'icon-chat-46', 'icon-white'] }
              color={ 'color-black' }
            />
          </div>
        </Menu>
      </div>
    )
  }

  closeMenu() {
    this.setState({ isMenuOpen: false })
  }

  goToPage(path) {
    const { changePage } = this.props
    this.setState({ isMenuOpen: false })
    changePage(path)
  }
}

const mapStateToProps = state => ({
  message: state.message
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (path) => push(path)
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
