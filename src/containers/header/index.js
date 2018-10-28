import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { bindActionCreators } from 'redux'
import { slide as Menu } from 'react-burger-menu'
import './Header.css'

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
        >
          <Link onClick={ () => this.closeMenu() } to='/' className="menu-item">Home</Link>
          <Link onClick={ () => this.closeMenu() } to='/member' className="menu-item">Submit a quote</Link>
          <Link onClick={ () => this.closeMenu() } to='/home' className="menu-item">About this project</Link>
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
