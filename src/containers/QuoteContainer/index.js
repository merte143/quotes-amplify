import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchQuote } from '../../actions/quote'
import * as GLOBALS from '../../modules/globals'
import './QuoteContainer.css'
import { getRandomQuote } from '../../actions/quote'

class QuoteContainer extends Component {

  componentDidMount() {
    const { getRandomQuote } = this.props
    getRandomQuote()
  }

  render() {
    const { quote } = this.props
    return (
      <div className='quote-container'>

        <div className='bot-profile'>
          <img src={ GLOBALS.ASSETS_URL + 'author/timo.jpg' } alt='bot' />
        </div>

        <div className='wrapper'>
          <div className='quote'>
            { JSON.stringify(quote) }
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
  getRandomQuote
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteContainer)
