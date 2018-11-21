import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button } from 'react-bootstrap'
import * as GLOBALS from '../../modules/globals'
import './QuoteContainer.css'
import { getRandomQuote } from '../../actions/quote'
import MessageElement from '../../components/MessageElement'
import ReflectionElement from '../../components/ReflectionElement'
import Loading from '../../components/Loading'

class QuoteContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showReflection: false
    }
  }

  componentDidMount() {
    const { getRandomQuote } = this.props
    getRandomQuote()
  }

  render() {
    const { quote, api } = this.props
    const { showReflection } = this.state
    const text = quote && quote.data && quote.data.text
    const author = quote && quote.data && quote.data.author
    const reflection = quote && quote.data && quote.data.reflection
    return (
      <div className='quote-container'>

        <div className='bot-profile'>
          <img src={ GLOBALS.ASSETS_URL + 'assets/denk.jpg' } alt='bot' />
        </div>

        <div className='wrapper'>
          { api === 'loading' ? (
            <Loading />
          ) : api.error ? (
            <div>
              <h1>Something went wrong</h1>
              <p>{ JSON.stringify(api.error) }</p>
            </div>
          ) : (
            <div className='quote'>
              <MessageElement
                text={ text }
                sender={ 0 }
              />
              <p className='quote-author'>{ author }</p>
              <div className='reflection-section'>
                <Button bsStyle='primary' onClick={ () => this.setState({showReflection: !showReflection}) }>{ !showReflection ? 'Show' : 'Hide' } reflection</Button>
                { showReflection && (
                  <ReflectionElement
                    reflection={ reflection && reflection.length > 1 ? reflection : 'no reflection submitted' }
                  />
                )}
              </div>
            </div>
          ) }
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  quote: state.quote,
  api: state.api
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getRandomQuote
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteContainer)
