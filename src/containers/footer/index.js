import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import './Footer.css'

class Footer extends Component {

  render() {
    return (
      <div className='footer'>
        <p className='author'>by Timo Müller</p>
        <p className='address'>Geygerstr. 3 | 12043 Berlin | timo.h.mueller@gmail.com</p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer)
