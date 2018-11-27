import * as React from 'react'
import { Component } from 'react'
import { Button, FormGroup, ControlLabel, FormControl, Form } from 'react-bootstrap'
import './QuoteForm.css'
import Loading from '../../components/Loading'

export default class QuoteForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      quote: '',
      author: '',
      reflection: '',
      isSubmitted: false
    }
  }

  render () {
    const { authState, api, user } = this.props
    const { isSubmitted } = this.state
    // hide the container if user is not signed in
    if (authState !== 'signedIn' || !user) { return null }
    const SalveComponent = (user) => {
      return (
          <div>
            <h1>Salve { this.props.user.username },</h1>
            <p>Welcome to the Club. You are now at the heart of Denkarium. Please submit a thought and share it with the people you like!</p>
          </div>
      )
    }
    return (
      <div className='quote-form'>
        { !isSubmitted ? (
          <div>
            <SalveComponent />
            <Form>
              <FormGroup controlId="quoteFormQuote">
                <ControlLabel>Submit a quote</ControlLabel>
                <FormControl
                  value={ this.state.quote }
                  componentClass="textarea"
                  placeholder="Your quote"
                  name="quote"
                  onChange={ (val) => this.handleChange(val) }
                />
              </FormGroup>
              <FormGroup controlId="quoteFormAuthor">
                <ControlLabel>Author (optional)</ControlLabel>
                <FormControl
                  value={ this.state.author }
                  type="text"
                  placeholder="Author"
                  name="author"
                  onChange={ (val) => this.handleChange(val) }
                />
              </FormGroup>
              <FormGroup controlId="quoteFormReflection">
                <ControlLabel>Add some thoughts</ControlLabel>
                <FormControl
                  value={ this.state.reflection }
                  componentClass="textarea"
                  placeholder="Your reflections"
                  name="reflection"
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
            </Form>
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
    const { quote, author, reflection } = this.state
    const { postQuote, user } = this.props
    postQuote(quote, author, user.username, reflection)
    this.setState({ isSubmitted: true })
  }

  handleChange(e) {
    this.setState({
       [e.target.name]: e.target.value
    })
  }

}
