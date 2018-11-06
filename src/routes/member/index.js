import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postQuote } from '../../actions/quote'
import QuoteForm from '../../components/QuoteForm'
import AuthBar from '../../components/AuthBar'
import { Authenticator } from 'aws-amplify-react'
import Quotes from '../../modules/themes/Quotes'

// add authentication to app
import Amplify, { Auth }from 'aws-amplify';
import aws_exports from '../../aws-exports.js';

Amplify.configure(aws_exports);

class Member extends Component {

  render() {
    const { api, quote, postQuote } = this.props
    console.log(api)
    return (
      <Grid>
        <Row>
          <Col col-xs='12'>
          <Authenticator
            theme={ Quotes }
          >
            <AuthBar />
            <QuoteForm
              postQuote={ (quote) => postQuote(quote) }
            />
          </Authenticator>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)