import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { slide as Menu } from 'react-burger-menu'
import MenuElement from '../../components/MenuElement'
import './Header.css'
import { isMobile } from "react-device-detect"

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
  }

  render() {
    return (
      <div>
        <Menu
          isOpen={ this.state.isMenuOpen }
          onStateChange={ (status) => this.setState({ isMenuOpen: status.isOpen }) }
          className='hamburger-menu'
          width={ isMobile ? '300px' : '600px' }
        >
          <h1>What do you want to do?</h1>
          <MenuElement
            onLinkClick={ () => this.closeMenu() }
            to={ '/' }
            title={ 'Check a random quote' }
          />
          <MenuElement
            onLinkClick={ () => this.closeMenu() }
            to={ '/member' }
            title={ 'Submit a quote' }
          />
          <MenuElement
            onLinkClick={ () => this.closeMenu() }
            to={ '/about-us' }
            title={ 'Learn about this project' }
          />
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
