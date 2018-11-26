import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { slide as Menu } from 'react-burger-menu'
import MenuElement from '../../components/MenuElement'
import Footer from '../../containers/Footer'
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
    const iconQuote = !isMobile.matches ? 'icon-quote' : 'icon-quote-2'
    const iconSend = !isMobile.matches ? 'icon-send-2' : 'icon-send-2-2'
    const iconChat = !isMobile.matches ? 'icon-chat-46' : 'icon-chat-46-2'
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
              iconClasses={ ['icon', iconQuote, 'icon-white'] }
              color={ 'color-green' }
            />
            <MenuElement
              onLinkClick={ () => this.closeMenu() }
              to={ '/member' }
              title={ 'Submit a quote' }
              iconClasses={ ['icon', iconSend, 'icon-white'] }
              color={ 'color-orange' }
            />
            <MenuElement
              onLinkClick={ () => this.closeMenu() }
              to={ '/about-us' }
              title={ 'Learn about this project' }
              iconClasses={ ['icon', iconChat, 'icon-white'] }
              color={ 'color-black' }
            />
          </div>
          <Footer />
        </Menu>
      </div>
    )
  }

  closeMenu() {
    this.setState({ isMenuOpen: false })
  }
}

const mapStateToProps = state => ({
  message: state.message
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
