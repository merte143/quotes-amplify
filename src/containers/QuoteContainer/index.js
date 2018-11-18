import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as GLOBALS from '../../modules/globals'
import './QuoteContainer.css'
import { getRandomQuote } from '../../actions/quote'
import MessageElement from '../../components/MessageElement'
import Loading from '../../components/Loading'

class QuoteContainer extends Component {

  componentDidMount() {
    const { getRandomQuote } = this.props
    getRandomQuote()
  }

  render() {
    const { quote, api } = this.props
    const text = quote && quote.data && quote.data.text
    const author = quote && quote.data && quote.data.author
    return (
      <div className='quote-container'>

        <div className='bot-profile'>
          <img src={ GLOBALS.ASSETS_URL + 'author/denkarium.jpg' } alt='bot' />
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
              <p className='submitted-by'>submitted by { author }</p>
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
