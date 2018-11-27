import React from 'react'
import { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { postQuote } from '../../actions/quote'
import { setUser, unsetUser } from '../../actions/user'
import QuoteForm from '../../components/QuoteForm'
import AuthBar from '../../components/AuthBar'
import SignUp from '../../components/SignUp'
import SignIn from '../../components/SignIn'
import { 
  Authenticator, 
  TOTPSetup, 
  ForgotPassword, 
  VerifyContact, 
  ConfirmSignUp,
  ConfirmSignIn,
  RequireNewPassword,
  Greetings 
} from 'aws-amplify-react'
import Quotes from '../../modules/themes/Quotes'

// add authentication to app
import Amplify, { Auth }from 'aws-amplify';
import aws_exports from '../../aws-exports.js';

Amplify.configure(aws_exports);

class Member extends Component {
  render() {
    const { postQuote, unsetUser, user, api } = this.props
    return (
      <Grid>
        <Row>
          <Col xs={ 12 } md={ 10 } mdOffset={ 1 } lg={ 8 } lgOffset={ 2 }>
            <Authenticator
              theme={ Quotes }
              onStateChange={(authState) => this.setUser(authState)}
              hideDefault={true}
            >
              <Greetings/>
              <ConfirmSignIn/>
              <RequireNewPassword/>
              <ConfirmSignUp/>
              <VerifyContact/>
              <ForgotPassword/>
              <TOTPSetup/>
              <SignIn
                override={SignIn}
              />
              <SignUp
                override={SignUp}
              />
              <AuthBar
                unsetUser={ unsetUser }
              />
              <QuoteForm
                user={ user }
                postQuote={ (quote, author, submittedBy, reflection) => postQuote(quote, author, submittedBy, reflection) }
                api={ api }
              />
            </Authenticator>
          </Col>
        </Row>
      </Grid>
    )
  }

  setUser(authState) {
    const { setUser } = this.props
    // if the user is signed in, set him in the state
    if (authState === 'signedIn') {
      Auth.currentAuthenticatedUser()
        .then(user => {
            setUser(user)
        })
        .catch(err => console.log(err))
    }
  }
}

const mapStateToProps = state => ({
  api: state.api,
  quote: state.quote,
  user: state.user
})

const mapDispatchToProps = dispatch => bindActionCreators({
  postQuote,
  setUser,
  unsetUser
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)