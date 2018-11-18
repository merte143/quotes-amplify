import * as React from 'react'
import { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import './QuoteForm.css'
import Loading from '../../components/Loading'

export default class QuoteForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      isSubmitted: false
    }
  }

  render () {
    const { authState, api } = this.props
    const { isSubmitted } = this.state
    // hide the container if user is not signed in
    if (authState !== 'signedIn') { return null }
    // get name of logged in user and post as author
    console.log('api status')
    console.log(api.status)
    return (
      <div className='quote-form'>
        { !isSubmitted ? (
          <div>
            <FormGroup controlId="quoteFormTextArea">
              <ControlLabel>Submit a quote</ControlLabel>
              <FormControl
                componentClass="textarea"
                placeholder="Your quote"
                onChange={ (val) => this.handleChange(val) }
              />
            </FormGroup>
            <Button
              bsStyle='primary'
              bsSize='large'
              onClick={ () => this.submit() }
            >
              Post now!
            </Button>
          </div>
        ) : api === 'loading' ? (
          <Loading />
        ) : !api.error ? (
          <div>
            <h2>Thanks for submitting your quote!</h2>
            <Button 
              bsSize='large'
              bsStyle='primary'
              onClick={ () => this.setState({ isSubmitted: false }) }
            >
              Submit another one
            </Button>
          </div>
        ) : (
          <div>
            <p>Something went wrong. Try refreshing the page and give it another go!</p>
          </div>
        ) }
      </div>
    )
  }

  submit() {
    const { value } = this.state
    const { postQuote, user } = this.props
    postQuote(value, user.username)
    this.setState({ isSubmitted: true })
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

}
