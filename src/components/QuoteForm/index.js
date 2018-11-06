import * as React from 'react'
import { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import './QuoteForm.css'
import * as classnames from 'classnames'

export default class QuoteForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render () {
    const { postQuote, authState } = this.props
    const { value } = this.state
    // hide the container if user is not signed in
    console.log(authState)
    if (authState !== 'signedIn') { return null }
    return (
      <div className='quote-form'>
        <FormGroup controlId="quoteFormTextArea">
          <ControlLabel>Submit a quote</ControlLabel>
          <FormControl
            componentClass="textarea"
            placeholder="Your quote"
            onChange={ (val) => this.handleChange(val) }
          />
        </FormGroup>
        <Button onClick={ () => postQuote(value) }>Post now!</Button>
      </div>
    )
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

}
