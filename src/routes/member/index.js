import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postQuote } from '../../actions/quote'
import QuoteForm from '../../components/QuoteForm'

// add authentication to app
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports.js';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(aws_exports);

class Member extends Component {

  render() {
    const { api, quote, postQuote } = this.props
    console.log(api)
    return (
      <Grid>
        <Row>
          <Col col-xs='12'>
            <QuoteForm
              postQuote={ (quote) => postQuote(quote) }
            />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  api: state.api,
  quote: state.quote
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postQuote
}, dispatch)

const connectMember = connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)

export default withAuthenticator(connectMember, true);