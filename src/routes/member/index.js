import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// add authentication to app
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports.js';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

// add db access
import { Storage, API } from 'aws-amplify';

Amplify.configure(aws_exports);

class Member extends Component {

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => console.log(user))
      .catch(err => console.log(err))

    let session = Auth.currentSession();
    console.log(session)
  }

  render() {
    console.log('hö?')
    return (
      <Grid>
        <Row>
          <Col col-xs='12'>
            <h1>Wow, you are logged in.</h1>
            <p>toll.</p>    
            <Button onClick={ this.post }>Post</Button>
            <Button onClick={ this.get }>Get</Button>
            <Button onClick={ this.list }>List</Button>
          </Col>
        </Row>
      </Grid>
    )
  }

  post = async () => {
    console.log('calling api');
    const options = {
      body: {
        id: '1',
        text: 'test db',
        author: 'timo'
      }
    }
    const response = await API.post('quoteapi', '/quotes', options);
    alert(JSON.stringify(response, null, 2));
  }

  get = async () => {
    console.log('calling api');
    const response = await API.get('quoteapi', '/quotes/object/1');
    alert(JSON.stringify(response, null, 2));
  }

  list = async () => {
    console.log('calling api');
    const response = await API.get('quoteapi', '/quotes/1');
    alert(JSON.stringify(response, null, 2));
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