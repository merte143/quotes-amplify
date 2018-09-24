import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Button } from 'react-bootstrap'
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
          <Button bsStyle='link' onClick={ () => this.goToPage('/') } className="menu-item">Home</Button>
          <Button bsStyle='link' onClick={ () => this.goToPage('/random') } className="menu-item">Random</Button>
        </Menu>
      </div>
    )
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
