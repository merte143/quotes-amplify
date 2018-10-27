import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchQuote } from '../../actions/quote'
import * as GLOBALS from '../../modules/globals'
import './QuoteContainer.css'

class QuoteContainer extends Component {

  componentDidMount() {
    const { fetchQuote } = this.props
    fetchQuote()
  }

  render() {
    const { quote } = this.props
    console.log('quote container')
    return (
      <div className='quote-container'>

        <div className='bot-profile'>
          <img src={ GLOBALS.ASSETS_URL + 'author/timo.jpg' } alt='bot' />
        </div>

        <div className='wrapper'>
          <div className='quote'>
            { quote && quote.data && JSON.stringify(quote.data[0]) }
          </div>    
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  quote: state.quote
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchQuote
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteContainer)
