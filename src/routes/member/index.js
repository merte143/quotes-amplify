import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// add authentication to app
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports.js';
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(aws_exports);

class Member extends Component {

  render() {
    console.log('hö?')
    return (
      <Grid>
        <Row>
          <Col col-xs='12'>
            <h1>Wow, you are logged in.</h1>
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

const connectMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)

export default withAuthenticator(connectMember, true);