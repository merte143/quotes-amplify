import * as React from 'react'
import { Component } from 'react'
import './ActionContainer.css'
import * as classnames from 'classnames'
import { 
  Button,
  FormGroup,
  FormControl
} from 'react-bootstrap'

export default class ActionContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userInput: '',
      show: false,
      changed: false
    }
  }

  componentDidMount() {
    const { animationDelay } = this.props
    // show once mounted 
    setTimeout(() => {
      this.setState({ show: true })
    }, animationDelay)
  }

  componentWillReceiveProps(nextProps) {
    const { responseButtons, animationDelay } = this.props
    // show once rerendered
    if (responseButtons !== nextProps.responseButtons) {
      this.setState({ changed: true })
    }
    if ( this.state.changed) {
      setTimeout(() => {
        this.setState( { show: true } )
      }, nextProps.animationDelay)
      this.setState({ changed: false })
    } 
  }

  render () {
    const { slotToElicit, showChat, nextChat, prevChat, responseButtons } = this.props
    const { show } = this.state
    return (
      <div className={ classnames('action-container', show && 'show') }>
        { slotToElicit ? (
          <form>
            <FormGroup
              controlId='formUserInput'
              validationState={this.getValidationState()}
            >
              <FormControl
                type='text'
                value={this.state.userInput}
                placeholder="Enter something"
                onChange={(e) => this.handleChange(e)}
              />
              <FormControl.Feedback />
            </FormGroup>
            <Button bsStyle='primary' bsSize='large' onClick={ () => this.hideAndSendAnswer(this.state.userInput) }>
              Send
            </Button>
          </form>
        ) : responseButtons ? (
          responseButtons.map((button, i) => {
            return (
              <Button key={ i } bsStyle='primary' bsSize='large' onClick={ () => this.hideAndSendAnswer(button.value) }>
                { button.text }
              </Button>
            )
          })
        ) : (
          <Button bsStyle='primary' bsSize='large' onClick={ () => this.hideAndSendAnswer('rose') }>
            Next
          </Button>
        ) }

        <div className='navigation-buttons'>
          <Button onClick={ () => showChat(2,4) }>
            2-4
          </Button>
          <Button onClick={ () => nextChat() }>
            Next
          </Button>
          <Button onClick={ () => prevChat() }>
            Prev
          </Button>
        </div>
      </div> 
    )
  }

  hideAndSendAnswer(value) {
    const { sendAnswer } = this.props
    this.setState({ show: false })
    sendAnswer(value)
  }

  getValidationState() {
    const length = this.state.userInput.length;
    if (length > 2) return 'success';
    else if (length > 1) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }

  handleChange(e) {
    this.setState({ userInput: e.target.value });
  }

  createMarkup(html) {
    return {__html: html}
  }

}
