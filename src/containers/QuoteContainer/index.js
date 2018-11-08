import * as React from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as GLOBALS from '../../modules/globals'
import './QuoteContainer.css'
import { getRandomQuote } from '../../actions/quote'
import MessageElement from '../../components/MessageElement'

class QuoteContainer extends Component {

  componentDidMount() {
    const { getRandomQuote } = this.props
    getRandomQuote()
  }

  render() {
    const { quote } = this.props
    const text = quote && quote.data && quote.data.text
    return (
      <div className='quote-container'>

        <div className='bot-profile'>
          <img src={ GLOBALS.ASSETS_URL + 'author/denkarium.jpg' } alt='bot' />
        </div>

        <div className='wrapper'>
          <div className='quote'>
            <MessageElement
              text={ text }
              sender={ 0 }
            />
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
