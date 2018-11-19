import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class About extends Component {

  render() {
    return (
      <Grid>
        <Row>
          <Col xs={ 12 } md={ 10 } mdOffset={ 1 } lg={ 8 } lgOffset={ 2 }>
            <h1>About Us</h1>
            <p>toll.</p>            
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)